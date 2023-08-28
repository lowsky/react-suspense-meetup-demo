'use client';

import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

export default function WarningGitHubRateLimiting() {
    return (
        <Alert status="warning">
            <AlertIcon />
            This demo might run into issues caused by GitHub rate-limiting, sorry!
        </Alert>
    );
}
