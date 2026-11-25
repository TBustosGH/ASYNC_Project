"use client";
import { useState } from "react";

import {
    UserCircleIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { AutoResizeTextarea } from "../AutoResizeTextarea";


const PostForm = ({ userId }: { userId: string }) => {
    const [content, setContent] = useState<string>("");
    
    return (
        <div
            className="flex flex-row w-full min-h-[55] flex bg-gray-950 rounded ml-8 p-8 text-indigo-100"
        >   

            {/* DISPLAYS THE USER'S PROFILE PICTURE, 
                AND REDIRECTS TO ITS ACCOUNT PAGE WHEN CLICKED
            */}

            <Link 
                href={`/profile/${userId}`}
                onClick={(e) => e.stopPropagation()}
                className="flex w-fit h-fit"
            >
                <UserCircleIcon className="w-16"/>
            </Link>

            <form
                className="flex flex-col w-full justify-end"
            >
                <label
                    htmlFor="post-content"
                >
                    <AutoResizeTextarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's going on?"
                        maxHeight={200}
                        className="p-3 m-3 ml-auto mr-auto bg-transparent focus:outline-none rounded w-full h-fit font-normal"
                    />
                </label>

                <input 
                    type="submit"
                />
            </form>
        </div>
    )
};

export default PostForm;