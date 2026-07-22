export const resolvers = {
    Query: {
        hi: (): String => {
            console.log("Server running fine!");
            return "Hello World!";
        },
        getAllUser: async () => {

        },
        getUserByPk: async () => {

        },
        getAllPosts: async () => {

        },
        getPost: async() => {

        }
    }
};