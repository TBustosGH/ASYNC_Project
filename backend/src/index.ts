// GraphQL 
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
// Utils
import { APP_PORT } from "./utils/config.js";
import { connectToDB } from "./utils/db.js";
import type { GraphQLContext } from "./types.js";

if (!APP_PORT) {
    throw new Error('No application port defined');
}

const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers
});


const startServer = async () => {
    try {
        // Start GraphQL ApolloServer
        const { url } = await startStandaloneServer(server, {
            listen: { port: APP_PORT },
            context: async ({ req }) => {
                const authHeader = req.headers.authorization || "";
                const token = authHeader.replace("Bearer ", "");
                console.log("\n\nAUTHHEADER: ", authHeader);
                if (!token) {
                    return {};
                }
                /*
                try {
                    const decodedUser = jwt.verify(token, process.env.SECRET!) as any;
                    console.log("\n\nDECODEDUSER: ", decodedUser, "\n\n");

                    return { user: decodedUser };
                } catch (error) {
                    console.log("\nError while trying to decode token: ", error);
                    return {};
                }
                */
                return {};
            }
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