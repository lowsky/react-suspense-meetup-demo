import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Box, Heading, Icon, Link } from '@chakra-ui/react';

export interface OwnerType {
    login?: string;
}

interface RepoType {
    owner?: OwnerType;
    name?: string;
}

export interface RepoProps {
    repo?: RepoType;
    userName?: string;
    repoName?: string;
}

const Repo: React.FC<RepoProps> = ({ repo, userName, repoName }) => {
    const login = repo?.owner?.login ?? userName ?? 'unknown';
    const name = repo?.name ?? repoName ?? 'unknown';

    return (
        <Box>
            <Heading as="h1" variant="grey" size="lg">
                Repository
            </Heading>
            <Heading as="h2" size="md">
                <Link href={`https://github.com/${login}/${name}`} rel="noopener noreferrer nofollow">
                    <strong>
                        {login} / {name}
                    </strong>
                    <Icon ml={1}>
                        <FontAwesomeIcon icon={faGithub as IconProp} />
                    </Icon>
                </Link>
            </Heading>
        </Box>
    );
};

export default Repo;
