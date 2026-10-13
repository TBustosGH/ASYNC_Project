"use client";

import type {
    typePost
} from "@/app/lib/definitions";
import Link from "next/link";
import { parseDateTime } from "@/app/lib/utils";
import {
    UserCircleIcon
} from "@heroicons/react/24/outline";

type SinglePostProps = {
    post: typePost;
};

export default function SinglePost({ post }: SinglePostProps) {
    const uploadedDateTime = parseDateTime(post.createdAt);
    
    return (
        <div className="bg-gray-900 flex flex-col w-full">
            {/* POST HEADER */}
            <div>
                <Link
                    href={`/profile/${post.user.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex w-fit h-fit text-indigo-100 p-3"
                >
                    {/* This Icon Is Used For Testing, Must Be Replaced When Images Are Supported */}
                    <UserCircleIcon className="w-24"/>
                    {/* USER DATA */}
                    <div className="pt-6 pb-6">
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
            </div>
            {/* POST CONTENT */}
            <div className="text-indigo-100">
                <div className="justify-left block mb-8 ml-2 mr-2 mt-1 md:ml-15 h-fit p-5">
                    <p className="text-xl">{ post.content }</p>
                </div>
                <div className="flex text-gray-600 text-m mt-8 p-5 h-fit w-fit">
                    <p className="hover:underline cursor-pointer">{`${uploadedDateTime}`}</p>
                </div>
            </div>
            {/* BOTTOM BAR */}
            <div className="border-t border-gray-700 p-8">
                
            </div>
        </div>
    );
};