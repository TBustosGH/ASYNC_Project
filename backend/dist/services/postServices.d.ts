import type { newPost, typePost } from "../types.js";
declare const getAllPosts: (limit?: number, offset?: number) => Promise<import("../database/models/models/posts.js").default[]>;
declare const getPost: (id: number) => Promise<typePost | null>;
declare const getPostsByUser: (id: number) => Promise<{
    count: number;
    rows: typePost[];
}>;
declare const createPost: (object: newPost) => Promise<import("../database/models/models/posts.js").default>;
declare const deletePost: (id: number) => Promise<"post deleted succesfully" | "post not found">;
declare const deletePostsByUser: (id: number) => Promise<number>;
declare const updatePost: (object: typePost) => Promise<typePost | null>;
declare const _default: {
    getAllPosts: typeof getAllPosts;
    getPost: typeof getPost;
    getPostsByUser: typeof getPostsByUser;
    createPost: typeof createPost;
    deletePost: typeof deletePost;
    deletePostsByUser: typeof deletePostsByUser;
    updatePost: typeof updatePost;
};
export default _default;
//# sourceMappingURL=postServices.d.ts.map