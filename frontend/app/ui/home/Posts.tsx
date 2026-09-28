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

    return (
        <div>
            <div>
                <UserCircleIcon />
                <p>{post.user.username}</p>
            </div>
            <div>
                <div>
                    <p>{post.content}</p>
                </div>
                <div>
                    <p>{post.createdAt}</p>
                </div>
            </div>
        </div>
    );
};

const Posts = async () => {
    const posts: PostsData = await getPosts();
    console.log(posts);
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
                <Post key={postObject} post={postObject} />
            )}
        </main>
    );
};

export default Posts;
