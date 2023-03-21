import React, { Suspense } from 'react';
import { useRouter } from 'next/router';

import InternalLink from '../../../components/InternalLink';

import RichErrorBoundary from '../../../components/RichErrorBoundary';

import { UserRepoFetchAll } from '../../../container/LazyUserRepo';
import { ContentLoadingFallback } from '../../../components/ContentLoadingFallback';

export default function LoadAllThenPage() {
    const router = useRouter();
    const { userName, repoName } = router.query;

    return (
        <>
            <InternalLink href={`/wait-for-all/`}>back to shortcut list</InternalLink>

            <WaitForAll userName={userName} repoName={repoName} />
        </>
    );
}

export function WaitForAll({ userName, repoName }) {
    return (
        <RichErrorBoundary>
            <Suspense fallback={<ContentLoadingFallback />}>
                <UserRepoFetchAll repoName={repoName} userName={userName} />
            </Suspense>
        </RichErrorBoundary>
    );
}
