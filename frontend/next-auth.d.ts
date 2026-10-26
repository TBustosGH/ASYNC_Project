import type { DefaultSession } from "next-auth";


declare module "next-auth" {
    interface User {
        id?: string;
        username?: string;
        passwordHash?: string;
    }

    interface Session {
        user?: DefaultSession["user"] & {
            id: string;
            username?: string;
        };
    }
}

declare module "next-auth/jwt/types" {
    interface JWT {
        id?: string;
        username?: string;
    }
}

export {};