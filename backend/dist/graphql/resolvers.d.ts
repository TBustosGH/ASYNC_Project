import type { typePost, createUserArgs, createPostArgs, createCommentArgs, updateUserArgs, updatePostArgs, updateCommentArgs, typeComment } from "../types.js";
export declare const resolvers: {
    DateTime: import("graphql").GraphQLScalarType<Date, Date>;
    Query: {
        getAllUsers: () => Promise<import("../database/models/models/users.js").default[]>;
        getUser: (_parent: unknown, { id }: {
            id: string;
        }) => Promise<import("../database/models/models/users.js").default | null>;
        getAllPosts: () => Promise<import("../database/models/models/posts.js").default[]>;
        getPost: (_parent: unknown, { id }: {
            id: string;
        }) => Promise<typePost | null>;
        getPostsByUser: (_parent: unknown, { id }: {
            id: number;
        }) => Promise<{
            count: number;
            rows: typePost[];
        } | null>;
        getComments: (_parent: unknown, { parentId }: {
            parentId: number;
        }) => Promise<{
            count: number;
            rows: typeComment[];
        } | null>;
    };
    Mutation: {
        createUser: (_parent: unknown, args: createUserArgs) => Promise<import("../database/models/models/users.js").default | null>;
        createPost: (_parent: unknown, args: createPostArgs) => Promise<import("../database/models/models/posts.js").default | null>;
        createComment: (_parent: unknown, args: createCommentArgs) => Promise<import("../database/models/models/comments.js").default | null>;
        deletePost: (_parent: unknown, { id }: {
            id: string;
        }) => Promise<"post deleted succesfully" | "post not found" | null>;
        deleteUser: (_parent: unknown, { id }: {
            id: string;
        }) => Promise<string | null>;
        deleteComment: (_parent: unknown, { id }: {
            id: number;
        }) => Promise<"comment deleted succesfully" | "comment not found" | null>;
        updateUser: (_parent: unknown, args: updateUserArgs) => Promise<import("../database/models/models/users.js").default | null>;
        updatePost: (_parent: unknown, args: updatePostArgs) => Promise<typePost | null>;
        updateComment: (_parent: unknown, args: updateCommentArgs) => Promise<typeComment | null>;
    };
};
//# sourceMappingURL=resolvers.d.ts.map