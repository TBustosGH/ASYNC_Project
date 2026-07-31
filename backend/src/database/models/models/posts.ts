import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional
} from "sequelize";
import sequelize from "../../server.js";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
    declare id: CreationOptional<Number>;
    declare userId: Number;
    declare content: String;
    declare createdAt: CreationOptional<String>;
    declare updatedAt: String | null;
    declare deletedAt: String | null;
};

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    content: {
        type: DataTypes.STRING,
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
    timestamps: true,
    modelName: "post"
});

export default Post;