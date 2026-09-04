// Sequelize
import { Sequelize } from "sequelize";
import models from "../../database/models/index.js";
// TS types
import type { 
    newPost, 
    typePost,
    typeSavedPost 
} from "../../types.js";
// Services
import userServices from "../users/userServices.js";

export const getAllPosts = async (limit: number = 12, offset: number = 0) => {
    const rows = await models.Post.findAll({
        where: {
            deletedAt: null
        },
        include: [{ model: models.User }],
        order: [["createdAt", "DESC"]],
        limit: limit,
        offset: offset
    });
    return rows;
};

export const getPost = async (id: number) => {
    const foundPost: typePost | null = await models.Post.findOne({
        where: {
            id: id,
            deletedAt: null
        },
        include: [{ model: models.User }, { model: models.Comment }]
    });

    return foundPost;
};

export const getPostsByUser = async (id: number) => {
    const userAuthor = await userServices.getUser(Number(id));  // Checks if the id is owned by any existing user
    if (!userAuthor) {
        throw new Error("the specified ID does not correspond to any existing user");   //  throws an error if the id is not owned by any user
    }

    const { count, rows }: { count: number, rows: Array<typePost>} = await models.Post.findAndCountAll({
        where: {
            userId: id,
            deletedAt: null
        },
        include: [{ model: models.User }]
    });

    return { count, rows };
};

export const createPost = async (object: newPost) => {
    if (!object) {
        // Throw an error if no object has been passed as a parameter
        throw new Error("insuficient or invalid data while creating a new post");
    }

    const userAuthor = await userServices.getUser(Number(object.userId));   // Search for the author
    if (!userAuthor) {
        // If the author does not exist throw an error
        throw new Error("the specified ID does not correspond to any existing user");
    }

    const newPost = await models.Post.create({  //  Creates and saves the new post in the DB
        userId: object.userId,
        content: object.content
    });

    return newPost;
};

export const deletePost = async (id: number) => {
    const [affectedCount] = await models.Post.update(
        { deletedAt: Sequelize.fn("NOW")},
        {
            where: { id: id, deletedAt: null }
        }
    );

    return affectedCount > 0 ? "post deleted succesfully" : "post not found" ;
};

export const deletePostsByUser = async (id: number) => {
    const [affectedCount] = await models.Post.update(
        { deletedAt: Sequelize.fn("NOW") },
        {
            where: {
                userId: id,
                deletedAt: null
            }
        }
    );

    return affectedCount;
};

export const updatePost = async (object: typePost) => {
    const postToUpdate = {...object};

    await models.Post.update(
        {
            content: postToUpdate.content,
            updatedAt: Sequelize.fn("NOW")
        },
        {
            where: {
                id: Number(postToUpdate.id),
                deletedAt: null
            }
        }
    );

    const updatedPost = await getPost(Number(postToUpdate.id));

    return updatedPost;
};

export const savePost = async (userId: number, postId: number) => {
    // Check if userId is a valid ID for a user
    const user = await userServices.getUser(userId);
    if (!user) {
        throw new Error("User ID is not associated with any existent user.");
    }

    // Check if postId is a valid ID for a post
    const post = await getPost(postId);
    if (!post) {
        throw new Error("Post ID is not associated with any existent post.");
    }

    // Once IDs are checked
    // Save post
    await models.SavedPost.create({
        userId: userId,
        postId: postId
    });

    return "Post saved!";
};

export const unsavePost = async (userId: number, postId: number) => {
    const [affectedCount] = await models.SavedPost.update(
        { deletedAt: Sequelize.fn("NOW") },
        {
            where: { postId: postId, userId: userId, deletedAt: null }
        }
    );

    return affectedCount > 0 ? "post unsaved succesfully" : "no saved post found";
};

export const getAllSavedPosts = async (userId: number, limit: number = 12, offset: number = 0) => {
    // Check if the userId is valid
    const user = await userServices.getUser(userId);
    if (!user) {
        throw new Error("Invalid userId, couldn't get any saved post.");
    }
    // Get the number of posts saved by a user along with the posts
    const { count, rows }: { count: number, rows: Array<typeSavedPost> } = await models.SavedPost.findAndCountAll({
        where: {
            userId: userId,
            deletedAt: null
        },
        attributes: ["createdAt"],
        include: [{
            model: models.Post,
            as: "savedPost",
            include: [{
                model: models.User
            }]
        }],
        order: [["createdAt", "DESC"]],
        limit: limit,
        offset: offset,
    });

    return { count, rows };
};