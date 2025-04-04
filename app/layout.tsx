import React from 'react';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Provider } from 'components/ui/provider';
import ColorModeScriptClient from './ColorModeScriptClient';
import WarningGitHubRateLimiting from './WarningGitHubRateLimiting';
import LinkToNewApp from './LinkToNewApp';
import { NavBar } from 'components/NavBar';

// If loading a variable font, you don't need to specify the font weight.
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'GH branch dashboard',
    icons: '/favicon.ico',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <ColorModeScriptClient />
                <Provider>
                    <NavBar />
                    <LinkToNewApp />
                    <WarningGitHubRateLimiting />
                    {children}
                </Provider>
            </body>
        </html>
    );
}
