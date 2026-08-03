import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional
} from "sequelize";
import sequelize from "../../server.js";

class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    declare id: CreationOptional<Number>;
    declare postId: Number;
    declare userId: Number;
    declare content: String;
    declare createdAt: CreationOptional<String>;
    declare updatedAt: String | null;
    declare deletedAt: String | null;
};

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "posts", key: "id" }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }
    },
    content: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
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
    modelName: "comment"
});

export default Comment;