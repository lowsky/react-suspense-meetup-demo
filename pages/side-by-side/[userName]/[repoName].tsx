import { useRouter } from 'next/router';
import React, { Suspense } from 'react';

import { Spinner } from '../../../components/Spinner';
import InternalLink from '../../../components/InternalLink';

import { WaitForAll } from '../../wait-for-all/[userName]/[repoName]';
import { WaterfallMain } from '../../waterfall/[userName]/[repoName]';

import styles from './side-by-side.module.css';

export const SideBySide = () => {
    const router = useRouter();
    const { userName, repoName } = router.query;
    return (
        <div>
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
        </div>
    );
};

export default SideBySide;
