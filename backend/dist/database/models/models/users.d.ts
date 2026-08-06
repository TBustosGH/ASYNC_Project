import { Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
declare class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: CreationOptional<number>;
    username: String;
    email: String;
    name: String | null;
    passwordHash: String;
    description: String | null;
    avatarUrl: String | null;
    bannerUrl: String | null;
    createdAt: CreationOptional<String>;
    updatedAt: String | null;
    deletedAt: String | null;
}
export default User;
//# sourceMappingURL=users.d.ts.map