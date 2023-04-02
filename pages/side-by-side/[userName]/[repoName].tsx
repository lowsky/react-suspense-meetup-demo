import React, { Suspense } from 'react';

import { Spinner } from '../../../components/Spinner';
import InternalLink from '../../../components/InternalLink';

import { UserRepoFromUrlProvider, useUserRepo } from '../../../components/useUserRepoFromRoute';
import { WaitForAll } from '../../wait-for-all/[userName]/[repoName]';
import { WaterfallMain } from '../../waterfall/[userName]/[repoName]';

import styles from './side-by-side.module.css';

export const SideBySide = () => {
    const { userName, repoName } = useUserRepo();

    return (
        <UserRepoFromUrlProvider>
            <InternalLink href={`/side-by-side/`}>back to shortcut list</InternalLink>

            <Suspense fallback={<Spinner />}>
                <div className={styles.sideBySide}>
                    <div className={styles.side}>
                        <WaterfallMain userName={userName} repoName={repoName} />
                    </div>
                    <div className={styles.side}>
                        <WaitForAll userName={userName} repoName={repoName} />
                    </div>
                </div>
            </Suspense>
        </UserRepoFromUrlProvider>
    );
};

export default SideBySide;
