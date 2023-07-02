import React from 'react';
import { Link, VStack } from '@chakra-ui/react';

import { Maybe } from '../restinpeace/types';
import { fetchRepoPullRequestsAssociatedWithCommit } from '../restinpeace/github';
import { createResource } from '../cache/reactCache';
import { useUserRepo } from './useUserRepoFromRoute';

export type PullRequestInfoProps = {
    pullRequest?: PullRequestData;
    sha?: Maybe<string>;
};

export type PullRequestData = {
    url?: Maybe<string>;
    title?: Maybe<string>;
    number: number;
};

const getPR = createResource(
    ({ userName, repoName, sha }) => fetchRepoPullRequestsAssociatedWithCommit(userName, repoName, sha),
    ({ userName, repoName, sha }) => `pr/${userName}/${repoName}/${sha.slice(0, 8)}`
);

export default function PullRequestInfo({ pullRequest, sha }: PullRequestInfoProps) {
    const { userName = 'user', repoName = 'repo' } = useUserRepo();

    // load on-demand, if no pullRequest given
    const { number, title, url, html_url } =
        pullRequest ?? getPR.read({ userName, repoName, sha })?.find?.(Boolean) ?? {};

    return (
        <VStack width="6em">
            <Link href={html_url ?? url ?? ''} title={title ?? ''} rel="noopener noreferrer nofollow">
                #{number}
            </Link>
        </VStack>
    );
}
