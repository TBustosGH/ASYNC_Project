import { gql } from "@apollo/client";

const GET_USER = gql`
    query getUserData(
        $userId: ID!
    ) {
        getUser(id: $userId) {
            id
            username
            email
            name
            description
            avatarUrl
            bannerUrl
            createdAt
        }

        getPostsByUser(id: $userId) {
            count
            rows {
                id
                content
                createdAt
                user {
                    id
                    username
                    avatarUrl
                    email
                }
            }
        }
    }
`;

export interface UserData {
    id: number;
    username: string;
    email: string;
    name?: string;
    description?: string;
    avartarUrl?: string;
    bannerUrl?: string;
    createdAt: string;
};

export interface UsersPostsData {
    count: number;
    rows: Array<{
        id: number;
        content: string;
        createdAt: string;
        user: {
            id: number;
            username: string;
            avatarUrl?: string;
            email: string;
        }
    }>;
};

export type UserFullData = {
    getUser: UserData;
    getPostsByUser: UsersPostsData;
};

const VALIDATE_USER_IN_BACKEND = gql`
    query validateUser(
        $email: String!,
        $password: String!
    ) {
        validateUser(email: $email, passwordHash: $password)
    }
`;

export interface UserForAuthenticationData {
    id: string;
    token: string;
};

export default {
    GET_USER,
    VALIDATE_USER_IN_BACKEND
};