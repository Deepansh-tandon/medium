import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlog, updateBlog } from '@deepansh/medium-common';

export const blogsRouter=new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	},
    Variables:{
        userId:string
    }
}>();

blogsRouter.use('/*',async (c,next)=>{
    const header=c.req.header("Authorization")||"";
    const token=header.split(" ")[1];
    const response=await verify(token,c.env.JWT_SECRET);
    if(response.id)
   { c.set("userId",response.id as string); 
    await next();}
    else
    {
      c.status(401)
      return c.json({
        message:"Unauthorized"
      });
    }
   })

blogsRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const body=await c.req.json();  
const {success}=createBlog.safeParse(body);
     if(!success) {
        c.status(400)
        return c.json({error:"Invalid request body"});}
       const blog =await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                authorId: c.get("userId"),
            }
        })

    return c.json(blog.id)
  })
  
  
  blogsRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json();   
const {success}=updateBlog.safeParse(body);
     if(!success) {
        c.status(400)
        return c.json({error:"Invalid request body"});}
    const blog =await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })

    return c.json((blog.id))
  })
  
  
  blogsRouter.get('/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id=await c.req.param("id");   
try{
    const blog =await prisma.post.findFirst({
        where:{
            id:id
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    }) ;
  
  return c.json(blog);
  } catch (error) {
     c.status(404);
    return c.json({ message: 'Blog not found' });
  } 
})
//todo add pagenation
blogsRouter.get('/bulk/a',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    

    const blog =await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                    }
            }
        }
    });
    return c.json(blog);
}) 