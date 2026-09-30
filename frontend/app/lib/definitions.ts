export interface typeUser {
    id: Number;
    username: String;
    email?: String | null;
    passwordHash?: String;
    description?: String;
    name?: String;
    avatarUrl?: String;
    bannerUrl?: String;
    createdAt?: String;
};


// Post
export interface typePost {
    id: Number;
    content: String;
    createdAt: String;
    user: typeUser;
};

export interface typeComment {
    id: Number;
    content: String;
    createdAt: String;
    user: typeUser;
};