import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { signInSchema } from "@/app/lib/zod";
import { verifyPassword } from "@/app/lib/utils";

// GraphQL
import { getClient } from "./app/lib/graphql/ApolloClient";
import definitions, { type UserForAuthenticationData } from "@/app/lib/users/definitions";

const getUserForValidation = async (propEmail: string) => {
    try {
        if (!propEmail) throw new Error();

        const client = getClient();
        //  Fetch user from DB and throw error if not found
        const { data, error } = await client.query({
            query: definitions.GET_USER_FOR_AUTHENTICATION,
            variables:  {
                userEmail: propEmail,
            },
        });
        if (error) throw new Error();

        const { id, username, email, passwordHash }: UserForAuthenticationData = data?.getUserForValidation;

        return { id, username, email, passwordHash };
    } catch (error) {
        return null;
    }
};


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
            authorize: async (credentials, _request) => {
                try {
                    //  Throw error if no credentials
                    if (!credentials.email || !credentials.password || !credentials.username) throw new Error();

                    //  Parse credentials
                    const { email, username, password } = await signInSchema.parseAsync(credentials);

                    //  Fetch user from backend
                    const user = await getUserForValidation(email);
                    if (!user) throw new Error();

                    //  Validate user
                    const isValid = await verifyPassword(password, user.passwordHash);
                    if (!isValid) throw new Error();

                    //  Return user data
                    return {
                        id: user.id.toString(),
                        email: user.email.toString(),
                        username: user.username.toString()
                    };
                } catch (error) {
                    console.log("Authorize error: ", error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/signIn",
    }
});