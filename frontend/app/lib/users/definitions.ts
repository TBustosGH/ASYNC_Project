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
    id: Number;
    username: String;
    email: String;
    name?: String;
    description?: String;
    avartarUrl?: String;
    bannerUrl?: String;
    createdAt: String;
};

export interface UsersPostsData {
    count: Number;
    rows: Array<{
        id: Number;
        content: String;
        createdAt: String;
        user: {
            id: Number;
            username: String;
            avatarUrl?: String;
            email: String;
        }
    }>;
};

export type UserFullData = {
    getUser: UserData;
    getPostsByUser: UsersPostsData;
};

const GET_USER_FOR_AUTHENTICATION = gql`
    query getUserForAuthentication(
        $userUsername: String!
        $userEmail: String!
        $passwordHash: String!
    ) {
        getUserForValidation(
            username: $userUsername
            email: $userEmail
            passwordHash: $userPasswordHash
        ) {
            id
            username
            email
            passwordHash
        }
    }
`;

export interface UserForAuthenticationData {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
};

export default {
    GET_USER,
    GET_USER_FOR_AUTHENTICATION
};