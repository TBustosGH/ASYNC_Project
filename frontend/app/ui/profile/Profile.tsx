import {
    getUserData
} from "@/app/lib/users/utils";
import type {
    UserData
} from "@/app/lib/users/definitions";
import {
    ArrowLeftIcon
} from "@heroicons/react/24/outline";
import ErrorComponent from "../ErrorComponent";
import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "../BackButton";


type ProfileProps = {
    id: number;
}

export default async function Profile({ id }: ProfileProps) {
    try {
        if (!id || isNaN(id)) {
            throw new Error("invalid or inexistent user's id.");
        }

        const data: UserData | undefined = await getUserData(Number(id));
        
        if (!data?.getUser) {
            notFound();
        }

        const user = data.getUser;
        const posts = data.getPostsByUser;

        return (
            <main>
                {/* UPSIDE NAV */}
                <div className="flex">
                    <BackButton fallbackUrl="/home">
                        <ArrowLeftIcon className="w-10 hover:text-white" />
                    </BackButton>
                    <h1 className="text-4xl font-extrabold">{ user.username }</h1>
                </div>

                {/* PROFILE HEADER */}

                {/* PROFILE CONTENT */}
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