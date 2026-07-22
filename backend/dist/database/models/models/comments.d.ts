import { Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
declare class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    id: CreationOptional<number>;
    parentId: number;
    userId: number;
    content: string;
    createdAt: CreationOptional<string>;
    deletedAt: string | null;
}
export default Comment;
//# sourceMappingURL=comments.d.ts.map