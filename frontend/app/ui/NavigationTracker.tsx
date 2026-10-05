"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NavigationTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const sessionHistory = JSON.parse(sessionStorage.getItem('app-history') || '[]');

        if (sessionHistory[sessionHistory.length - 1] !== pathname) {
            sessionHistory.push(pathname);
            sessionStorage.setItem('app-history', JSON.stringify(sessionHistory));
        }
    }, [pathname]);

    return null;
};