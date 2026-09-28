export interface fetchedUser {
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
export interface fetchedPost {
    id: Number;
    content: String;
    createdAt: String;
    user: fetchedUser; 
};