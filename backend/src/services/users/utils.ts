// Sequelize
import { Sequelize } from "sequelize";
import models from "../../database/models/index.js";
// TS types
import type { 
    newUser, 
    typeUser,
    typeFollower 
} from "../../types.js";
// Services
import postServices from "./../posts/postServices.js";
import commentServices from "./../comments/commentServices.js";

export const getUsers = async (limit: number = 10, offset: number = 0) => {
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


export const getUser = async (id: number) => {
    const foundUser = await models.User.findOne({
        where: {
            id: id,
            deletedAt: null
        }
    });
    return foundUser;
};

export const createUser = async (object: newUser) => {
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

export const deleteUser = async (id: number) => {
    const [affectedCount] = await models.User.update(
        { deletedAt: Sequelize.fn("NOW") },
        {
            where: { 
                id: id, 
                deletedAt: null 
            }
        }
    );

    const deletedUserPosts = await postServices.deletePostsByUser(id);
    const deletedUserComments = await commentServices.deleteCommentsByUser(id);

    return affectedCount > 0 ? `user deleted succesfully and his posts (${deletedUserPosts}) & comments (${deletedUserComments}) were deleted` : "user not found";
};

export const updateUser = async (object: typeUser) => {
    const userToUpdate = {...object};

    await models.User.update(
        {
            username: userToUpdate.username,
            email: userToUpdate.email,
            name: userToUpdate.name,
            passwordHash: userToUpdate.passwordHash,
            description: userToUpdate.description,
            avatarUrl: userToUpdate.avatarUrl,
            bannerUrl: userToUpdate.bannerUrl,
            updatedAt: Sequelize.fn("NOW")
        },
        {
            where: { 
                id: Number(userToUpdate.id), 
                deletedAt: null 
            }
        }
    );

    const updatedUser = await getUser(Number(userToUpdate.id));

    return updatedUser;
};

export const getAllFollowers = async (followingId: number, limit: number = 12, offset: number = 0) => {
    if (!followingId || isNaN(followingId)) {
        throw new Error("invalid or unexistent user id");
    }

    const user = await getUser(followingId);
    if (!user) {
        throw new Error("id is not associated with any existent user");
    }

    const { count, rows }: { count: number, rows: Array<typeFollower> } = await models.Follower.findAndCountAll({
        where: {
            followingId: followingId,
            deletedAt: null
        },
        attributes: ["createdAt"],
        include: [
            { model: models.User, as: "follower" },
            { model: models.User, as: "following" }
        ],
        limit: limit,
        offset: offset
    });

    return { count, rows };
};

export const getAllFollowings = async (followerId: number, limit: number = 12, offset: number = 0) => {
    console.log(followerId);
    if (!followerId || isNaN(followerId)) {
        throw new Error("invalid or unexistent user id");
    }

    const user = await getUser(followerId);
    if (!user) {
        throw new Error("id is not associated with any existent user");
    }

    const { count, rows }: { count: number, rows: Array<typeFollower>} = await models.Follower.findAndCountAll({
        where: {
            followerId: followerId,
            deletedAt: null
        },
        attributes: ["createdAt"],
        include: [
            { model: models.User, as: "follower" },
            { model: models.User, as: "following" }
        ],
        limit: limit,
        offset: offset
    });

    console.log("COUNT: ", count);
    console.log("ROWS: ", JSON.parse(JSON.stringify(rows)))

    return { count, rows };
};

export const addFollow = async (followingId: number, followerId: number) => {
    // Check if theres followerId or following, and if theyre valid numbers
    if (!followerId || !followingId || isNaN(followerId) || isNaN(followingId)) {
        throw new Error("invalid or insuficient user ID's");
    } else if (followerId === followingId) {    // Check that ID are not duplicated
        throw new Error("duplicate keys are not allowed. A user cannot follow itself");
    }

    // Check if followerId is valid
    const follower = await getUser(followerId);
    if (!follower) {
        throw new Error("no follower id associated to a known user");
    }
    // Check if followingId is valid
    const following = await getUser(followingId);
    if (!following) {
        throw new Error("no following id associated to a known user");
    }
    // Add the new follow
    await models.Follower.create({
        followerId: followerId,
        followingId: followingId
    });

    return "follow created successfully!";
};

export const deleteFollow = async (followingId: number, followerId: number) => {
    // Check if theres followerId or following, and if theyre valid numbers
    if (!followerId || !followingId || isNaN(followerId) || isNaN(followingId)) {
        throw new Error("invalid or insuficient user ID's");
    }

    //delete follow
    const [affectedCount] = await models.Follower.update(
        { deletedAt: Sequelize.fn("NOW") },
        {
            where: {
                followerId: followerId,
                followingId: followingId,
                deletedAt: null
            }
        }
    );

    return affectedCount > 0 ? "unfollow" : "can't find follow"
};
