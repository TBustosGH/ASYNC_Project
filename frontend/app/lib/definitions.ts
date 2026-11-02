// User
export interface typeUser {
    id: number;
    username: string;
    email?: string | null;
    passwordHash?: string;
    description?: string;
    name?: string;
    avatarUrl?: string;
    bannerUrl?: string;
    createdAt?: string;
};


// Post
export interface typePost {
    id: number;
    content: string;
    createdAt: string;
    user: typeUser;
};

// Comment
export interface typeComment {
    id: number;
    content: string;
    createdAt: string;
    user: typeUser;
};