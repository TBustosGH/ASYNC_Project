import models from "../database/models/index.js";
import type { newPost } from "../types.js";


const getAllPosts = async (limit: number = 12, offset: number = 0) => {
    const { count, rows } = await models.Post.findAndCountAll({
        where: {
            deletedAt: null
        },
        attributes: ["id", "content", "created_at"],
        include: [{ model: models.User }],
        order: [["createdAt", "DESC"]],
        distinct: true,
        limit: limit,
        offset: offset
    });

    console.log("count after getting posts: ", count);
    console.log("rows after getting posts: ", rows);

    return rows;
};

const getPost = async (id: number) => {
    const foundPost = await models.Post.findOne({
        where: {
            id: id,
            deletedAt: null
        },
        attributes: ["id", "content", "created_at"],
        include: [{ model: models.User }]
    });

    console.log("foundPost: ", foundPost);
    return foundPost;
};

const createPost = async (object: newPost) => {
    if (!object) {
        throw new Error("insuficient or invalid data while creating a new post");
    }
    console.log(object);
    const newPost = await models.Post.create({
        userId: object.userId,
        content: object.content
    });

    console.log("new post: ", newPost);

    return newPost;
};

export default {
    getAllPosts,
    getPost,
    createPost
}