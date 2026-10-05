import { gql } from "@apollo/client";

// Will return all available post using getAllPosts query from the backend, I should add a limit and an offset later
//TODO: Add limit and offset parameter, to limit the amount of posts this request should return
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
                email
            }
        }
    }
`;

export type PostsData = Array<{
    id: Number;
    content: String;
    createdAt: String;
    user: {
        id: Number;
        username: String;
        avatarUrl: String;
        email: String;
    };
}> | null;

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
                email
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
                    email
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
            email: String;
        } 
    };
    getComments: {
        count: Number;
        rows: Array<{
            id: Number;
            content: String;
            createdAt: String;
            user: {
                id: Number;
                username: String;
                avatarUrl: String;
                email: String;
            }
        }>;
    };
};

export default {
    GET_POSTS,
    GET_POST
};