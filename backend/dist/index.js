import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { testDbConnection } from "./database/server.js";
import { APP_PORT } from "./utils/config.js";
if (!APP_PORT) {
    throw new Error('No application port defined');
}
const server = new ApolloServer({
    typeDefs,
    resolvers
});
;
startStandaloneServer(server, {
    listen: { port: APP_PORT }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
    try {
        testDbConnection();
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