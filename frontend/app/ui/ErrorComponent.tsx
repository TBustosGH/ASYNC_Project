"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


type ErrorComponentProps = {
    errorMessage: String | null;
};

export default function ErrorComponent(props: ErrorComponentProps) {
    const { errorMessage } = props;
    const pathname = usePathname();
    console.log(pathname);
    return (
        <main className="justify-center bg-gray-950 text-indigo-100 rounded m-8 p-10">
            <h2 className="text-xl font-extrabold text-align-center">Cannot fetch posts from the server!</h2>
            {errorMessage
                ? <p className="mb-8 ml-2 mr-2 mt-5 md:ml-15 text-xl">
                    <strong>Error Message: </strong>
                    {errorMessage}
                </p>
                : <p></p>
            }

            {pathname.startsWith("/home")
                ? <p>Sorry! try again later</p>
                : <Link href="/home" className="justify-center bg-gray-900 rounded p-4 hover:bg-gray-500">
                    Return to Home page
                </Link>
            }
        </main>
    );
};