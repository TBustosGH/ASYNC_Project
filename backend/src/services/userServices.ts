import { Sequelize } from "sequelize";
import models from "../database/models/index.js";
import type { newUser } from "../types.js";
import postServices from "./postServices.js";

const getUsers = async (limit: number = 10, offset: number = 0) => {
    const users = await models.User.findAll({
        where: {
            deletedAt: null
        },
        attributes: ["id", "username", "email", "name", "description", "avatarUrl", "createdAt"],
        limit: limit,
        offset: offset
    });
    return users;
};


const getUser = async (id: number) => {
    const foundUser = await models.User.findOne({
        where: {
            id: id,
            deletedAt: null
        }
    });
    return foundUser;
};

const createUser = async (object: newUser) => {
    if (!object) {
        throw new Error("insuficient or invalid data while creating a new user");
    }

    const newUser = await models.User.create({
        username: object.username,
        email: object.email,
        name: object.name,
        passwordHash: object.passwordHash,
        description: object.description,
        avatarUrl: object.avatarUrl,
        bannerUrl: object.bannerUrl
    });

    return newUser;
};

const deleteUser = async (id: number) => {
    const [affectedCount] = await models.User.update(
        { deletedAt: Sequelize.fn("NOW") },
        {
            where: { id: id, deletedAt: null }
        }
    );

    const deletedUserPosts = await postServices.deletePostsByUser(id);

    return affectedCount > 0 ? `user deleted succesfully and his posts (${deletedUserPosts}) were deleted` : "user not found";
}


export default {
    getUsers,
    getUser,
    createUser,
    deleteUser
}