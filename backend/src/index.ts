import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";

import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

import Server from "./database/server.js";

const server = new ApolloServer({
    typeDefs,
    resolvers
});

interface props {
    url: string;
};

startStandaloneServer(server, {
    listen: { port: 4000 }
}).then(({ url }: props) => {
    console.log(`Server ready at ${url}`);
    try {
        Server();
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