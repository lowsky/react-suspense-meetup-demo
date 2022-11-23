import React from 'react';
import { Link, VStack } from '@chakra-ui/react';

import { Maybe } from '../restinpeace/types';
import { fetchRepoPullRequestsAssociatedWithCommit } from '../restinpeace/github';
import { createResource } from '../restinpeace/reactCache';

export type PullRequestInfoProps = {
    pullRequest?: PullRequestData;

    userName?: Maybe<string>;
    repoName?: Maybe<string>;
    sha?: Maybe<string>;
};

export type PullRequestData = {
    url?: Maybe<string>;
    title?: Maybe<string>;
    number: number;
};

const getPR = createResource(
    ({ userName, repoName, sha }) => fetchRepoPullRequestsAssociatedWithCommit(userName, repoName, sha),
    ({ userName, repoName, sha }) => `pr/${userName}/${repoName}/${sha}`
);

export default function PullRequestInfo({ pullRequest, userName, repoName, sha }: PullRequestInfoProps) {
    // load on-demand, if no pullRequest given
    const { number, title, url, html_url } =
        pullRequest ?? getPR.read(null, { userName, repoName, sha })?.find?.(Boolean) ?? {};

    return (
        <VStack>
            <Link href={html_url ?? url ?? ''} title={title ?? ''} rel="noopener noreferrer nofollow">
                #{number}
            </Link>
        </VStack>
    );
}
