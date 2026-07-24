import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional
} from "sequelize";
import sequelize from "../../server.js";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: String;
    declare email: String;
    declare name: String | null;
    declare passwordHash: String;
    declare description: String | null;
    declare avatarUrl: String | null;
    declare bannerUrl: String | null;
    declare createdAt: CreationOptional<String>;
    declare deletedAt: String | null;
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(100)
    },
    passwordHash: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(250)
    },
    avatarUrl: {
        type: DataTypes.TEXT
    },
    bannerUrl: {
        type: DataTypes.TEXT
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user"
});

export default User;
