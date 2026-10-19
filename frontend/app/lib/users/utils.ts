import { query } from "@/app/lib/graphql/ApolloClient";
import definitions, { 
    type UserData,
    type UserForAuthenticationData
} from "./definitions";

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
};

export const getUserForValidation = async (propUsername: string, propEmail: string, propPasswordHash: string) => {
    try {
        if (!propUsername || !propEmail) {
            throw new Error("insuficient credentials given for fetching a user");
        }

        const { data, error } = await query({
            query: definitions.GET_USER_FOR_AUTHENTICATION,
            variables: {
                userUsername: propUsername,
                userEmail: propEmail,
                userPasswordHash: propPasswordHash
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        const { id, username, email, passwordHash }: UserForAuthenticationData = data;

        return { username, email, passwordHash };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}