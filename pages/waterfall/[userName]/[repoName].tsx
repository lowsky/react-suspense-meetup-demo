import React, { Suspense } from 'react';

import { ContentLoadingFallback } from '../../../components/ContentLoadingFallback';
import RichErrorBoundary from '../../../components/RichErrorBoundary';
import InternalLink from '../../../components/InternalLink';

import { UserRepoWaterfall } from '../../../container/LazyUserRepo';
import { UserRepoFromUrlProvider, useUserRepo } from '../../../components/useUserRepoFromRoute';

export default function WaterfallPage() {
    const { userName, repoName } = useUserRepo();
    return (
        <UserRepoFromUrlProvider>
            <InternalLink href={'/waterfall'}>back to shortcut list</InternalLink>

            <WaterfallMain userName={userName} repoName={repoName} />
        </UserRepoFromUrlProvider>
    );
}

export function WaterfallMain({ userName, repoName }) {
    return (
        <RichErrorBoundary>
            <Suspense fallback={<ContentLoadingFallback />}>
                {userName && repoName && <UserRepoWaterfall repoName={repoName} userName={userName} />}
            </Suspense>
        </RichErrorBoundary>
    );
}
