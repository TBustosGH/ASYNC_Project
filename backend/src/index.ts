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


interface props {
    url: string;
};

startStandaloneServer(server, {
    listen: { port: APP_PORT }
}).then(({ url }: props) => {
    console.log(`Server ready at ${url}`);
    try {
        connectToDB();
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