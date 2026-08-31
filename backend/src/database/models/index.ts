import User from "./models/users.js";
import Post from "./models/posts.js";
import Comment from "./models/comments.js";
import SavedPost from "./models/savedPosts.js";
import Follower from "./models/followers.js";


// User model relationships
User.hasMany(Post);
User.hasMany(Comment);
User.hasMany(SavedPost);
// Post model relationships
Post.belongsTo(User);
Post.hasMany(Comment);
// Comment model relationships
Comment.belongsTo(Post);
Comment.belongsTo(User);
// SavedPost model relationships
SavedPost.belongsTo(User);
SavedPost.belongsTo(Post)
// Follower model relationships
Follower.belongsTo(User, { as: "follower", foreignKey: "followerId" });
Follower.belongsTo(User, { as: "following", foreignKey: "followingId" });

export default {
    User,
    Post,
    Comment,
    SavedPost,
    Follower
}