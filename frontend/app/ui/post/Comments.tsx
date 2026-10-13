import type {
    typeComment
} from "@/app/lib/definitions";
import Link from "next/link";
import {
    UserCircleIcon
} from "@heroicons/react/24/outline";
import { parseDateTime } from "@/app/lib/utils";

type CommentProps = {
    count: Number;
    rows: Array<typeComment>; 
};

const Comment = ({ comment }: { comment: typeComment }) => {
    const uploadedDateTime = parseDateTime(comment.createdAt);

    return (
        <div className="text-indigo-100 rounded bg-gray-950 block m-1 p-10">
            {/* COMMENT HEADER */}
            <Link
                href={`/profile/${comment.user.id}`}
                className="flex w-fit h-fit"
            >
                <UserCircleIcon className="w-16" />
                <div>
                    <p className="text-xl font-extrabold hover:underline">{ comment.user.username }</p>

                    {comment.user.email
                    ? (
                        <p className="text-gray-600">
                            @{comment.user.email}
                        </p>
                    ): null
                    }
                </div>
            </Link>

            {/* COMMENT CONTENT */}
            <div>
                <div className="justify-left block mb-8 ml-2 mr-2 mt-1 md:ml-15">
                    <p className="text-xl">{comment.content}</p>
                </div>

                <div className="justify-end">
                    <p>{ uploadedDateTime }</p>
                </div>
            </div>
        </div>
    );
};

export default function Comments({ count, rows }: CommentProps) {
    return (
        <div className="bg-gray-900 pt-0 p-8  h-auto justify-center border-t border-gray-700">
            <h3 className="text-indigo-100 text-4xl ">Comments</h3>
            {Number(count) > 0
                ? <div>
                    {rows.map(c => 
                        <Comment key={Number(c.id)} comment={c} />
                    )}
                </div>
                : <div className="bg-gray-900 rounded p-8 text-indigo-100 justify-center grid">
                    <h3 className="text-xl font-extrabold">No comments yet!</h3>
                    <p>Be the first to comment this post.</p>
                </div>
            }
        </div>
    );
};