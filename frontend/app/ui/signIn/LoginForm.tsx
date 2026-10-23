"use client"
import { signIn } from "next-auth/react";
import { useState } from "react";

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
        <form onSubmit={credentialsAction}>
            <label htmlFor="credentials-username">
                Username
                <input 
                    type="text"
                    id="credentials-username"
                    name="username"
                    placeholder="John Doe"
                    value={username}
                    onChange={(event) => setUsername(event.currentTarget.value)}
                    required
                />
            </label>
            
            <label htmlFor="credentials-email">
                Email
                <input 
                    type="email"
                    id="credentials-email"
                    name="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    required
                />
            </label>

            <label htmlFor="credentials-password">
                Password
                <input 
                    type="password"
                    id="credentials-password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    required
                    minLength={3}
                    maxLength={32}
                />
            </label>

            <input type="submit"/>
        </form>
    );
};