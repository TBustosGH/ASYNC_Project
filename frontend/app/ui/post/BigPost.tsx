import {
    getOnePost
} from "@/app/lib/posts/utils";
import type {
    PostData,
} from "@/app/lib/posts/definitions";
import ErrorComponent from "../ErrorComponent";
import { notFound } from "next/navigation";

import UpsideNav from "@/app/ui/post/UpsideNav";
import SinglePost from "./SinglePost";
import Comments from "./Comments";

type BigPostProps = {
    postId: number
};

export default async function BigPost({ postId }: BigPostProps) {
    try {
        if (!postId || isNaN(postId)) {
            throw new Error("invalid or inexistent post's id.");
        }

        const data: PostData | undefined = await getOnePost(Number(postId));

        if (!data?.getPost) {
            notFound();
        }

        // Post data
        const post = data.getPost;
        // Comments data
        const commentsData = data.getComments;

        return (
            <main>
                {/* UPSIDE NAV */}
                <UpsideNav />

                {/* POST VIEW */}
                <SinglePost post={post} />

                {/* COMMENTS VIEW */}
                <Comments count={commentsData.count} rows={commentsData.rows} />
            </main>
        )
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