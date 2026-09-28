'use client';

import { HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache
} from "@apollo/client-integration-nextjs";

const backendUri = process.env.BACKEND_URI;

function makeClient() {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: backendUri,
        }),
    });
}

export function ApolloClientProvider({ children }: { children: React.ReactNode}) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            { children }
        </ApolloNextAppProvider>
    )
}