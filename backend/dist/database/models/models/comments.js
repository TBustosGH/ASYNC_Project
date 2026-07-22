import { Model, DataTypes } from "sequelize";
import sequelize from "../../server.js";
class Comment extends Model {
}
;
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parentId: {
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
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "comment"
});
export default Comment;
//# sourceMappingURL=comments.js.map