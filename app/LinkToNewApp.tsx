'use client';

import React from 'react';
import InternalLink from '../components/InternalLink';
import { Alert } from '../components/ui/alert';

export default function LinkToNewApp() {
    return (
        <Alert status="info">
            🚀 Find a <strong>new, advanced variant </strong>
            <InternalLink href="https://dashboard-gh.vercel.app">on dashboard-gh.vercel.app </InternalLink>
            gives you a 🔥 greater experience!
        </Alert>
    );
}
