import React, { Suspense } from 'react';
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import { GithubRepo } from '../restinpeace/types';

import BranchInfoRow, { SkeletonRow } from './BranchInfoRow';

export interface BranchesTableProps {
    repo?: GithubRepo;
}
const BranchesTable: React.FC<BranchesTableProps> = ({ repo }) => {
    const { branches } = repo ?? {};
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
                {(branches ?? [])
                    .filter((b) => Boolean(b))
                    .map((branch, idx) => (
                        <Suspense key={idx} fallback={<SkeletonRow />}>
                            <BranchInfoRow key={idx} branch={branch!} sha={branch!.lastCommit?.sha} />
                        </Suspense>
                    ))}
            </Tbody>
        </Table>
    );
};

export default BranchesTable;
