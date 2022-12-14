import { useRouter } from 'next/router';
import React, { Suspense } from 'react';

import { Spinner } from '../../../components/Spinner';
import { WarningMissingURLParams } from "../../../container/NavBarWithRouting";
import InternalLink from "../../../components/InternalLink";

import { WaitForAll } from '../../wait-for-all/[userName]/[repoName]';
import { WaterfallMain } from '../../waterfall/[userName]/[repoName]';

import styles from './side-by-side.module.css';

export const SideBySide = () => {
    const router = useRouter();
    const { userName, repoName } = router.query;
    if (userName && repoName) {
        if (typeof window === 'undefined') {
            return <h1>Server generated placeholder ... - please enable javascript to load the page.</h1>;
        }

        return (
            <div>
                <InternalLink href={`/side-by-side/`}>
                    back to shortcut list
                </InternalLink>

                {userName && repoName && (
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
                )}
            </div>
        );
    }
    return <WarningMissingURLParams />;
};

export default SideBySide;
