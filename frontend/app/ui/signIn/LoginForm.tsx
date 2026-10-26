"use client"
import { signIn } from "next-auth/react";
import { useState } from "react";

// Components
import Link from "next/link";
import BackButton from "@/app/ui/BackButton";
import {
    ArrowLeftIcon
} from "@heroicons/react/24/outline";

// Styles
const labelClass: string = "p-2 flex flex-col justify-items-center w-full font-semibold text-xl text-center";
const inputClass: string = "p-3 m-3 ml-auto mr-auto bg-gray-600 rounded hover:border-blue-300 border border-transparent w-full font-normal text-base";

export default function LoginForm() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const credentialsAction = (e: React.SyntheticEvent) => {
        e.preventDefault();
        signIn("credentials", {
            username,
            email,
            password,
            redirect: true,
            redirectTo: '/home'
        });
    };

    return (
        <div 
            className="flex justify-center bg-gray-700 w-full h-screen"
        >
            <form 
                onSubmit={credentialsAction} 
                className="flex flex-col justify-center p-10 m-auto bg-gray-950 text-indigo-100 rounded w-125 h-150"
            >
                {/* LOGIN FORM HEADER */}
                <div className="flex">
                    {/* Go-Back arrow */}
                    <BackButton fallbackUrl="/home">
                        <ArrowLeftIcon className="w-10 hover:text-white hover:bg-gray-600 rounded-full" />
                    </BackButton>
                    {/* LOGIN FORM TITLE */}
                    <h2
                        className="mb-3 ml-30 m-auto text-center font-extrabold text-4xl text-gray-700"
                    >
                        Login
                    </h2>
                </div>

                {/* USERNAME INPUT */}
                <label 
                    htmlFor="credentials-username"
                    className={labelClass}
                >
                    <p>Username</p>
                    <input 
                        type="text"
                        id="credentials-username"
                        name="username"
                        placeholder="John Doe"
                        value={username}
                        onChange={(event) => setUsername(event.currentTarget.value)}
                        required
                        className={inputClass}
                    />
                </label>
                {/* EMAIL INPUT */}
                <label 
                    htmlFor="credentials-email"
                    className={labelClass}
                >
                    <p>Email</p>
                    <input 
                        type="email"
                        id="credentials-email"
                        name="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                        required
                        className={inputClass}
                    />
                </label>

                <label 
                    htmlFor="credentials-password"
                    className={labelClass}
                >
                    <p>Password</p>
                    <input 
                        type="password"
                        id="credentials-password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                        minLength={3}
                        maxLength={32}
                        required
                        className={inputClass}
                    />
                </label>

                <div>
                    <p>
                        Don't you have an account? 
                    </p>
                    <Link href="/create-account" className="hover:underline hover:text-blue-300">
                        create one here
                    </Link>
                </div>

                <input 
                    type="submit"
                    className="p-3 m-3 ml-auto mr-auto bg-gray-600 rounded hover:border-blue-300 hover:bg-gray-500 border border-transparent w-50 font-extrabold"
                />
            </form>
        </div>
    );
};