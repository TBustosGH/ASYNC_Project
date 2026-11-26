"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { refreshPage } from "@/app/lib/actions";
import { useMutation } from "@apollo/client/react";
import definitions from "@/app/lib/comments/definitions";
// Components
import UserIcon from "../UserIcon";
import { AutoResizeTextarea } from "../AutoResizeTextarea";



interface commentFormProps {
    userId: string | undefined;
    postId: number;
};

export default function CommentForm ({ userId, postId }: commentFormProps) {
    const [content, setContent] = useState<string>("");

    const [createCommentMutation, { loading, error }] = useMutation(definitions.CREATE_COMMENT);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!userId) redirect("/signIn");

        try {
            if (!content) throw new Error("No content given for the new comment");

            await createCommentMutation({
                variables: { postId, userId, content },
            });

        } catch (error) {
            if (error instanceof Error) {
                throw new Error (error.message);
            }
            return null;
        }

        setContent("");
        refreshPage(`/post${postId}`);
    };

    return (
        <div className="bg-gray-900 flex flex-row w-full min-h-[55] border-t border-gray-700 p-8 text-indigo-100">
            {/*
                DISPLAYS THE USER'S PROFILE PICTURE,
                AND REDIRECTS TO ITS ACCOUNT PAGE WHEN CLICKED
            */}
            <UserIcon userId={userId}/>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full"
            >
                <label
                    htmlFor="comment-content"
                >
                    <AutoResizeTextarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Leave a comment..."
                        maxHeight={100}
                        className="p-3 m-3 ml-auto mr-auto bg-transparent rounded w-full h-fit font-normal"
                        name="comment-content"
                        required
                    />
                </label>

                <button
                    disabled={loading}
                    type="submit"
                    className="hover:bg-gray-500 hover:rounded-lg hover:cursor-pointer w-fit h-fit mt-1 mb-1 mr-2 ml-auto p-1 text-white font-medium"
                >
                    {loading
                        ? "Saving..."
                        : "Post"
                    }
                </button>

                {error && <p>Error: {error.message}</p>}
            </form>
        </div>
    );
};