// Services
import userServices from "../services/userServices.js";
import postServices from "../services/postServices.js";
// Types
import type { newUser, createUserArgs, newPost, createPostArgs } from "../types.js";



export const resolvers = {
    Query: {
        getAllUsers: async () => {
            const users = await userServices.getUsers();
            return users;
        },
        getUser: async (_parent: unknown, { id }: { id: string }) => {
            const user = await userServices.getUser(Number(id));
            return user;
        },
        getAllPosts: async () => {
            const posts = await postServices.getAllPosts();
            return posts; 
        },
        getPost: async(_parent: unknown, { id }: { id: string }) => {
            const post = await postServices.getPost(Number(id));
            return post;
        }
    },
    Mutation: {
        createUser: async (_parent: unknown, args: createUserArgs) => {
            const body: newUser = {...args};
            try {
                if (!body){
                    throw new Error("No data found for creating a new user");
                }

                const newUser = await userServices.createUser(body);
                return newUser;
            } catch (error) {
                let errorMessage = "Something went wrong: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        },
        createPost: async (_parent: unknown, args: createPostArgs) => {
            const body: newPost = {...args};
            try {
                if (!body) {
                    throw new Error("No data found for creating a new post");
                }

                const newPost = await postServices.createPost(body);
                return newPost;
            } catch (error) {
                let errorMessage = "Something went wrong: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        }
    }
};