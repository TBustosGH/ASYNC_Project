import { Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
declare class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
    id: CreationOptional<number>;
    userId: string;
    content: string;
    createdAt: CreationOptional<string>;
    deletedAt: string | null;
}
export default Post;
//# sourceMappingURL=posts.d.ts.map