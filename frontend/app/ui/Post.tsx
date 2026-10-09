"use client";

import type {
    typePost
} from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
    UserCircleIcon
} from "@heroicons/react/24/outline";
import { parseDateTime } from "@/app/lib/utils";

type PostProps = {
    post: typePost;
};

const Post = ({ post }: PostProps) => {
    const uploadedDateTime = parseDateTime(post.createdAt);
    const router = useRouter();

    return (
        <div 
            onClick={() => router.push(`/post/${post.id}`)}
            className="block bg-gray-950 rounded m-8 p-10 text-indigo-100 hover:bg-gray-800 hover:border-gray-50 border border-transparent"
        >
            {/* POST HEADER */}
            <Link 
                href={`/profile/${post.user.id}`} 
                onClick={(e) => e.stopPropagation()}
                className="flex w-fit h-fit"
            >
                {/* This Icon Is Used For Testing, Must Be Replaced When Images Are Supported */}
                <UserCircleIcon className="w-16"/>

                <div className="flex">
                    <div>
                        <p className="text-xl font-extrabold hover:underline">{post.user.username}</p>

                        {post.user.email 
                        ? (
                            <p className="text-gray-600">
                                @{post.user.email}
                            </p>
                        ) : null}
                    </div>
                </div>
            </Link>

            {/* POST CONTENT */}
                <div>
                    <div className="justify-left block mb-8 ml-2 mr-2 mt-1 md:ml-15">
                        <p className="text-xl">{post.content}</p>
                    </div>

                    <div className="jusity-end">
                        <p>{uploadedDateTime}</p>
                    </div>
                </div>
        </div>
    );
};

export default Post;