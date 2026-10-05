import { Metadata } from 'next';
import './ui/globals.css';
import { ApolloClientProvider } from './lib/graphql/ApolloClientProvider';
import NavigationTracker from './ui/NavigationTracker';

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
                <NavigationTracker />
                <ApolloClientProvider>
                    {children}
                </ApolloClientProvider>
            </body>
        </html>
    );
}