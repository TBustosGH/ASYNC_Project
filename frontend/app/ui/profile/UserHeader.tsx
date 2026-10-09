import type {
    UserData
} from "@/app/lib/users/definitions";
import {
    UserCircleIcon,
    CalendarDaysIcon
} from "@heroicons/react/24/outline";
import {
    parseDate
} from "@/app/lib/utils";

type UserHeaderProps = {
    data: UserData;
};

export default function UserHeader({ data }: UserHeaderProps) {
    return (
        <div className="bg-gray-900 flex flex-col">
            {/* BANNER & AVATAR */}
            <div className="bg-gray-700 h-64 w-full flex-col">  {/* THIS IS SUPOSSED TO BE THE "BANNER", BUT I HAVE NO IMAGE COMPATIBILITY YET, SO IT'LL A DIV */}
                <div className="h-30 w-full"></div>     {/* FORCES THE USER ICON TO BE AT THE BOTTOM OF THE DIV */}
                <UserCircleIcon className="w-32 text-indigo-100 ml-13"/>    {/* USER AVATAR IMAGE, JUST A STOCK USER ICON */}
            </div>
            {/* DISPLAY NAME & USERNAME OR USERNAME & EMAIL */}
            <div className="block bg-gray-900 pl-16 w-full pt-0">
                {data.name
                ? <div>
                    <p className="text-indigo-100 font-extrabold text-3xl">{data.name}</p>
                    <p className="text-gray-600 text-xl">{`@${data.username}`}</p>
                </div>
                : <div>
                    <p className="text-indigo-100">{data.username}</p>
                    <p className="text-gray-600">{data.email}</p>
                </div>
                }
            </div>
            {/* DISPLAY  */}
            <div className="p-16 w-full pt-0">
                <div className="flex text-gray-600 text-xl">
                    <CalendarDaysIcon className="w-6"/>
                    <p>{`Joined ${parseDate(data.createdAt)}`}</p>
                </div>
            </div>
        </div>
    );
};