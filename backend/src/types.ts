// User
export interface newUser {
    username: String;
    email: String;
    name: String | null;
    passwordHash: String;
    description: String | null;
    avatarUrl: String | null;
    bannerUrl: String | null;
};

export interface typeUser extends newUser {
    id: Number;
    createdAt: String;
};

export interface typeFollower {
    followingId: Number;
    followerId: Number;
    createdAt: String;
    updatedAt: String | null;
};

// Post
export interface newPost {
    userId: Number;
    content: String;
};

export interface typePost extends newPost {
    id: Number;
    createdAt: String;
};

export interface typeSavedPost {
    postId: Number;
    userId: Number;
    createdAt: String;
};

// Comment
export interface newComment {
    postId: Number;
    userId: Number;
    content: String;
};

export interface typeComment extends newComment {
    id: Number;
    createdAt: String;
};

// GraphQL Mutation's args
export type createUserArgs = newUser;
export type createPostArgs = newPost;
export type createCommentArgs = newComment;
export type updateUserArgs = typeUser;
export type updatePostArgs = typePost;
export type updateCommentArgs = typeComment;
export interface addFollowArgs {
    followerId: number;
    followingId: number;
};
export type deleteFollowArgs = addFollowArgs;
export interface savePostArgs {
    userId: number;
    postId: number;
};
export type unsavePostArgs = savePostArgs;