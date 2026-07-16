export const resolvers = {
    Query: {
        hi: (): String => {
            console.log("Server running fine!");
            return "Hello World!";
        }
    }
}