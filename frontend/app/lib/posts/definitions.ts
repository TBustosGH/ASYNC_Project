import { gql } from "@apollo/client";

const GET_POSTS = gql`
    query GetPosts {
        getAllPosts {
            id
            content
            createdAt
            user {
                id
                username
                avatarUrl
            }
        }
    }
`;

export type PostsData = {
    getAllPosts: Array<{
        id: Number;
        content: String;
        createdAt: String;
        user: {
            id: Number;
            username: String;
            avatarUrl: String;
        }
    }> | null;
};

// Will return a specific post (getPost query) with its comments (getComments query)
const GET_POST = gql`
    query GetPost(
        $getPostId: ID!, 
        $parentId: ID!
    ) {
        getPost(id: $getPostId) {
            id
            content
            createdAt
            user {
                id
                username
                avatarUrl
            }
        }
        
        getComments(parentId: $parentId) {
            count
            rows {
                id
                content
                createdAt
                user {
                    id
                    username
                    avatarUrl
                }
            }
        }
    }
`;

export type PostData = {
    getPost: {
        id: Number;
        content: String;
        createdAt: String;
        user: {
            id: Number;
            username: String;
            avatarUrl: String;
        } 
    } | null;
    getComment: {
        count: Number;
        rows: {
            id: Number;
            content: String;
            createdAt: String;
            user: {
                id: Number;
                username: String;
                avatarUrl: String;
            }
        }
    } | null;
};

export default {
    GET_POSTS,
    GET_POST
};