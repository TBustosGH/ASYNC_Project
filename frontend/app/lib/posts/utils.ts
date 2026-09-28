import { query } from "../graphql/ApolloClient";
import definitions from "./definitions";


export const getPosts = async () => {
    try {
        const { data, error } = await query({ query: definitions.GET_POSTS });

        if (error) {
            throw new Error(error.message);
        }

        return data.getAllPosts;
    } catch (error) {
        if (error instanceof Error) {
            throw Error(error.message);
        }
    }
};

export const getPost = async (postId: Number) => {
    try {
        if (!postId) {
            throw new Error("Cannot fetch a post if not postId is given.");
        }

        const { data, error } = await query({ 
            query: definitions.GET_POST, 
            variables: {
                parentId: postId,
                getPostId: postId,
            },
        });

        if (error) {
            throw new Error(error.message);
        }

        const { getPost, getComments } = data;

        return { getPost, getComments };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}