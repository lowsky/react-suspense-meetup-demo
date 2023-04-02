import React, { Suspense } from 'react';

import InternalLink from '../../../components/InternalLink';

import RichErrorBoundary from '../../../components/RichErrorBoundary';

import { UserRepoFetchAll } from '../../../container/LazyUserRepo';
import { ContentLoadingFallback } from '../../../components/ContentLoadingFallback';
import { UserRepoFromUrlProvider, useUserRepo } from '../../../components/useUserRepoFromRoute';

export default function LoadAllThenPage() {
    const { userName, repoName } = useUserRepo();
    return (
        <UserRepoFromUrlProvider>
            <InternalLink href={`/wait-for-all/`}>back to shortcut list</InternalLink>

            <WaitForAll userName={userName} repoName={repoName} />
        </UserRepoFromUrlProvider>
    );
}

export function WaitForAll({ userName, repoName }) {
    return (
        <RichErrorBoundary>
            <Suspense fallback={<ContentLoadingFallback />}>
                {userName && repoName && <UserRepoFetchAll repoName={repoName} userName={userName} />}
            </Suspense>
        </RichErrorBoundary>
    );
}
