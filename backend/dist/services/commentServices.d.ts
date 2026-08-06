import type { newComment, typeComment } from "../types.js";
declare const getComment: (id: number) => Promise<typeComment | null>;
declare const getCommentsByPost: (postId: number) => Promise<{
    count: number;
    rows: typeComment[];
}>;
declare const createComment: (object: newComment) => Promise<import("../database/models/models/comments.js").default>;
declare const updateComment: (object: typeComment) => Promise<typeComment | null>;
declare const deleteComment: (id: number) => Promise<"comment deleted succesfully" | "comment not found">;
declare const deleteCommentsByUser: (userId: number) => Promise<number>;
declare const deleteCommentsByPost: (postId: number) => Promise<number>;
declare const _default: {
    getComment: typeof getComment;
    getCommentsByPost: typeof getCommentsByPost;
    createComment: typeof createComment;
    updateComment: typeof updateComment;
    deleteComment: typeof deleteComment;
    deleteCommentsByUser: typeof deleteCommentsByUser;
    deleteCommentsByPost: typeof deleteCommentsByPost;
};
export default _default;
//# sourceMappingURL=commentServices.d.ts.map