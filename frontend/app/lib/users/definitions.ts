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

export type UserData = {
    getUser: {
        id: Number;
        username: String;
        email: String;
        name?: String;
        description?: String;
        avartarUrl?: String;
        bannerUrl?: String;
        createdAt: String;
    };
    getPostsByUser: {
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
    }
};

export default {
    GET_USER
};