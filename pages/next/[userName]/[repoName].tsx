'use client';
import React, { use, Suspense, cache } from 'react';

import { fetchRepoBranchesWithCommitStatusesAndPullRequests, fetchUser, User } from '../../../restinpeace/github';
import { UserRepoFromUrlProvider, useUserRepo } from '../../../components/useUserRepoFromRoute';
import UserRepo from '../../../container/UserRepo';
import RichErrorBoundary from '../../../components/RichErrorBoundary';
import InternalLink from '../../../components/InternalLink';
import { Spinner } from '../../../components/Spinner';
import { RepoType } from '../../../components/Repo';

function delay(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export default function ReactNextDrivenPage() {
    return (
        <UserRepoFromUrlProvider>
            <ReactNextWithUrlContext />
        </UserRepoFromUrlProvider>
    );
}

function ReactNextWithUrlContext() {
    const { userName, repoName } = useUserRepo();
    const userData: Promise<User> = fetchUserPromise(userName);
    const repoData: Promise<RepoType> = fetchRepoBranches({ userName, repoName });
    return (
        <UserRepoFromUrlProvider>
            <RichErrorBoundary>
                <InternalLink href={'/next'}>back to repos</InternalLink>
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
