import type {
    fetchedPost
} from "@/app/lib/definitions";
import type {
    PostsData
} from "@/app/lib/posts/definitions";
import {
    getPosts
} from "@/app/lib/posts/utils";
import Image from "next/image";
import { 
    UserCircleIcon
} from "@heroicons/react/24/outline";

type PostProps = {
    post: fetchedPost;
};

const Post = (props: PostProps) => {
    const { post } = props; 

    const uploadedAt = post.createdAt.replaceAll('-', '/').split('T');
    const dateUploadedAt = uploadedAt[0];
    const timeUploadedAt = uploadedAt[1].split('.');

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
                    <p>{`${timeUploadedAt[0]} ${dateUploadedAt}`}</p>
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
                    <Post key={Number(postObject.id)} post={postObject} />
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
            <main className="block bg-gray-950 text-indigo-100 rounded m-8 p-10">
                <h2 className="text-xl font-extrabold">Cannot fetch posts from the server!</h2>
                {errorMessage
                    ? <p className="mb-8 ml-2 mr-2 mt-5 md:ml-15 text-xl">
                        <strong>Error Message: </strong>
                        {errorMessage}
                    </p>
                    : <p></p>
                }
            </main>
        )
    }

    
};

export default Posts;
