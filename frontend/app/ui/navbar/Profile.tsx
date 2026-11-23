"use server";

import Link from "next/link";
import { auth, signOut } from "@/auth";
import clsx from "clsx";
import { getUserData } from "@/app/lib/users/utils";


export default async function Profile() {
    const session = await auth();
    const userData = session?.user?.id
        ? await getUserData(Number(session?.user?.id))
        : null;

    return (
        <div>
            {/* LOGGED-IN VIEW */}
            <div className={clsx(
                "w-full h-full bg-transparent",
                {
                    "hidden": !userData?.getUser.id,
                    "block": userData?.getUser.id
                }
            )}>
                <h2 
                    className="w-full h-full bg-transparent p-4 text-2xl font-bold text-black flex justify-center"
                >
                    {userData?.getUser.username}
                </h2>

                <form
                    action={async () => {
                        'use server';
                        await signOut({ redirectTo: '/home' });
                    }}
                    className="flex justify-center p-2  rounded-md bg-gray-900 text-white font-medium hover:bg-red-500"
                >
                    <button>
                        <div>Sign Out</div>
                    </button>
                </form>
            </div>
            {/* LOGGED-OUT VIEW */}
            <div className={clsx(
                "",
                {
                    "hidden": userData?.getUser.id,
                    "block": !userData?.getUser.id
                }
            )}>
                <Link href="/signIn" 
                    className="flex justify-center py-3 m-3 rounded-md bg-gray-900 text-white font-medium hover:bg-gray-500"
                >
                    <h2>Login</h2>
                </Link>

                <Link href="/create-account"
                    className="flex justify-center py-2 rounded-md bg-gray-900 text-white font-medium hover:bg-gray-500"
                >
                    <h2>Create an account</h2>
                </Link>
            </div>
        </div>
    );
};