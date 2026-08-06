import User from "./models/users.js";
import Post from "./models/posts.js";
import Comment from "./models/comments.js";

// User model relationships
User.hasMany(Post);
User.hasMany(Comment);
// Post model relationships
Post.hasMany(Comment);
Post.belongsTo(User);
// Comment model relationships
Comment.belongsTo(Post);
Comment.belongsTo(User);


export default {
    User,
    Post,
    Comment
}