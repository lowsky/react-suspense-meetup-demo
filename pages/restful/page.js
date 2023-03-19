'use client'; // this directive should be at top of the file, before any imports.

import React from 'react';
import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react';

import InternalLink from '../../components/InternalLink';

export default function Shortcuts() {
    return (
        <div>
            <InternalLink href={'/'}>back to main page</InternalLink>

            <Heading>Old way. All or nothing</Heading>
            <Box mb={6}>Fetching all data in a top-level `useEffect()` + props-drilling</Box>

            <UnorderedList>
                <ListItem>
                    <InternalLink href={'/restful/lowsky/react-suspense-meetup-demo'}>
                        lowsky/react-suspense-meetup-demo
                    </InternalLink>
                </ListItem>
                <ListItem>
                    <InternalLink href={'/restful/lowsky/spotify-graphql-server'}>
                        lowsky/spotify-graphql-server
                    </InternalLink>
                </ListItem>
                <ListItem>
                    <InternalLink href={'/restful/lowsky/spotify-graphql-server-graphql-helix-envelop'}>
                        lowsky/spotify-graphql-server-graphql-helix-envelop
                    </InternalLink>
                </ListItem>
            </UnorderedList>
        </div>
    );
}
