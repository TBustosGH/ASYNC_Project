// GraphQL 
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
// Utils
import { APP_PORT } from "./utils/config.js";
import { connectToDB } from "./utils/db.js";

if (!APP_PORT) {
    throw new Error('No application port defined');
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});


const startServer = async () => {
    try {
        // Start GraphQL ApolloServer
        const { url } = await startStandaloneServer(server, {
            listen: { port: APP_PORT }
        });
        // Connect to postgreSQL server
        await connectToDB();
        // Message to the console
        console.log("\n====================================================================================\n");
        console.log(`Server ready at ${url}`);
        console.log("\n====================================================================================\n");
    } catch (error) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
};

startServer();

// Legacy code to start the GraphQL ApolloServer
/*
interface props {
    url: string;
};

startStandaloneServer(server, {
    listen: { port: APP_PORT }
}).then(({ url }: props) => {
    try {
        connectToDB();
        console.log(`Server ready at ${url}`);
    } catch (error) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}).catch((error: Error) => {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
});
*/