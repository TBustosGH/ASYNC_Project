import { Metadata } from 'next';
import './ui/globals.css';
import { ApolloClientProvider } from './lib/graphql/ApolloClientProvider';

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
            <body> 
                <ApolloClientProvider>
                    {children}
                </ApolloClientProvider>
            </body>
        </html>
    );
}