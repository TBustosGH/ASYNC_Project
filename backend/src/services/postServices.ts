import { Sequelize } from "sequelize";
import models from "../database/models/index.js";
import type { newPost, typePost } from "../types.js";
import userServices from "./userServices.js";

const getAllPosts = async (limit: number = 12, offset: number = 0) => {
    const rows = await models.Post.findAll({
        where: {
            deletedAt: null
        },
        attributes: ["id", "content", "createdAt"],
        include: [{ model: models.User }],
        order: [["createdAt", "DESC"]],
        limit: limit,
        offset: offset
    });

    return rows;
};

const getPost = async (id: number) => {
    const foundPost = await models.Post.findOne({
        where: {
            id: id,
            deletedAt: null
        },
        include: [{ model: models.User }]
    });

    return foundPost;
};

const createPost = async (object: newPost) => {
    if (!object) {
        // Throw an error if no object has been passed as a parameter
        throw new Error("insuficient or invalid data while creating a new post");
    }

    const userAuthor = await userServices.getUser(Number(object.userId));   // Search for the author
    if (!userAuthor) {
        // If the author does not exist throw an error
        throw new Error("the specified ID does not correspond to any existing user");
    }

    const newPost = await models.Post.create({
        userId: object.userId,
        content: object.content
    });

    return newPost;
};

const deletePost = async (id: number) => {
    const [affectedCount] = await models.Post.update(
        { deletedAt: Sequelize.fn("NOW")},
        {
            where: { id: id, deletedAt: null }
        }
    );

    return affectedCount > 0 ? "post deleted succesfully" : "post not found" ;
};

const deletePostsByUser = async (id: number) => {
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

const updatePost = async (object: typePost) => {
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

export default {
    getAllPosts,
    getPost,
    createPost,
    deletePost,
    deletePostsByUser,
    updatePost
}