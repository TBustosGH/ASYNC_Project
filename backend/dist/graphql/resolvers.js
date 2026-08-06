// GraphQL
import { DateTimeResolver } from "graphql-scalars";
// Services
import userServices from "../services/userServices.js";
import postServices from "../services/postServices.js";
import commentServices from "../services/commentServices.js";
export const resolvers = {
    DateTime: DateTimeResolver,
    Query: {
        getAllUsers: async () => {
            const users = await userServices.getUsers();
            return users;
        },
        getUser: async (_parent, { id }) => {
            try {
                if (!(id || isNaN(Number(id)))) {
                    throw new Error("invalid or inexistent id");
                }
                const user = await userServices.getUser(Number(id));
                return user;
            }
            catch (error) {
                let errorMessage = "Something went wrong while looking out for an user: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        },
        getAllPosts: async () => {
            const posts = await postServices.getAllPosts();
            return posts;
        },
        getPost: async (_parent, { id }) => {
            try {
                if (!(id || isNaN(Number(id)))) {
                    throw new Error("invalid or inexistent id");
                }
                const post = await postServices.getPost(Number(id));
                return post;
            }
            catch (error) {
                let errorMessage = "Something went wrong while looking out for a post: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        },
        getPostsByUser: async (_parent, { id }) => {
            try {
                if (!id || isNaN(Number(id))) {
                    throw new Error("invalid or inexistent id");
                }
                const { count, rows } = await postServices.getPostsByUser(Number(id));
                return { count, rows };
            }
            catch (error) {
                let errorMessage = "Something went wrong while looking out for posts of a user: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        },
        getComments: async (_parent, { parentId }) => {
            try {
                if (!parentId || isNaN(parentId)) {
                    throw new Error("invalid or inexistent id");
                }
                const { count, rows } = await commentServices.getCommentsByPost(parentId);
                return { count, rows };
            }
            catch (error) {
                let errorMessage = "Something went wrong while looking out for comments of a post: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(`\n\n 
                    ======================================================
                    ${errorMessage}
                    ======================================================
                \n\n`);
                return null;
            }
        }
    },
    Mutation: {
        createUser: async (_parent, args) => {
            const body = { ...args };
            try {
                if (!body) {
                    throw new Error("No data found for creating a new user");
                }
                const newUser = await userServices.createUser(body);
                return newUser;
            }
            catch (error) {
                let errorMessage = "Something went wrong: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        },
        createPost: async (_parent, args) => {
            const body = { ...args };
            try {
                if (!body) {
                    throw new Error("No data found for creating a new post");
                }
                const newPost = await postServices.createPost(body);
                return newPost;
            }
            catch (error) {
                let errorMessage = "Something went wrong: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        },
        createComment: async (_parent, args) => {
            const body = { ...args };
            try {
                if (!body) {
                    throw new Error("No data found for creating a new comment");
                }
                const newComment = await commentServices.createComment(body);
                return newComment;
            }
            catch (error) {
                let errorMessage = "Something went wrong trying to create a new comment: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        },
        deletePost: async (_parent, { id }) => {
            try {
                if (!id) {
                    throw new Error("no post id given for delete post");
                }
                return await postServices.deletePost(Number(id));
            }
            catch (error) {
                let errorMessage = "Something went wrong while trying to delete a post: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        },
        deleteUser: async (_parent, { id }) => {
            try {
                if (!id) {
                    throw new Error("no user id given for delete user");
                }
                return await userServices.deleteUser(Number(id));
            }
            catch (error) {
                let errorMessage = "Something went wrong while trying to delete user: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        },
        deleteComment: async (_parent, { id }) => {
            try {
                if (!(id || isNaN(id))) {
                    throw new Error("invalid or inexistent id for deleting comment");
                }
                return await commentServices.deleteComment(id);
            }
            catch (error) {
                let errorMessage = "Something went wrong trying yo delete comment: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log("errorMessage");
                return null;
            }
        },
        updateUser: async (_parent, args) => {
            try {
                const userToUpdate = await userServices.getUser(Number(args.id));
                if (!userToUpdate) { // Throws an error if not user is found
                    throw new Error("Invalid ID");
                }
                const modifiedUser = {
                    id: userToUpdate.id, // 
                    createdAt: userToUpdate.createdAt,
                    username: args.username || userToUpdate.username,
                    email: args.email || userToUpdate.email,
                    name: args.name || userToUpdate.name,
                    passwordHash: args.passwordHash || userToUpdate.passwordHash,
                    description: args.description || userToUpdate.description,
                    avatarUrl: args.avatarUrl || userToUpdate.avatarUrl,
                    bannerUrl: args.bannerUrl || userToUpdate.bannerUrl
                };
                const updatedUser = await userServices.updateUser(modifiedUser);
                return updatedUser;
            }
            catch (error) {
                let errorMessage = "Something went wrong while trying to update user: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        },
        updatePost: async (_parent, args) => {
            try {
                const postToUpdate = await postServices.getPost(Number(args.id));
                if (!postToUpdate) { // Throws an error if not post is found
                    throw new Error("Invalid ID");
                }
                const modifiedPost = {
                    id: postToUpdate.id,
                    userId: postToUpdate.userId,
                    createdAt: postToUpdate.createdAt,
                    content: args.content || postToUpdate.content
                };
                const updatedPost = await postServices.updatePost(modifiedPost);
                return updatedPost;
            }
            catch (error) {
                let errorMessage = "Something went wrong while trying to update a post: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        },
        updateComment: async (_parent, args) => {
            try {
                const commentToUpdate = await commentServices.getComment(Number(args.id));
                if (!commentToUpdate) { // Throws an error if no comment is found
                    throw new Error("Invalid ID");
                }
                const modifiedComment = {
                    id: commentToUpdate.id,
                    postId: commentToUpdate.postId,
                    userId: commentToUpdate.userId,
                    content: args.content,
                    createdAt: commentToUpdate.createdAt
                };
                const updatedComment = await commentServices.updateComment(modifiedComment);
                return updatedComment;
            }
            catch (error) {
                let errorMessage = "Something went wrong trying to update a comment: ";
                if (error instanceof Error) {
                    errorMessage += error.message;
                }
                console.log(errorMessage);
                return null;
            }
        }
    }
};
//# sourceMappingURL=resolvers.js.map