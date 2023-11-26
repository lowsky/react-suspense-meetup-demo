// do not add 'use client' here, because it is using React cache, and the async data loading works only on the server side

import React, { cache } from 'react';

import { fetchRepoBranchesWithCommitStatusesAndPullRequests, fetchUser, User } from 'restinpeace/github';

import { RepoType } from 'components/Repo';
import { AsyncUserRepo } from 'container/AsyncUserRepo';
import InternalLink from 'components/InternalLink';

export const revalidate = 60;

interface Props {
    userData: Promise<User>;
    repoData: Promise<RepoType>;
}

// @ts-ignore - not used in production
function delay(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export default async function Page(props) {
    const { params } = props;
    const { userName, repoName } = params;

    const userData: Promise<User> = fetchUserPromise(userName);
    const repoData: Promise<RepoType> = fetchRepoBranches({ userName, repoName });

    return (
        <>
            <p>
                <InternalLink href={`/next`}>back to shortcut list</InternalLink>
            </p>

            <ReactNext userData={userData} repoData={repoData} />
        </>
    );
}

async function ReactNext({ repoData, userData }: Props) {
    // @ts-expect-error TS2786: Its return type 'Promise<Element>' is not a valid JSX element.
    return <AsyncUserRepo userData={userData} repoData={repoData} />;
}

const fetchUserPromise: (userName) => Promise<User> = cache(async (userName) => {
    await delay(2000);
    return fetchUser(userName);
});
const fetchRepoBranches: ({ userName, repoName }) => Promise<RepoType> = cache(async ({ userName, repoName }) => {
    await delay(2000);
    return fetchRepoBranchesWithCommitStatusesAndPullRequestsProm({ userName, repoName });
});

const fetchRepoBranchesWithCommitStatusesAndPullRequestsProm = cache(async ({ userName, repoName }) =>
    fetchRepoBranchesWithCommitStatusesAndPullRequests({ userName, repoName }).then((branchesWithCommit) => ({
        name: repoName,
        owner: { login: userName },
        branches: branchesWithCommit.branches,
    }))
);
