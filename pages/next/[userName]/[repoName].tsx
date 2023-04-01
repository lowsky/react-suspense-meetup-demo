'use client';
import React, { use, Suspense, cache } from 'react';

import { fetchRepoBranchesWithCommitStatusesAndPullRequests, fetchUser, User } from '../../../restinpeace/github';
import UserRepo from '../../../container/UserRepo';
import RichErrorBoundary from '../../../components/RichErrorBoundary';
import InternalLink from '../../../components/InternalLink';
import { Spinner } from '../../../components/Spinner';
import { RepoType } from '../../../components/Repo';
import { UserRepoFromUrlProvider, useUserRepo } from '../../../components/useUserRepoFromRoute';

function delay(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export default function RestfulPage() {
    const { userName, repoName } = useUserRepo();

    if (!userName || !repoName) {
        // This is not yet supported on the server-side, so we need to skip rendering:
        return null;
    }

    const userData: Promise<User> = fetchUserPromise(userName);
    const repoData: Promise<RepoType> = fetchRepoBranches({ userName, repoName });
    return (
        <UserRepoFromUrlProvider>
            <RichErrorBoundary>
                <InternalLink href={'/restful'}>back to repos</InternalLink>
                <Suspense fallback={<Spinner />}>
                    <ReactNext userData={userData} repoData={repoData} />
                </Suspense>
            </RichErrorBoundary>
        </UserRepoFromUrlProvider>
    );
}

const fetchUserPromise: (id) => Promise<User> = cache(async (id) => {
    await delay(2000);
    return fetchUser(id);
});
const fetchRepoBranches: ({ userName, repoName }) => Promise<RepoType> = cache(async ({ userName, repoName }) => {
    await delay(2000);
    return fetchRepoBranchesWithCommitStatusesAndPullRequestsProm({ userName, repoName });
});

interface Props {
    userData: Promise<User>;
    repoData: Promise<RepoType>;
}

function ReactNext({ userData, repoData }: Props) {
    const user = use(userData);
    const repo: RepoType = use(repoData);

    return <UserRepo user={user} repo={repo} />;
}

const fetchRepoBranchesWithCommitStatusesAndPullRequestsProm = cache(async ({ userName, repoName }) =>
    fetchRepoBranchesWithCommitStatusesAndPullRequests({ userName, repoName }).then((branchesWithCommit) => ({
        name: repoName,
        owner: { login: userName },
        branches: branchesWithCommit.branches,
    }))
);
