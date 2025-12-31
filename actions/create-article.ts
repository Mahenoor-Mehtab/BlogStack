'use server'
// export const runtime = "nodejs";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {z} from "zod";
import prisma from "@/lib/prisma";

import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});


const createArticleSchema = z.object({
    title:z.string().min(3).max(100),
    category: z.string().min(3).max(50),
    content:z.string().min(10)
})


type CreateArticlesFormstate = {
    errors:{
        title?:string[],
        category?:string[],
        featuredImage?:string[],
        content?:string[],
        formErrors?:string[]
    }
}

export const creatArticle = async (prevState: CreateArticlesFormstate, formData:FormData): Promise<CreateArticlesFormstate>=>{

    const result = createArticleSchema.safeParse({
        title:formData.get('title'),
        category:formData.get('category'),
        content:formData.get('content')
    })

    if(!result.success){
        return{
            errors:result.error.flatten().fieldErrors // .flatten().fieldErrors converts Zod errors to readable format
        }
    }

    const {userId} = await auth();
    if(!userId) {
        return {
            errors:{
                formErrors:['You have to login first']
            }
        }
    }

    // const existingUser = await prisma.user.findUnique({
    //     where:{clerkUserId: userId}
    // })

    // if(!existingUser) {
    //     return{
    //         errors:{
    //            formErrors:['User not found. Please register before creating an article'] 
    //         }
    //     }
    // }
    let existingUser;
try {
    existingUser = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    });
} catch (err) {
    return {
        errors: { formErrors: ["Database temporarily unreachable. Please try again."] }
    };
}


    // start creating article
    const imageFile = formData.get('featuredImage') as File | null;
    if(!imageFile || imageFile.name === "undefined"){
        return {
            errors:{
                featuredImage:['image file is required']
            }
        }
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse : UploadApiResponse | undefined = await new Promise((resolve, reject)=>{
      const uploadStream = cloudinary.uploader.upload_stream({
        resource_type :'auto'
      },(error, result)=>{
        if(error){
            reject(error)
        }else{
            resolve(result)
        }
      })

      uploadStream.end(buffer);
    })

    const imageUrl = uploadResponse?.secure_url;

    if(!imageUrl){
        return{
            errors:{
                featuredImage:['Failed to upload image . Please try again']
            }
        }
    }

    try{
        await prisma.articles.create({
            data:{
                title:result.data.title,
                category:result.data.category,
                content: result.data.content,
                featuredImage:imageUrl,
                authorId:existingUser.id
            }
        })


    }catch(error:unknown){
        if(error instanceof Error){
            return {
                errors:{
                    formErrors:[error.message]
                }
            }
        }else{
            return{
                errors:{
                    formErrors:["Some internal server error occured"]
                }
            }
        }

    }

    revalidatePath('/dashboard')
    redirect('/dashboard')

    

}
