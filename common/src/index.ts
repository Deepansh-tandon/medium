import z from "zod"

export const signupInput=z.object({
    email:z.string().email(),
    password:z.string().min(8),
    name:z.string().optional()
})

export const signinInput=z.object({
    email:z.string().email(),
    password:z.string().min(8),

})

export const createBlog=z.object({
    title:z.string(),
    content:z.string()
})

export const updateBlog=z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})
export type updateBlog=z.infer<typeof updateBlog>
export type createBlog=z.infer<typeof createBlog>
export type SignupInput= z.infer<typeof signupInput>

export type SigninInput= z.infer<typeof signinInput>