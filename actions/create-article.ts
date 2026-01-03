"use server";
// export const runtime = "nodejs";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";

// Initialize Cloudinary only if env vars exist
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const createArticleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  category: z.string().min(1, "Please select a category"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type CreateArticlesFormstate = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
  success?: boolean;
  message?: string;
  redirectTo?: string;
};

export const creatArticle = async (
  prevState: CreateArticlesFormstate,
  formData: FormData
): Promise<CreateArticlesFormstate> => {
  try {
    const result = createArticleSchema.safeParse({
      title: formData.get("title"),
      category: formData.get("category"),
      content: formData.get("content"),
    });

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors, // .flatten().fieldErrors converts Zod errors to readable format
      };
    }

  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }

  let existingUser;
  try {
    // Try to connect first
    await prisma.$connect();
    existingUser = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    console.log("✅ User found:", existingUser?.id);
  } catch (err) {
    console.error("❌ Database connection error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    
    // Check if it's a connection error
    if (errorMessage.includes("Can't reach database server") || 
        errorMessage.includes("P1001") ||
        errorMessage.includes("ECONNREFUSED")) {
      return {
        errors: {
          formErrors: [
            "Database server is unreachable. Please check:",
            "1. Wake up your Neon database in the Neon dashboard",
            "2. Verify your DATABASE_URL in .env file",
            "3. Check your internet connection"
          ],
        },
      };
    }
    
    return {
      errors: {
        formErrors: [`Database error: ${errorMessage}`],
      },
    };
  }

   if(!existingUser) {
      return{
          errors:{
             formErrors:['User not found. Please register before creating an article']
          }
      }
  }

    // Check Cloudinary config
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return {
        errors: {
          formErrors: ["Cloudinary configuration is missing. Please check your environment variables."],
        },
      };
    }

    // start creating article
    const imageFile = formData.get("featuredImage") as File | null;
    if (!imageFile || imageFile.size === 0 ) {
      return {
        errors: {
          featuredImage: ["image file is required"],
        },
      };
    }

    let imageUrl: string;
    try {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(buffer);
      }
    );

    imageUrl = uploadResponse?.secure_url || "";

    if (!imageUrl) {
      console.error("❌ Cloudinary upload failed: No secure_url returned");
      return {
        errors: {
          featuredImage: ["Failed to upload image. Please try again"],
        },
      };
    }
    } catch (error: unknown) {
      console.error("❌ Cloudinary upload error:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      return {
        errors: {
          featuredImage: [`Failed to upload image: ${errorMsg}`],
        },
      };
    }

    try {
    console.log("🔄 Creating article with data:", {
      title: result.data.title,
      category: result.data.category,
      contentLength: result.data.content.length,
      authorId: existingUser.id,
    });

    const article = await prisma.articles.create({
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
        authorId: existingUser.id,
      },
    });

    console.log("✅ Article created successfully:", article.id);
    revalidatePath("/dashboard");
    revalidatePath("/");
    
    // Return success with redirect flag - handle redirect on client side
    return {
      errors: {},
      success: true,
      message: "Article published successfully!",
      redirectTo: "/dashboard",
    };
    } catch (error: unknown) {
      console.error("❌ Prisma error creating article:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message, error.stack);
        return {
          errors: {
            formErrors: [`Database error: ${error.message}`],
          },
        };
      } else {
        return {
          errors: {
            formErrors: ["Some internal server error occurred"],
          },
        };
      }
    }
  } catch (error: unknown) {
    // Catch any unexpected errors at the top level
    console.error("❌ Unexpected error in creatArticle:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return {
      errors: {
        formErrors: [errorMessage],
      },
    };
  }
};
