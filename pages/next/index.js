'use client'; // this directive should be at top of the file, before any imports.

import React from 'react';
import { Box, Heading, Link } from '@chakra-ui/react';

import InternalLink from '../../components/InternalLink';
import { LinkList } from '../../components/LinkList';

export default function Shortcuts() {
    return (
        <div>
            <InternalLink href={'/'}>back to main page</InternalLink>

            <Heading>Experimental, RFC-229</Heading>
            <Box mb={6}>
                <strong>use(await fetch)</strong> Fetching all data and use latest support of async data fetching via
                `const data = use(await fetch)`
            </Box>
            <Box mb={6}>
                See <Link href="https://github.com/reactjs/rfcs/pull/229">GH/reactjs/rfcs/pull/229</Link> for mor
                details
            </Box>

            <LinkList rootPath="/next" />
        </div>
    );
}
