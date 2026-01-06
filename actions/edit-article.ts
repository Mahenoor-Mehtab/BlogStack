"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";

// Initialize Cloudinary
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

export const editArticle = async (
  articleId: string,
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
        errors: result.error.flatten().fieldErrors,
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

    const existingArticle = await prisma.articles.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!existingArticle) {
      return {
        errors: {
          formErrors: ["Article not found"],
        },
      };
    }

    let existingUser;
    try {
      await prisma.$connect();
      existingUser = await prisma.user.findUnique({
        where: { clerkUserId: userId },
      });

      console.log("✅ User found:", existingUser?.id);
    } catch (err) {
      console.error("❌ Database connection error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";

      if (
        errorMessage.includes("Can't reach database server") ||
        errorMessage.includes("P1001") ||
        errorMessage.includes("ECONNREFUSED")
      ) {
        return {
          errors: {
            formErrors: [
              "Database server is unreachable. Please check your connection.",
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

    if (!existingUser) {
      return {
        errors: {
          formErrors: [
            "User not found. Please register before editing an article",
          ],
        },
      };
    }

    // Check Cloudinary config
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return {
        errors: {
          formErrors: [
            "Cloudinary configuration is missing. Please check your environment variables.",
          ],
        },
      };
    }

    // Handle image upload - ONLY if new image is provided
    let imageUrl = existingArticle.featuredImage; // Start with existing image
    const imageFile = formData.get("featuredImage") as File | null;

    // Only upload new image if file is provided and has content
    if (imageFile && imageFile.size > 0) {
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

        if (uploadResponse?.secure_url) {
          imageUrl = uploadResponse.secure_url;
        } else {
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
    }

    // Update article
    try {
      console.log("🔄 Updating article with data:", {
        articleId,
        title: result.data.title,
        category: result.data.category,
        contentLength: result.data.content.length,
        imageChanged: imageFile && imageFile.size > 0,
      });

      const article = await prisma.articles.update({
        where: {
          id: articleId,
        },
        data: {
          title: result.data.title,
          category: result.data.category,
          content: result.data.content,
          featuredImage: imageUrl,
        },
      });

      console.log("✅ Article updated successfully:", article.id);
      revalidatePath("/dashboard");
      revalidatePath("/");

      return {
        errors: {},
        success: true,
        message: "Article updated successfully!",
        redirectTo: "/dashboard",
      };
    } catch (error: unknown) {
      console.error("❌ Prisma error updating article:", error);
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
    console.error("❌ Unexpected error in editArticle:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return {
      errors: {
        formErrors: [errorMessage],
      },
    };
  }
};