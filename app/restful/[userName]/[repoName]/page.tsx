'use client';

import React, { Suspense, useEffect, useState } from 'react';

import { Branches, fetchRepoBranchesWithCommitStatusesAndPullRequests, fetchUser, User } from 'restinpeace/github';
import InternalLink from 'components/InternalLink';
import UserRepo from 'container/UserRepo';
import { ContentLoadingFallback } from '../../../../components/ContentLoadingFallback';

export default function RestfulPage({ params }) {
    const { userName, repoName } = params;
    return (
        <>
            <InternalLink href={'/restful'}>back to repos</InternalLink>
            <Suspense fallback={<ContentLoadingFallback />}>
                <RestfulMain userName={userName} repoName={repoName} />
            </Suspense>
        </>
    );
}

function RestfulMain({ userName, repoName }) {
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
            <UserRepo user={user} repo={repo} />

            {errorMsg && <Alert status="error">{errorMsg}</Alert>}
        </>
    );
}
