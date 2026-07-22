import { DataTypes, QueryInterface } from "sequelize";
/*
    IN THIS MIGRATION:
    tables users, posts, comments, follows, comment_likes, post_likes & saved_posts are added
*/
module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('users', {
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
            password_hash: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(250)
            },
            avatar_url: {
                type: DataTypes.TEXT
            },
            banner_url: {
                type: DataTypes.TEXT
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null
            }
        });
        await queryInterface.createTable('posts', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' }
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null
            }
        });
        await queryInterface.createTable('comments', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            parent_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'posts', key: 'id' }
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' }
            },
            content: {
                type: DataTypes.STRING(250),
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null
            }
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('comments');
        await queryInterface.dropTable('posts');
        await queryInterface.dropTable('users');
    }
};
//# sourceMappingURL=20260717__create_essentials_tables.js.map