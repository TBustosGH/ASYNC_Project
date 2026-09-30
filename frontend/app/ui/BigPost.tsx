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
    UserCircleIcon
} from "@heroicons/react/24/outline"
import ErrorComponent from "@/app/ui/ErrorComponent";
import { notFound } from "next/navigation";


type PostProps = {
    post: typePost
};

const Post = ({ post }: PostProps) => {
    const postUploadedAt = post.createdAt.split('T');
    const postDateUploadedAt = postUploadedAt[0].replaceAll('-', '/');
    const postTimeUploadedAt = postUploadedAt[1].split('.')[0];

    return (
        <div className="block bg-gray-950 rounded m-8 p-10 text-indigo-100">
            <div className="flex justify-left">
                {/* This Icon Is Used For Testing, Must Be Replaced When Images Are Supported */}
                <UserCircleIcon className="w-16"/>  
                <div className="flex">
                    <p className="text-xl font-extrabold">{post.user.username}</p>
                    {post.user.email
                        ? <p className="text-gray-600">{`@${post.user.email}`}</p>
                        : null
                    }
                </div>
            </div>
            <div>
                <div className="justify-left block mb-8 ml-2 mr-2 mt-5 md:ml-15">
                    <p className="text-xl">{post.content}</p>
                </div>
                <div className="jusity-end">
                    <p>{`${postTimeUploadedAt} ${postDateUploadedAt}`}</p>
                </div>
            </div>
        </div>
    );
};

type CommentProps = {
    comment: typeComment 
};

const Comment = () => {
    return (
        <div>
            {/* TODO */}
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

        console.log("DATA: ", data);
        if (!data?.getPost) {
            notFound();
        }

        // Post data
        const post = data.getPost;
        // Comments data
        const comments = data.getComments;

        return (
            <main>
                {/* POST VIEW */}
                <Post post={post} />
                {/* COMMENTS VIEW */}
                {Number(comments.count) > 0
                    ? comments.rows.map(comment =>
                        <Comment />
                    )
                    : <div className="bg-gray-900 rounded p-8 text-indigo-100 justify-center grid">
                        <h3 className="text-xl font-extrabold">No comments yet!</h3>
                        <p>Be the first to comment this post.</p>
                    </div>
                }
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

