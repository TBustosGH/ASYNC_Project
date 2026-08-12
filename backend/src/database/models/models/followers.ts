import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional
} from "sequelize";
import sequelize from "../../server.js";

class Follower extends Model<InferAttributes<Follower>, InferCreationAttributes<Follower>> {
    declare followerId: Number;
    declare followingId: Number;
    declare createdAt: CreationOptional<String>;
    declare updatedAt: String | null;
    declare deletedAt: String | null;
};  

Follower.init({
    followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }
    },
    followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key:  "id" }
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
    modelName: "followers"
});

export default Follower;