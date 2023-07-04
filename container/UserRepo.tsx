'use client';

import React from 'react';
import { Alert, AlertIcon, Flex } from '@chakra-ui/react';

import { useUserRepo } from 'components/useUserRepoFromRoute';
import Repo, { RepoType } from 'components/Repo';
import User from 'components/User';
import BranchesTable from './BranchesTable';
import { User as UserType } from 'restinpeace/github';

export type UserRepoProps = Readonly<{
    user?: UserType;
    repo?: RepoType;
}>;

const UserRepo: React.FunctionComponent<UserRepoProps> = ({ user, repo }) => {
    const { userName, repoName } = useUserRepo();
    return (
        <Flex gap="4" direction="column">
            {!user && (
                <Alert status="warning">
                    <AlertIcon />
                    User not found.
                </Alert>
            )}
            {!repo && (
                <Alert status="warning">
                    <AlertIcon />
                    Repo not found:
                    <a href={'https://github.com/' + userName + '/' + repoName}>
                        {userName}/{repoName}
                    </a>
                </Alert>
            )}
            {repo && <Repo repo={repo} />}
            {user && (
                // @ts-expect-error temporary ignore type mismatch
                <User user={user} />
            )}
            {repo && <BranchesTable repo={repo} />}
        </Flex>
    );
};

export default UserRepo;
