import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { ZodError } from "zod";
import { signInSchema } from "@/app/lib/zod";
import { saltAndHashPassword } from "@/app/lib/utils";
import { getUserForValidation } from "@/app/lib/users/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {
                    type: "string",
                    label: "Username",
                },
                email: {
                    type: "email",
                    label: "Email",
                },
                password: {
                    type: "password",
                    label: "Password",
                },
            },
            authorize: async (credentials) => {
                try {
                    const { email, username, password } = await signInSchema.parseAsync(credentials);

                    const pwHash = await saltAndHashPassword(password);

                    const user = await getUserForValidation(username, email, pwHash);
                    console.log(user);

                    if (!user) {
                        throw new Error("Invalid credentials");
                    }

                    return user;
                } catch (error) {
                    if (error instanceof ZodError) {
                        return null;
                    }
                }
            },
        }),
    ],
});