import { z } from "zod";

export const signInSchema = z.object({
    email: z.email({ error: "Invalid email" })
        .min(1, {error: "Email is required"}),
    username: z.string()
        .min(1, { error: "Username is required" }),
    password: z.string()
        .min(1, { error: "Password is required" })
        .min(8, { error: "Password must be more than 8 characters" })
        .max(32, { error: "Password must be less than 32 characters" })
});