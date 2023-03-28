import React, { Suspense } from 'react';
import { useRouter } from 'next/router';

import { ContentLoadingFallback } from '../../../components/ContentLoadingFallback';
import RichErrorBoundary from '../../../components/RichErrorBoundary';
import InternalLink from '../../../components/InternalLink';

import { UserRepoWaterfall } from '../../../container/LazyUserRepo';

export default function WaterfallPage() {
    const router = useRouter();
    const { userName, repoName } = router.query;

    return (
        <>
            <InternalLink href={'/waterfall'}>back to shortcut list</InternalLink>

            <WaterfallMain userName={userName} repoName={repoName} />
        </>
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
