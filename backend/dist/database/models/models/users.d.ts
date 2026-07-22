import { Model, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";
declare class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: CreationOptional<number>;
    username: string;
    email: string;
    name: string | null;
    passwordHash: string;
    description: string | null;
    avatarUrl: string | null;
    bannerUrl: string | null;
    createdAt: CreationOptional<string>;
    deletedAt: string | null;
}
export default User;
//# sourceMappingURL=users.d.ts.map