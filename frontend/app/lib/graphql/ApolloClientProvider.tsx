'use client';

import { HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache
} from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URI,
});

const authLink = new SetContextLink(async (prevContext) => {
    const session = await getSession();
    const token = session?.user?.backendToken;

    return {
        headers: {
            ...prevContext.headers,
            //authorization: token ? `Bearer ${token}` : "",
            authorization: token
        },
    };
});

function makeClient() {
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
}

export function ApolloClientProvider({ children }: { children: React.ReactNode}) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            { children }
        </ApolloNextAppProvider>
    )
}