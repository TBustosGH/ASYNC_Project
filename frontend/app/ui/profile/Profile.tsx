import {
    getUserData
} from "@/app/lib/users/utils";
import type {
    UserFullData
} from "@/app/lib/users/definitions";
import ErrorComponent from "../ErrorComponent";
import { notFound } from "next/navigation";


import UpsideNav from "./UpsideNav";
import UserHeader from "./UserHeader";
import UserContent from "./UserContent";

type ProfileProps = {
    id: number;
}

export default async function Profile({ id }: ProfileProps) {
    try {
        if (!id || isNaN(id)) {
            throw new Error("invalid or inexistent user's id.");
        }

        const data: UserFullData | undefined = await getUserData(Number(id));
        
        if (!data?.getUser) {
            notFound();
        }

        const user = data.getUser;
        const posts = data.getPostsByUser;

        return (
            <main className="p-0 m-0">
                {/* UPSIDE NAV */}
                <UpsideNav username={user.username}/>
                {/* PROFILE HEADER */}
                <UserHeader data={user} />
                {/* PROFILE CONTENT */}
                <UserContent data={posts} />
            </main>
        );
    } catch (error) {
        let errorMessage: String | null = null;
        if (error instanceof Error) {
            // Throw a 404 error
            if (error.message.includes('404')) {
                notFound();
            }
            // Manage regular errors
            errorMessage = error.message;
        }
        // Display an error message to the user
        return (
            <ErrorComponent errorMessage={errorMessage} />
        );
    }
};