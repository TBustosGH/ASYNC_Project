import { query } from "@/app/lib/graphql/ApolloClient";
import definitions, { type UserData} from "./definitions";

export const getUserData = async (userId: Number) => {
    try {
        if (!userId) {
            throw new Error("Cannot fetch a user if not userId is given.");
        }

        const { data, error } = await query({
            query: definitions.GET_USER,
            variables: {
                userId: userId
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        const { getUser, getPostsByUser }: UserData = data;

        return { getUser, getPostsByUser };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}