import {
    getOnePost
} from "@/app/lib/posts/utils";
import type {
    PostData,
} from "@/app/lib/posts/definitions";
import type {
    typePost,
    typeComment
} from "@/app/lib/definitions";
import {
    ArrowLeftIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline"
import ErrorComponent from "@/app/ui/ErrorComponent";
import { Post } from "./home/Posts";
import { notFound } from "next/navigation";
import Link from "next/link";


type CommentProps = {
    comment: typeComment 
};

const Comment = ({ comment }: CommentProps) => {
    return (
        <div>
            <Post post={comment} />
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
        const comments = data.getComments;

        return (
            <main>
                {/* UPSIDE NAV */}
                <div className="flex">
                    <Link href="/home" >
                        <ArrowLeftIcon className="w-10 hover:text-white"/>
                    </Link>
                    <h1 className="text-4xl">Post</h1>
                </div>

                {/* POST VIEW */}
                <Post post={post} />

                {/* COMMENTS VIEW */}
                <div className="bg-gray-900 rounded p-8 h-auto justify-center bg-scroll">
                    <h3 className="text-indigo-100 text-4xl ">Comments</h3>
                    {Number(comments.count) > 0
                        ? comments.rows.map(c =>
                                <Comment key={Number(c.id)} comment={c}/>
                        )
                        : <div className="bg-gray-900 rounded p-8 text-indigo-100 justify-center grid">
                            <h3 className="text-xl font-extrabold">No comments yet!</h3>
                            <p>Be the first to comment this post.</p>
                        </div>
                    }
                </div>
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

