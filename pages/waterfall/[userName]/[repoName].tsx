import React, { Suspense } from 'react';
import { useRouter } from 'next/router';

import { WarningMissingURLParams } from '../../../container/NavBarWithRouting';
import { ContentLoadingFallback } from '../../../components/ContentLoadingFallback';
import RichErrorBoundary from '../../../components/RichErrorBoundary';
import InternalLink from '../../../components/InternalLink';

import UserRepoWaterfall from '../../../container/LazyUserRepo';

export default function WaterfallPage() {
    const router = useRouter();
    const { userName, repoName } = router.query;

    if (userName && repoName) {
        if (typeof window === 'undefined') {
            return <h1>Server generated placeholder ... - please enable javascript to load the page.</h1>;
        }
        return (
            <>
                <InternalLink href={'/waterfall'}>back to shortcut list</InternalLink>

                <WaterfallMain userName={userName} repoName={repoName} />
            </>
        );
    }
    return <WarningMissingURLParams />;
}

export function WaterfallMain({ userName, repoName }) {
    return (
        <RichErrorBoundary>
            <Suspense fallback={<ContentLoadingFallback />}>
                <UserRepoWaterfall repoName={repoName} userName={userName} />
            </Suspense>
        </RichErrorBoundary>
    );
}
