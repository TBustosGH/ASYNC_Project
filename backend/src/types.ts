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
    created_at: String;
};

// Post
export interface newPost {
    userId: Number;
    content: String;
};

export interface typePost extends newPost {
    id: Number;
    created_at: String;
};

// Comment


// GraphQL Mutation's args
export type createUserArgs = newUser;
export type createPostArgs = newPost;