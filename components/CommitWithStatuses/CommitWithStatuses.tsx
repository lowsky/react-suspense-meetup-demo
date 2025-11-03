import React from 'react';
import { Link } from '@chakra-ui/react';

import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from '../ui/popover';
import { GithubCommit } from '../../restinpeace/types';
import { Spinner } from '../Spinner';

import { CommitterInfo } from './CommitterInfo';
import { CommitStatuses } from './CommitStatuses';

import styles from './CommitWithStatuses.module.css';

interface CommitWithStatusesProps {
    commit: GithubCommit;
}

const CommitWithStatuses: React.FC<CommitWithStatusesProps> = ({ commit }) => {
    const {
        author,
        html_url,
        authoredDate,
        message = '-?-',
        sha,
        statuses,
    } = {
        ...commit,
        // does not exist in current GithubCommit type object, yet
        authoredDate: new Date(),
    };
    // status } = commit;

    const firstLineOfMessage = message?.split('\n\n', 1);

    const authorUser = author;
    return (
        <>
            {authorUser && (
                <PopoverRoot>
                    {
                        // @ts-expect-error type error in snippet
                        <PopoverTrigger>
                            <span>
                                <strong>{firstLineOfMessage}</strong> &nbsp; more{' '}
                                {html_url ? (
                                    <Link className={styles.status} href={html_url} rel="noopener noreferrer nofollow">
                                        {sha?.slice(0, 7)}
                                    </Link>
                                ) : (
                                    sha?.slice(0, 7)
                                )}
                            </span>
                        </PopoverTrigger>
                    }
                    {
                        // @ts-expect-error snippet type error
                        <PopoverContent>
                            <PopoverBody>
                                <PopoverArrow />
                                <PopoverBody>
                                    <div className={styles.status}>
                                        <i>{new Date(authoredDate).toLocaleString()}</i>
                                        <CommitterInfo author={author} />
                                    </div>
                                </PopoverBody>
                            </PopoverBody>
                        </PopoverContent>
                    }
                </PopoverRoot>
            )}
            {!authorUser && html_url && (
                <span>
                    <strong>{firstLineOfMessage}</strong> &nbsp;
                    <Link className={styles.status} href={html_url} rel="noopener noreferrer nofollow">
                        {sha?.slice(0, 7)}
                    </Link>
                </span>
            )}
            {statuses && <CommitStatuses statuses={statuses} />}
        </>
    );
};

export default CommitWithStatuses;

export const CommitWithStatusesSkeleton = () => <Spinner size="xl" />;
