'use server'
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {z} from "zod";

const createArticleSchema = z.object({
    title:z.string().min(3).max(100),
    category: z.string().min(3).max(50),
    content:z.string().min(10)
})


type CreateArticlesFormstate = {
    errors?:{
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

    // start creating article
    const imageFile = formData.get('featuredImage') as File | null;
    if(!imageFile || imageFile.name === "undefined"){
        return {
            errors:{
                featuredImage:['image file is required']
            }
        }
    }


    redirect('/dashboard')

    

}
