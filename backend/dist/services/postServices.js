// Sequelize
import { Sequelize } from "sequelize";
import models from "../database/models/index.js";
// Services
import userServices from "./userServices.js";
const getAllPosts = async (limit = 12, offset = 0) => {
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
const getPost = async (id) => {
    const foundPost = await models.Post.findOne({
        where: {
            id: id,
            deletedAt: null
        },
        include: [{ model: models.User }, { model: models.Comment }]
    });
    return foundPost;
};
const getPostsByUser = async (id) => {
    const userAuthor = await userServices.getUser(Number(id)); // Checks if the id is owned by any existing user
    if (!userAuthor) {
        throw new Error("the specified ID does not correspond to any existing user"); //  throws an error if the id is not owned by any user
    }
    const { count, rows } = await models.Post.findAndCountAll({
        where: {
            userId: id,
            deletedAt: null
        },
        include: [{ model: models.User }]
    });
    return { count, rows };
};
const createPost = async (object) => {
    if (!object) {
        // Throw an error if no object has been passed as a parameter
        throw new Error("insuficient or invalid data while creating a new post");
    }
    const userAuthor = await userServices.getUser(Number(object.userId)); // Search for the author
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
const deletePost = async (id) => {
    const [affectedCount] = await models.Post.update({ deletedAt: Sequelize.fn("NOW") }, {
        where: { id: id, deletedAt: null }
    });
    return affectedCount > 0 ? "post deleted succesfully" : "post not found";
};
const deletePostsByUser = async (id) => {
    const [affectedCount] = await models.Post.update({ deletedAt: Sequelize.fn("NOW") }, {
        where: {
            userId: id,
            deletedAt: null
        }
    });
    return affectedCount;
};
const updatePost = async (object) => {
    const postToUpdate = { ...object };
    await models.Post.update({
        content: postToUpdate.content,
        updatedAt: Sequelize.fn("NOW")
    }, {
        where: {
            id: Number(postToUpdate.id),
            deletedAt: null
        }
    });
    const updatedPost = await getPost(Number(postToUpdate.id));
    return updatedPost;
};
export default {
    getAllPosts,
    getPost,
    getPostsByUser,
    createPost,
    deletePost,
    deletePostsByUser,
    updatePost
};
//# sourceMappingURL=postServices.js.map