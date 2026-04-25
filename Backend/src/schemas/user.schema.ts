import {z} from 'zod';
//User schema for both usre and Admin(for normal users password is not requied )

const strictEmailRegex = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

const strictPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;


export const userSchema = z.object({
    body:z.object({
        name: z.string()
              .min(6, "username must be atleast 6 characters")
              .max(25, "username can not be more than 25 characters")
              .trim()
              .regex(/^[a-zA-Z]+$/,
                    "Username can only contain letters"),

        email: z.string()
                .trim()
                .regex(strictEmailRegex,"please enter a valid email"),

        role: z.enum(["ADMIN","USER"]).default("USER"),

        password: z.string()
                    .min(8, "Password should of minimim 8 characters")
                    .regex(strictPasswordRegex,"Password should Contain atleast One uppercase[A-Z], one Lowercase[a-z], one speacial character [@$!%*?&] and one number[0-9]"),

        address: z.string().trim().min(5),

        city:   z.string().trim().min(5),

        zipcode: z.string().trim().min(5),  

        phoneNumber: z.string()
                    .length(10,"phone number must be of 10 characters")
                    .regex(/^[0-9]+$/, "Phone Number can olny be numbers")


    })
    .superRefine((data,ctx)=>{
        if(data.role == 'ADMIN' && !data.password){
            ctx.addIssue({
                code:z.ZodIssueCode.custom,
                message:"Password is Strictly required for Admins",
                path:["password"]
            })
        }
    })
});

export type CreateUserInput = z.infer<typeof userSchema>['body'];