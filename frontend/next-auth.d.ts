import type { DefaultSession } from "next-auth";


declare module "next-auth" {
    interface User {
        id?: string;
        backendToken: string;
    }

    interface Session {
        user?: DefaultSession["user"] & {
            id: string;
            backendToken?: string;
        };
    }
}

declare module "next-auth/jwt/types" {
    interface JWT {
        id?: string;
        backendToken: string;
    }
}

export {};