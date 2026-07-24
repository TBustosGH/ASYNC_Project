import models from "../database/models/index.js";
import type { newUser } from "../types.js";

const getUsers = async () => {
    return await models.User.findAll({
        where: {
            deletedAt: null
        }
    });
};

const getUser = async (id: number) => {
    const foundUser = await models.User.findOne({
        where: {
            id: id,
            deletedAt: null
        }
    });

    console.log("found user: ", foundUser);
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
    console.log("newUser", newUser);

    return newUser;
};


export default {
    getUsers,
    getUser,
    createUser
}