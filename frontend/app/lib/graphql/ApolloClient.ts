import { HttpLink } from "@apollo/client";
import {
    registerApolloClient,
    ApolloClient,
    InMemoryCache
} from "@apollo/client-integration-nextjs";

const backendUri = process.env.BACKEND_URI;

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: backendUri,
            fetchOptions: { cache: "no-store" },
        }),
    });
});