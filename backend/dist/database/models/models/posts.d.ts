import { Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
declare class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
    id: CreationOptional<Number>;
    userId: Number;
    content: String;
    createdAt: CreationOptional<String>;
    updatedAt: String | null;
    deletedAt: String | null;
}
export default Post;
//# sourceMappingURL=posts.d.ts.map