import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, AlertIcon } from '@chakra-ui/react';

import { WarningMissingURLParams } from '../../../container/NavBarWithRouting';
import InternalLink from "../../../components/InternalLink";

import UserRepo from '../../../container/UserRepo';
import {
    Branches,
    fetchRepoBranchesWithCommitStatusesAndPullRequests,
    fetchUser,
    User
} from "../../../restinpeace/github";

export default function RestfulPage() {
    const router = useRouter();
    const { userName, repoName } = router.query;
    if (userName && repoName) {
        if (typeof window === 'undefined') {
            return <h1>Server generated placeholder ... - please enable javascript to load the page.</h1>;
        }
        return (
            <>
                <InternalLink href={'/restful'}>
                    back to shortcut list
                </InternalLink>

                <RestfulMain userName={userName} repoName={repoName} />
            </>
        );
    }
    return <WarningMissingURLParams />;
}

export function RestfulMain({ userName, repoName }) {
    const [repo, storeRepo] = useState({
        name: repoName,
        owner: { login: userName },
        branches: [] as Branches,
    });

    const [user, storeUser] = useState<User>({
        login: userName,
        avatar_url: '',
    });
    const [errorMsg, storeErrorMsg] = useState('');

    useEffect(() => {
        let ignoreDownloadedData = false;

        fetchUser(userName)
            .then((user) => {
                if (!ignoreDownloadedData) {
                    storeUser(user);
                }
            })
            .catch((ex) => {
                if (!ignoreDownloadedData) {
                    storeErrorMsg('User: ' + ex.message);
                }
            });
        return () => {
            ignoreDownloadedData = true;
        };
    }, [userName]);

    useEffect(() => {
        let ignoreDownloadedData = false;

        fetchRepoBranchesWithCommitStatusesAndPullRequests({ userName, repoName })
            .then((branchesWithCommit) => {
                if (!ignoreDownloadedData)
                    storeRepo({
                        name: repoName,
                        owner: { login: userName },
                        branches: branchesWithCommit.branches,
                    });
            })
            .catch((ex) => {
                if (!ignoreDownloadedData) {
                    storeErrorMsg('Error fetching Branches: ' + ex.message);
                }
            });

        return () => {
            ignoreDownloadedData = true;
        };
    }, [userName, repoName]);

    return (
        <>
            <UserRepo user={user} repo={repo} repoName={repoName} userName={userName} />

            {errorMsg && (
                <Alert status="error">
                    <AlertIcon />
                    {errorMsg}
                </Alert>
            )}
        </>
    );
}
