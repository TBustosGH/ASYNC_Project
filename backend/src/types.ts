// User
export interface newUser {
    username: string;
    email: string;
    name: string | null;
    passwordHash: string;
    description: string | null;
    avatarUrl: string | null;
    bannerUrl: string | null;
};

export interface typeUser extends newUser {
    id: number;
    createdAt: string;
};

export interface typeFollower {
    followingId: number;
    followerId: number;
    createdAt: string;
    updatedAt: string | null;
};

// Post
export interface newPost {
    userId: number;
    content: string;
};

export interface typePost extends newPost {
    id: number;
    createdAt: string;
};

export interface typeSavedPost {
    postId: number;
    userId: number;
    createdAt: string;
};

// Comment
export interface newComment {
    postId: number;
    userId: number;
    content: string;
};

export interface typeComment extends newComment {
    id: number;
    createdAt: string;
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

// GraphQL context
export interface GraphQLContext {
    user?: {
        id: string;
        token: string;
    };
};