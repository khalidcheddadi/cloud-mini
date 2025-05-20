import { z } from "zod";

// create Article Schema
    export const CreateArticleSchema = z.object({
        title: z.string({
            required_error: 'title is required',
            invalid_type_error: 'title should be of type string'
        })
        .min(2, { message: 'title darori ykon kbir mn 2' })
        .max(222, { message: 'title darori ykon sghir mn 222' }),
        description: z.string().min(2),
    });


// register schema

    export const RegisterSchema = z.object({
        username: z.string().min(2).max(100),
        email: z.string().min(5).max(100).email(),
        password: z.string().min(5),
    });




// Login schema

    export const LoginSchema = z.object({
        email: z.string().min(5).max(100).email(),
        password: z.string().min(5),
    });

    // update profile schema

    export const UpDateProfileSchema = z.object({
        username: z.string().min(2).max(100).optional(),
        email: z.string().min(5).max(100).email().optional(),
        password: z.string().min(5).optional(),
    });


//  schema

    export const CommentSchema = z.object({
        text: z.string().min(5).max(500),
        ArticleId: z.number(),
    });