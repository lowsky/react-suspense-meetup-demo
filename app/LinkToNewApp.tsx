'use client';

import React from 'react';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import InternalLink from '../components/InternalLink';

export default function LinkToNewApp() {
    return (
        <Alert status="info">
            <AlertIcon />
            <AlertDescription>
                🚀 Find a <strong>new, advanced variant </strong>
                <InternalLink href="https://dashboard-gh.vercel.app">on dashboard-gh.vercel.app </InternalLink>
                gives you a 🔥 greater experience!
            </AlertDescription>
        </Alert>
    );
}
