import type {
    PostsData
} from "@/app/lib/posts/definitions";
import {
    getPosts
} from "@/app/lib/posts/utils";

import ErrorComponent from "@/app/ui/ErrorComponent";
import Post from "@/app/ui/Post";



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
            <ErrorComponent errorMessage={errorMessage} />
        )
    }
};

export default Posts;
