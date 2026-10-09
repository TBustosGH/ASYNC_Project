import type {
    UsersPostsData
} from "@/app/lib/users/definitions";
import Post from "../Post";

interface UserContentProps {
    data: UsersPostsData
};

export default function UserContent ({ data }: UserContentProps) {
    console.log(data);
    return (
        <div className="bg-gray-900 p-16 border-t border-gray-500">
            <h2 className="text-indigo-100 font-extrabold text-3xl">Posts</h2>

            {Number(data.count) <= 0
            ? <div>
                <h3>This user hasn't post anything yet!</h3>
            </div>
            : <div>
                {data.rows.map(p => 
                    <Post key={Number(p.id)} post={p} />
                )}
            </div>
            }
        </div>
    );
};