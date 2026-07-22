export const typeDefs = `
    type User {
        id: ID!
        username: String!
        email: String!
        name: String
        description: String
        avatar_url: String
        banner_url: String
        created_at: String!
    }

    type Post {
        id: ID!
        user: User!
        content: String!
        comments: [Comment!]!
        created_at: String!
    }

    type Comment {
        id: ID!
        post: Post!
        user: User!
        content: String!
        created_at: String!
    }

    type Query {
        hi: String
        getAllUsers: [User!]!
        getUserByPk(id: ID!): User!
        getAllPosts: [Post!]!
        getPost(id: ID!): Post!
    }
`;