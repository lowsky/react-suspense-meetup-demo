import React, { Suspense } from 'react';
import { Flex } from '@chakra-ui/react';

import { Spinner } from '../components/Spinner';
import { fetchRepoBranchesWithCommitStatuses, fetchUser } from '../restinpeace/github';
import RichErrorBoundary from '../components/RichErrorBoundary';
import Repo from '../components/Repo';
import User from '../components/User';
import BranchesTable from './BranchesTable';

import { cache, createResource } from '../restinpeace/reactCache';

export type UserRepoProps = Readonly<{
    userName: string;
    repoName: string;
}>;

const branchesWithStatusesInfoHash = (userName, repoName) => `${userName}/${repoName}/br+stats`;

const getBranches = createResource(
    ({ userName, repoName }) => fetchRepoBranchesWithCommitStatuses({ userName, repoName }),
    ({ userName, repoName }) => branchesWithStatusesInfoHash(userName, repoName)
);

export const UserRepoFetchAll: React.FunctionComponent<UserRepoProps> = ({ userName, repoName }) => {
    return (
        <Flex gap="4" direction="column">
            <Repo userName={userName} repoName={repoName} />

            <LazyUser userName={userName} />
            <LazyBranchTable repoName={repoName} userName={userName} />
        </Flex>
    );
};

export const UserRepoWaterfall: React.FunctionComponent<UserRepoProps> = ({ userName, repoName }) => {
    return (
        <Flex gap="4" direction="column">
            <Repo userName={userName} repoName={repoName} />

            <Suspense fallback={<Spinner />}>
                <RichErrorBoundary message={'User not found'}>
                    <LazyUser userName={userName} />
                </RichErrorBoundary>
            </Suspense>

            <Suspense fallback={<Spinner />}>
                <RichErrorBoundary message={null}>
                    <LazyBranchTable repoName={repoName} userName={userName} />
                </RichErrorBoundary>
            </Suspense>
        </Flex>
    );
};

export default UserRepoWaterfall;

// fetchUser = async (username: string): Promise<User>;
export const getUser = createResource(fetchUser);

const LazyUser = ({ userName }) => {
    const user = getUser.read(cache, userName);

    return <User user={user} />;
};

const LazyBranchTable: React.FunctionComponent<{
    userName: string;
    repoName: string;
}> = ({ userName, repoName }) => {
    const repo = getBranches.read(cache, { userName, repoName });

    return <BranchesTable repo={repo} />;
};
