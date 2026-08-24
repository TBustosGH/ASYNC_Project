import { Sequelize } from "sequelize";
import models from "../../database/models/index.js";
import type {
    newComment,
    typeComment
} from "../../types.js";
import userServices from "../users/userServices.js";
import postServices from "../posts/postServices.js";

export const getComment = async (id: number) => {
    const comment: typeComment | null = await models.Comment.findOne({
        where: {
            id: id,
            deletedAt: null
        },
        include: [{ model: models.Post}, { model: models.User }],
    });
    
    console.log("Comment: ", comment);

    return comment;
};

export const getCommentsByPost = async (postId: number) => {
    const parentPost = await postServices.getPost(postId);
    if (!parentPost) {
        throw new Error("the specified ID does not correspond to any existing post");
    }

    const { count, rows }: { count: number, rows: Array<typeComment>} = await models.Comment.findAndCountAll({
        where: {
            postId: postId,
            deletedAt: null
        },
        include: [{ model: models.Post }, { model: models.User }]
    });

    return { count, rows };
};

export const createComment = async (object: newComment) => {
    if (!object) {
        throw new Error("insuficient or invalid data to create a new comment");
    }

    const userAuthor = await userServices.getUser(Number(object.userId));   // Search for the author
    if (!userAuthor) {
        // If the author does not exist throw an error
        throw new Error("the specified user ID does not correspond to any existing user");
    }
    // Do the same for the parent post
    const parentPost = await postServices.getPost(Number(object.postId));
    if (!parentPost) {
        throw new Error("the specified post ID does not correspond to any existing post");
    }

    const newComment = await models.Comment.create({
        postId: object.postId,
        userId: object.userId,
        content: object.content
    });

    console.log("new Comment: ", newComment);

    return newComment;
};

export const updateComment = async (object: typeComment) => {
    const commentToUpdate = {...object};

    await models.Comment.update(
        {
            content: commentToUpdate.content,
            updatedAt: Sequelize.fn("NOW")
        },
        {
            where: {
                id: Number(commentToUpdate.id),
                deletedAt: null
            }
        }
    );

    const updatedComment = await getComment(Number(commentToUpdate.id));

    return updatedComment;
};

export const deleteComment = async (id: number) => {
    const [affectedCount] = await models.Comment.update(
        { deletedAt: Sequelize.fn("NOW") },
        {
            where: { id: id, deletedAt: null }
        }
    );

    return affectedCount > 0 ? "comment deleted succesfully" : "comment not found";
};

export const deleteCommentsByUser = async (userId: number) => {
    const [affectedCount] = await models.Comment.update(
        { deletedAt: Sequelize.fn("NOW") },
        {
            where: {
                userId: userId,
                deletedAt: null
            }
        }
    );

    return affectedCount;
};

export const deleteCommentsByPost = async (postId: number) => {
    const [affectedCount] = await models.Comment.update(
        { deletedAt: Sequelize.fn("NOW") },
        {
            where: {
                postId: postId,
                deletedAt: null
            }
        }
    );

    return affectedCount;
};