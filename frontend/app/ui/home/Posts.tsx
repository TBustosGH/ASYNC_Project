import type {
    typePost
} from "@/app/lib/definitions";
import type {
    PostsData
} from "@/app/lib/posts/definitions";
import {
    getPosts
} from "@/app/lib/posts/utils";
import Link from "next/link";
import Image from "next/image";
import { 
    UserCircleIcon
} from "@heroicons/react/24/outline";
import ErrorComponent from "@/app/ui/ErrorComponent";
import { parseDateTime } from "@/app/lib/utils";

type PostProps = {
    post: typePost;
};

export const Post = ({ post }: PostProps) => {
    const uploadedDateTime = parseDateTime(post.createdAt);

    return (
        <div className="block bg-gray-950 rounded m-8 p-10 text-indigo-100">
            <Link href={`/profile/${post.user.id}`} className="flex justify-left">
                {/* This Icon Is Used For Testing, Must Be Replaced When Images Are Supported */}
                <UserCircleIcon className="w-16"/>  
                <div className="flex">
                    <p className="text-xl font-extrabold hover:underline">{post.user.username}</p>
                    {post.user.email
                        ? <p className="text-gray-600">{`@${post.user.email}`}</p>
                        : null
                    }
                </div>
            </Link>
            <div>
                <div className="justify-left block mb-8 ml-2 mr-2 mt-5 md:ml-15">
                    <p className="text-xl">{post.content}</p>
                </div>
                <div className="jusity-end">
                    <p>{uploadedDateTime}</p>
                </div>
            </div>
        </div>
    );
};

const Posts = async () => {
    try {
        const posts: PostsData = await getPosts();

        if (!posts) {
            return (
                <main>
                    <h3>No posts found!</h3>
                </main>
            );
        }

        return (
            <main> 
                {posts.map(postObject => 
                    <Link href={`/post/${postObject.id}`} key={Number(postObject.id)}>
                        <Post key={Number(postObject.id)} post={postObject} />
                    </Link>
                )}
                
                <h3 className="font-extrabold ">*Seems like there's no more posts to be shown.</h3>
            </main>
        );
    } catch (error) {
        let errorMessage: String | null = null;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return (
            <ErrorComponent errorMessage={errorMessage} />
        )
    }
};

export default Posts;
