'use client';

import React from 'react';
import { Alert } from '../components/ui/alert';

export default function WarningGitHubRateLimiting() {
    return <Alert status="warning">This demo might run into issues caused by GitHub rate-limiting, sorry!</Alert>;
}
