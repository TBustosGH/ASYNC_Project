// Sequelize
import { Sequelize } from "sequelize";
import models from "../database/models/index.js";
// Services
import postServices from "./postServices.js";
import commentServices from "./commentServices.js";
const getUsers = async (limit = 10, offset = 0) => {
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
const getUser = async (id) => {
    const foundUser = await models.User.findOne({
        where: {
            id: id,
            deletedAt: null
        }
    });
    return foundUser;
};
const createUser = async (object) => {
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
const deleteUser = async (id) => {
    const [affectedCount] = await models.User.update({ deletedAt: Sequelize.fn("NOW") }, {
        where: {
            id: id,
            deletedAt: null
        }
    });
    const deletedUserPosts = await postServices.deletePostsByUser(id);
    const deletedUserComments = await commentServices.deleteCommentsByUser(id);
    return affectedCount > 0 ? `user deleted succesfully and his posts (${deletedUserPosts}) & comments (${deletedUserComments}) were deleted` : "user not found";
};
const updateUser = async (object) => {
    const userToUpdate = { ...object };
    await models.User.update({
        username: userToUpdate.username,
        email: userToUpdate.email,
        name: userToUpdate.name,
        passwordHash: userToUpdate.passwordHash,
        description: userToUpdate.description,
        avatarUrl: userToUpdate.avatarUrl,
        bannerUrl: userToUpdate.bannerUrl,
        updatedAt: Sequelize.fn("NOW")
    }, {
        where: {
            id: Number(userToUpdate.id),
            deletedAt: null
        }
    });
    const updatedUser = await getUser(Number(userToUpdate.id));
    return updatedUser;
};
export default {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
};
//# sourceMappingURL=userServices.js.map