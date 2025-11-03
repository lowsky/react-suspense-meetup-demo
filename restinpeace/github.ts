import { GetResponseDataTypeFromEndpointMethod, GetResponseTypeFromEndpointMethod } from '@octokit/types';
import { Octokit } from '@octokit/rest';

import { GithubCommit, GithubStatus } from './types';

const NEXT_PUBLIC_GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export const octo = new Octokit({
    auth: NEXT_PUBLIC_GITHUB_TOKEN,
});

export interface User {
    login: string;
    company?: string | null;
    avatar_url: string;
}

export type Branch = {
    commit: Commit;
    name: string;
};
export type Branches = Branch[];

export interface Commit {
    sha: string;
    url: string;
}

type ListPullRequestsAssociatedWithCommitResponseType = GetResponseTypeFromEndpointMethod<
    typeof octo.repos.listPullRequestsAssociatedWithCommit
>;
export type ListPullRequestsAssociatedWithCommitResponseDataType = GetResponseDataTypeFromEndpointMethod<
    typeof octo.repos.listPullRequestsAssociatedWithCommit
>;

export const getCommitsForRepo = async (
    username: string,
    reponame: string,
    sha?: string,
    per_page?: number,
    page?: number
): Promise<Array<GithubCommit>> => {
    const commits = await octo.repos.listCommits({
        sha,
        per_page,
        page,
        owner: username,
        repo: reponame,
    });

    return commits.data;
};

export const getStatusesForRepo = async (owner, repo, sha): Promise<Array<GithubStatus>> => {
    const statuses = await octo.repos.listCommitStatusesForRef({
        ref: sha,
        repo,
        owner,
    });

    return statuses.data;
};

/**
 * Fetch the PR info for a given repo
 *
 * @param owner user's login name, e.g. lowsky
 * @param repo repo's name
 * @param commit_sha
 */
export const fetchRepoPullRequestsAssociatedWithCommit = async (
    owner: string,
    repo: string,
    commit_sha: string
): Promise<ListPullRequestsAssociatedWithCommitResponseDataType> => {
    const pulls: ListPullRequestsAssociatedWithCommitResponseType =
        await octo.repos.listPullRequestsAssociatedWithCommit({ owner, repo, commit_sha });
    return pulls.data;
};

export function getLastCommit(
    ownerUsername: string,
    reponame: string,
    sha
): Promise<
    GithubCommit & {
        message: string;
        date: string;
    }
> {
    return getCommitsForRepo(ownerUsername, reponame, sha, 1, 1) //
        .then((commits) => commits[0])
        .then((commit) => {
            // @ts-expect-error commit is not available in the type - needs fix
            const message = commit.commit.message;
            // @ts-expect-error commit is not available in the type - needs fix
            const date = commit.commit.committer?.date;
            return {
                ...commit,
                message,
                date,
            };
        });
}

export const fetchCommitStatuses: (commit: {
    reponame: string;
    ownerUsername: string;
    sha: string;
}) => Promise<Array<GithubStatus>> = async (commit: { reponame: string; ownerUsername: string; sha: string }) => {
    const { sha, ownerUsername, reponame } = commit;

    if (!sha) {
        return [];
    }

    return (await getStatusesForRepo(ownerUsername, reponame, sha)) ?? [];
};

/**
 * Fetch the branches for a given repo
 *
 * @param owner user's login name, e.g. lowsky
 * @param repo repo's name
 */
export const fetchRepoBranches = async (owner: string, repo: string): Promise<Branches> => {
    const listBranches = octo.repos.listBranches({ owner, repo });
    const branches = (await listBranches).data;
    branches.reverse();

    return branches;
};

/**
 * Fetch the user info for a given login
 *
 * @param username user's login name, e.g. lowsky
 */
export const fetchUser = async (username: string): Promise<User> =>
    await octo.users.getByUsername({ username }).then((response) => response.data);

export async function fetchRepoBranchesWithCommitStatusesAndPullRequests({
    userName,
    repoName,
}: {
    userName: string;
    repoName: string;
}): Promise<{
    owner: { login: string };
    name: string;
    branches: Awaited<
        Branch & {
            lastCommit: GithubCommit & {
                statuses: Array<GithubStatus>;
            };
            associatedPullRequests: ListPullRequestsAssociatedWithCommitResponseDataType;
        }
    >[];
}> {
    const branches: Branches = await fetchRepoBranches(userName, repoName);

    const branchesWithCommitProms: Promise<{
        commit: Commit;
        name: string;
        lastCommit: GithubCommit & {
            statuses: Array<GithubStatus>;
        };
        associatedPullRequests: ListPullRequestsAssociatedWithCommitResponseDataType;
    }>[] = branches.map(async (branch) => {
        const { sha } = branch.commit;

        const lastCommit: GithubCommit & {
            message: string;
            date: string;
        } = await getLastCommit(userName, repoName, sha);

        const statuses: Array<GithubStatus> = await fetchLastCommitStatuses(lastCommit, userName, repoName);

        const associatedPullRequests: ListPullRequestsAssociatedWithCommitResponseDataType =
            await fetchRepoPullRequestsAssociatedWithCommit(userName, repoName, sha);

        return {
            ...branch,
            lastCommit: {
                ...lastCommit,
                statuses,
            },
            associatedPullRequests,
        };
    });

    return {
        name: repoName,
        owner: { login: userName },
        branches: await Promise.all(branchesWithCommitProms),
    };
}

type BranchEnrichedWithCommitStatuses = {
    commit: Commit;
    name: string;
    lastCommit: GithubCommit & {
        message: string;
        date: string;
    } & {
        statuses: Array<GithubStatus>;
    };
};

function createEnrichWithLastCommitAndStats(
    userName: string,
    repoName: string
): (branch: Branch) => Promise<
    BranchEnrichedWithCommitStatuses & {
        lastCommit: GithubCommit & {
            message: string;
            statuses: Array<GithubStatus>;
        };
    }
> {
    return async (branch: Branch) => {
        const { sha } = branch.commit;

        const lastCommit: GithubCommit & {
            message: string;
            date: string;
        } = await getLastCommit(userName, repoName, sha);

        const statuses: Array<GithubStatus> = await fetchLastCommitStatuses(lastCommit, userName, repoName);

        return {
            ...branch,
            lastCommit: {
                ...lastCommit,
                statuses,
            },
        };
    };
}

export async function fetchRepoBranchesWithCommitStatuses({
    userName,
    repoName,
}: {
    userName: string;
    repoName: string;
}): Promise<{
    owner: { login: string };
    name: string;
    branches: Awaited<
        Branch & {
            lastCommit: GithubCommit;
        }
    >[];
}> {
    const branches: Branch[] = await fetchRepoBranches(userName, repoName);

    return {
        name: repoName,
        owner: { login: userName },
        branches: await Promise.all(branches.map(createEnrichWithLastCommitAndStats(userName, repoName))),
    };
}

export async function fetchLastCommitStatuses(
    commit: {
        sha?: string | null | undefined;
    },
    ownerUsername: string,
    reponame: string
): Promise<Array<GithubStatus>> {
    const { sha } = commit;
    if (sha) {
        return await fetchCommitStatuses({
            sha,
            ownerUsername,
            reponame,
        });
    }
    return [] as Array<GithubStatus>;
}
