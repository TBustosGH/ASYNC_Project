import { Model, DataTypes } from "sequelize";
import sequelize from "../../server.js";
class User extends Model {
}
;
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
    modelName: "user"
});
export default User;
//# sourceMappingURL=users.js.map