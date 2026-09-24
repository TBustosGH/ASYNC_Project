import { Metadata } from 'next';
import './ui/globals.css';

export const metadata: Metadata = {
    title: {
        template: '%s | ASYNC Project',
        default: 'ASYNC Project',
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body> {children} </body>
        </html>
    );
}