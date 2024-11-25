'use client';

import React, { Suspense } from 'react';

import InternalLink from 'components/InternalLink';
import RichErrorBoundary from 'components/RichErrorBoundary';
import { ContentLoadingFallback } from 'components/ContentLoadingFallback';
import { UserRepoFetchAll } from 'container/LazyUserRepo';
import { UserRepoFromUrlProvider } from 'components/useUserRepoFromRoute';

export default function LoadAllThenPage() {
    return (
        <>
            <p>
                <InternalLink href={`/wait-for-all/`}>back to shortcut list</InternalLink>
            </p>
            <UserRepoFromUrlProvider>
                <RichErrorBoundary>
                    <Suspense fallback={<ContentLoadingFallback />}>
                        <UserRepoFetchAll />
                    </Suspense>
                </RichErrorBoundary>
            </UserRepoFromUrlProvider>
        </>
    );
}
