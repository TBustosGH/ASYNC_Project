import { HttpLink } from "@apollo/client";
import {
    registerApolloClient,
    ApolloClient,
    InMemoryCache
} from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { auth } from "@/auth";

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URI,
});

const authLink = new SetContextLink(async (prevContext) => {
    const session = await auth();
    const token = session?.user;
    console.log("\n\nSESSION: ", token);
    return {
        headers: {
            ...prevContext.headers,
            //authorization: token ? `Bearer ${token}` : "",
            authorization: token
        },
    };
});


export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
});