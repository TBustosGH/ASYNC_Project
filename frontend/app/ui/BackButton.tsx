"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
    children: React.ReactNode;
    fallbackUrl?: string;
};

export default function BackButton({ children, fallbackUrl = '/home' }: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        const sessionHistory = JSON.parse(sessionStorage.getItem('app-history') || '[]');

        if (sessionHistory.length > 1 ){
            sessionHistory.pop();
            sessionStorage.setItem('app-history', JSON.stringify(sessionHistory));

            router.back();
        } else {
            router.push(fallbackUrl);
        }
    };

    return (
        <button onClick={handleBack}>
            { children }
        </button>
    );
};