"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { refreshPage } from "@/app/lib/actions";
import { useMutation } from "@apollo/client/react";
import definitions from "@/app/lib/posts/definitions";
// Component
import {
    UserCircleIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { AutoResizeTextarea } from "../AutoResizeTextarea";


const PostForm = ({ userId }: { userId: string }) => {
    const [content, setContent] = useState<string>("");

    const [createPostMutation, { loading, error }] = useMutation(definitions.CREATE_POST, {
        refetchQueries: ["getAllPosts"],
    });


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!userId) redirect("/signIn");

        try {
            if (!content) throw new Error("No content given for the new post");

            const { data } = await createPostMutation({
                variables: { userId, content },
            });
            console.log("NEW POST: ", data?.createPost);
        }catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            return null;
        }

        setContent("");
        refreshPage("/home");
    };
    
    return (
        <div
            className="flex flex-row w-full min-h-[55] flex bg-gray-950 rounded ml-4 p-8 text-indigo-100"
        >   

            {/* DISPLAYS THE USER'S PROFILE PICTURE, 
                AND REDIRECTS TO ITS ACCOUNT PAGE WHEN CLICKED
            */}
            <div>
                {userId && <Link 
                    href={`/profile/${userId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex w-fit h-fit"
                >
                    <UserCircleIcon className="w-16"/>
                </Link>}

                {!userId && <div
                    className="flex w-fit h-fit"
                >
                    <UserCircleIcon className="w-16"/>
                </div>}
            </div>

            <form
                onSubmit={handleSubmit}
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
                        required
                    />
                </label>

                <button
                    disabled={loading}
                    type="submit"
                    className="hover:bg-gray-500 hover:rounded-lg hover:cursor-pointer w-fit p-1 text-white font-medium"
                >
                    {loading ? "Saving..." : "Post"}
                </button>

                {error && <p>Error: {error.message}</p>}
            </form>
        </div>
    )
};

export default PostForm;