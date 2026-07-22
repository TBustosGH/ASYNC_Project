import User from "./models/users.js";
import Post from "./models/posts.js";
import Comment from "./models/comments.js";
User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(Post);
Post.hasMany(Comment);
Comment.belongsTo(Post);
export default {
    User,
    Post,
    Comment
};
//# sourceMappingURL=index.js.map