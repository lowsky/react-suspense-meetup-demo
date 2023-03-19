import React from 'react';
import { Link } from '@chakra-ui/react';

import { GithubCommit } from '../restinpeace/types';
import { CommitterInfo } from './CommitterInfo';

import styles from './CommitWithStatuses.module.css';
import { CommitStatuses } from './CommitStatuses';

export interface CommitWithStatusProps {
    commit?: GithubCommit;
}

const CommitWithStatus: React.FC<CommitWithStatusProps> = ({ commit = {} }) => {
    const { author, sha, date = '-?-', message = '-?-', statuses, status } = commit;

    const githubCommit = `https://github.com/${userName}/${repoName}/tree/${sha}`;

    let mainMessage = message?.split('\n\n', 1);

    return (
        <>
            <Link href={githubCommit} rel="noopener noreferrer nofollow" className={styles.status} isExternal>
                <strong>{mainMessage}</strong>
            </Link>

            <div className={styles.status}>
                <i>{date}</i>
                <CommitterInfo author={author} />
            </div>

            <CommitStatuses statuses={status ?? statuses} />
        </>
    );
};

export default CommitWithStatus;
