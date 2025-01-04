import { Hono } from "hono";
import { sign, verify } from 'hono/jwt';
import { SignupInput,SigninInput, signupInput, signinInput } from "@deepansh/medium-common";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

userRouter.post('/signup', async (c) => {
  
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
      const body=await c.req.json();
      const {success}=signupInput.safeParse(body);
      if(!success) {
        c.status(400)
        return c.json({error:"Invalid request body"});}
      try{
        const user=prisma.user.create({
          data:{
            email:body.email,
            password:body.password,
            name:body.name
          }
        })
        const token=await sign({id:(await user).id},c.env.JWT_SECRET)
        return c.json({token})
      }catch(e){
        return c.status(300);
      }
      
    })
    
    
    userRouter.post('/signin',async (c) => {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body=await c.req.json();
    const {success}=signinInput.safeParse(body);
     if(!success) {
        c.status(400)
        return c.json({error:"Invalid request body"});}
    const user=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }})
     
    if(!user){
      c.status(403);
            return c.json({ error: "user not found" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
    
    
    })