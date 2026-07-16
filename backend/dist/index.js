import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import Server from "./database/server.js";
const server = new ApolloServer({
    typeDefs,
    resolvers
});
;
startStandaloneServer(server, {
    listen: { port: 4000 }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
    try {
        Server();
    }
    catch (error) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}).catch((error) => {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
});
//# sourceMappingURL=index.js.map