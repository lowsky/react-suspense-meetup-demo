import React, { Suspense } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import { GithubRepo } from '../restinpeace/types';

import BranchInfoRow from './BranchInfoRow';
import { Spinner } from '../components/Spinner';

export interface BranchesTableProps {
    repo?: GithubRepo;
}
const BranchesTable: React.FC<BranchesTableProps> = ({ repo }) => {
    const { branches, name, owner } = repo ?? {};
    return (
        <Table size="sm" variant="striped">
            <Thead>
                <Tr>
                    <Th>
                        <span className="fas fa-code-branch" />
                        <span>Branch</span>
                    </Th>
                    <Th>PR</Th>
                    <Th>Commit</Th>
                </Tr>
            </Thead>
            <Tbody>
                {(branches || []).map((branch, idx) => {
                    return (
                        branch && (
                            <Suspense
                                fallback={
                                    <Tr>
                                        <Td>
                                            <Spinner />
                                        </Td>
                                        <Td>
                                            <Spinner />
                                        </Td>
                                        <Td>
                                            <Spinner />
                                        </Td>
                                    </Tr>
                                }>
                                <BranchInfoRow
                                    key={idx}
                                    branch={branch}
                                    userName={owner?.login}
                                    repoName={name}
                                    sha={branch.lastCommit?.sha}
                                />
                            </Suspense>
                        )
                    );
                })}
            </Tbody>
        </Table>
    );
};

export default BranchesTable;
