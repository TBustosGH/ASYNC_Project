import Link from "next/link";
import {
    UserCircleIcon
} from "@heroicons/react/24/outline";

export default function UserIcon ({ userId }: { userId: string | undefined}) {
    return (
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
    );
};