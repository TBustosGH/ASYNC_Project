import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { signInSchema } from "@/app/lib/zod";
import { saltAndHashPassword } from "@/app/lib/utils";

// GraphQL
import { getClient } from "./app/lib/graphql/ApolloClient";
import definitions, { type UserForAuthenticationData } from "@/app/lib/users/definitions";

const validateUser = async (propEmail: string, propPassword: string) => {
    try {
        if (!propEmail || !propPassword) throw new Error();

        const client = getClient();
        //  Fetch user from DB and throw error if not found
        const { data, error } = await client.query({
            query: definitions.VALIDATE_USER_IN_BACKEND,
            variables:  {
                userEmail: propEmail,
                userPassword: propPassword,
            },
        });
        if (error) throw new Error();

        console.log("USER TOKEN: ", data?.VALIDATE_USER_IN_BACKEND)
        const { id, token }: UserForAuthenticationData = data?.VALIDATE_USER_IN_BACKEND;

        return { id, token };
    } catch (error) {
        return null;
    }
};


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
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
            authorize: async (credentials, _request) => {
                try {
                    //  Throw error if no credentials
                    if (!credentials.email || !credentials.password || !credentials.username) throw new Error();
                    console.log("CREDENTIALS: ", credentials);

                    //  Parse credentials
                    const { email, username, password } = await signInSchema.parseAsync(credentials);

                    const pwHash = await saltAndHashPassword(password);
                    //  Validate user in backend backend
                    const user = await validateUser(email, pwHash);
                    if (!user) throw new Error();
                    console.log(user);
                    //  Return user data
                    return user;
                } catch (error) {
                    console.log("Authorize error: ", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        //  Se ejecuta cuando el usuario inicia sesión o se actualiza el token
        async jwt({ token, user }) {
            console.log("USER?: ", user);
            console.log("TOKEN?: ", token);
            if (user) {
                //token.id = user.id;
                //token.user.backendToken = user.backendToken as string;
                token.user.backendToken = user;
            }

            return token;
        },
        //  Transfiere los datos del token a la sesión que usará la aplicación
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.backendToken = token.backendToken as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/signIn",
    },
});