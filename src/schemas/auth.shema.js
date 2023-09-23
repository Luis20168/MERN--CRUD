import {z} from 'zod';

export const registerShema= z.object({
    username: z.string({
        required_error: "Username is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Email is not valid"
    }),
    password: z
    .string({
        required_error: "Password is required"

    })
    .min(6, {
        message: "Password musst be at least 6 characters"
    })
        
})





export const loginShema= z.object({
    email: z
    .string({
        required_error: 'email is required'
    })
    .email({
        message: "Email is not valid"
    }),
    password: z
    .string({
        required_error: 'password required'
    }).min(6, {
        message: 'password must be at least 6 characters'
    })
})



