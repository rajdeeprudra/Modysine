import {z} from 'zod';
//User schema for both usre and Admin(for normal users password is not requied )

const strictEmailRegex = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

const strictPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;


export const baseUserFields = z.object({
  name: z.string()
    .min(6, "username must be atleast 6 characters")
    .max(25, "username can not be more than 25 characters")
    .trim()
    .regex(/^[a-zA-Z]+$/, "Username can only contain letters"),

  email: z.string()
    .trim()
    .regex(strictEmailRegex, "please enter a valid email"),

  role: z.enum(["ADMIN", "USER"]).default("USER"),

  // Made optional here so .superRefine can handle the custom logic below!
  password: z.string()
    .min(8, "Password should of minimim 8 characters")
    .regex(strictPasswordRegex, "Password should Contain atleast One uppercase[A-Z], one Lowercase[a-z], one speacial character [@$!%*?&] and one number[0-9]")
    .optional(),

  address: z.string().trim().min(5),
  
  city: z.string().trim().min(5),
  
  zipcode: z.string().trim().min(5),  
  
  phoneNo: z.string()
    .length(10, "phone number must be of 10 characters")
    .regex(/^[0-9]+$/, "Phone Number can olny be numbers")
});

// 2. The specific schema for your User routes
export const userSchema = z.object({
  // We attach the superRefine directly to the inner body object
  body: baseUserFields.superRefine((data, ctx) => {
    // Custom Logic: If they are an ADMIN, the password becomes strictly required
    if (data.role === 'ADMIN' && !data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is Strictly required for Admins",
        path: ["password"] // This maps the error directly to the password field
      });
    }
  })
});

export type CreateUserInput = z.infer<typeof userSchema>['body'];

export const loginUserSchema = z.object({
    body:z.object({
        email:z.string()
                .trim()
                .regex(strictEmailRegex,"please enter your valid email"),
        password: z.string()
                   .min(8, "Password should of minimim 8 characters")
                   .regex(strictPasswordRegex,"Password should Contain atleast One uppercase[A-Z], one Lowercase[a-z], one speacial character [@$!%*?&] and one number[0-9]"),

    })
})