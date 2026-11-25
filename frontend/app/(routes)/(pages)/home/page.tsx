"use server";
// Components
import Posts from "@/app/ui/home/Posts";
import PostForm from "@/app/ui/home/PostForm";

import { auth } from "@/auth";

export default async function Page() {
    const session = await auth();
    
    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <PostForm userId={session?.user?.id as string}/>
                <Posts />
            </div>
        </div>
    );
};