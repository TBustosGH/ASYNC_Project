export {};
/*const typeDefs = `#graphql
    type User {
        id: ID!
        username: String!
        email: String!
        name: String
        password_hash: String!
        description: String
        avartar_url: String
        banner_url: String
        created_at: String!
        updated_at: String
        deleted_at: String
    }
    
    type Post {
        id: ID!
        author: User!
        title: String!
        content: String!
        created_at: String!
        updated_at: String
        deleted_at: String
    }

    type PostsLike {
        user: User!
        post: Post!
        created_at: String!
        deleted_at: String
    }
    
    type SavedPost {
        user: User!
        post: Post!
        saved_at: String!
        unsaved_at: String
    }

    type Comment {
        id: ID!
        parent: Post!
        user: User!
        content: String!
        created_at: String!
        updated_at: String
        deleted_at: String
    }

    type CommentsLike {
        user: User!
        comment: Comment!
        created_at: String!
        deleted_at: String
    }

    type Follows {
        following: User!
        followed: User!
        created_at: String!
        deleted_at: String
    }

    type Query {
        countUsers: Int!
        allUsers: [User]
        findUser(username: String!): User
        followers(username: String!): [User]
        following(username: String!): [user]
        postedContent(username: String!): [Post]
        savedContent(username: String!): [Post]
        countPosts: Int!
        allPosts: [Post]
        findPost(title: String!): [Post]
        gatherComments(post: String!): [Comment]
    }
`;*/
//# sourceMappingURL=app.js.map