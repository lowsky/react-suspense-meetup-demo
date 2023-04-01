import React from 'react';
import { Alert, AlertIcon, Flex } from '@chakra-ui/react';

import Repo, { RepoType } from '../components/Repo';
import User from '../components/User';
import BranchesTable from './BranchesTable';
import { User as UserType } from '../restinpeace/github';

export type UserRepoProps = Readonly<{
    user?: UserType;
    repo?: RepoType;
    userName: string;
    repoName: string;
}>;

const UserRepo: React.FunctionComponent<UserRepoProps> = ({ user, repo, userName, repoName }) => {
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
            {user && <User user={user} />}
            {repo && <BranchesTable repo={repo} />}
        </Flex>
    );
};

export default UserRepo;
