import { Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
declare class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    id: CreationOptional<Number>;
    postId: Number;
    userId: Number;
    content: String;
    createdAt: CreationOptional<String>;
    updatedAt: String | null;
    deletedAt: String | null;
}
export default Comment;
//# sourceMappingURL=comments.d.ts.map