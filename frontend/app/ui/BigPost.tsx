import {
    getOnePost
} from "@/app/lib/posts/utils";
import type {
    PostData,
} from "@/app/lib/posts/definitions";
import type {
    typeComment
} from "@/app/lib/definitions";
import {
    ArrowLeftIcon
} from "@heroicons/react/24/outline"
import ErrorComponent from "@/app/ui/ErrorComponent";
import Post from "@/app/ui/Post";
import BackButton from "./BackButton";
import { notFound } from "next/navigation";
import Link from "next/link";


type CommentProps = {
    count: Number;
    rows: Array<typeComment>; 
};

const Comments = ({ count, rows }: CommentProps) => {
    return (
        <div className="bg-gray-900 rounded p-8 h-auto justify-center bg-scroll">
            <h3 className="text-indigo-100 text-4xl ">Comments</h3>
            {Number(count) > 0
                ? rows.map(c =>
                    <Post key={Number(c.id)} post={c} />
                )
                : <div className="bg-gray-900 rounded p-8 text-indigo-100 justify-center grid">
                    <h3 className="text-xl font-extrabold">No comments yet!</h3>
                    <p>Be the first to comment this post.</p>
                </div>
            }
        </div>
    );
};


type BigPostProps = {
    postId: number;
};

const BigPost = async (props: BigPostProps) => {
    const { postId } = props;

    try {
        if (!postId || isNaN(postId)) {
            throw new Error("invalid or inexistent id for post");
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
                <div className="flex">
                    <BackButton fallbackUrl="/home">
                        <ArrowLeftIcon className="w-10 hover:text-white"/>
                    </BackButton>
                    <h1 className="text-4xl">Post</h1>
                </div>

                {/* POST VIEW */}
                <Post post={post} />

                {/* COMMENTS VIEW */}
                <Comments count={commentsData.count} rows={commentsData.rows} />

            </main>
        )
    } catch (error) {
        let errorMessage: string | null = null;
        if (error instanceof Error) {
            errorMessage = error.message;

            if (errorMessage.includes("404")) {
                errorMessage = "Cannot find post."
            }
        }

        return (
            <ErrorComponent errorMessage={errorMessage} />
        )
    }
};

export default BigPost;

