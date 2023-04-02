import React from 'react';
import { Box, Heading, UnorderedList } from '@chakra-ui/react';
import Head from 'next/head';

import InternalLink from '../components/InternalLink';

export default function Index() {
    return (
        <div>
            <Head>
                <title>React Suspend Demo</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Heading>What is it?</Heading>

            <Box>This is a demo of React.Suspense in data fetching scenarios.</Box>
            <Box>
                Main use case is typically showing a loading spinner.
                <br />
                Suspense helps to simplify the code structure for handling asynchronously data fetched even when it is
                done incrementally.
            </Box>

            <Heading size="medium">Choose one of these different scenarios:</Heading>

            <UnorderedList>
                <li>
                    🆕<InternalLink href={'/next'}>Experimental, RFC-229</InternalLink>{' '}
                    <strong>use(await fetch)</strong> Fetching all data and use latest support of async data fetching
                    via `const data = use(await fetch)`
                </li>
                <li>
                    <InternalLink href={'/restful'}>Old way</InternalLink> <strong>All or nothing:</strong> Fetching all
                    data in a top-level `useEffect()` + props-drilling
                </li>
                <li>
                    <InternalLink href={'/wait-for-all'}>With One Suspense</InternalLink>{' '}
                    <strong>Global Spinner</strong> Waiting until all data got fetched (modern Promise-based way)
                </li>
                <li>
                    <InternalLink href={'/waterfall'}>Optimised Suspense</InternalLink> <strong>Incremental:</strong>{' '}
                    Showing results incrementally (waterfall) as soon as they got loaded. (modern Promise-based way)
                </li>
                <li>
                    <InternalLink href={'/side-by-side'}>Side-by-Side</InternalLink> <strong>Comparison:</strong> Show
                    incrementally loading and wait-for-all
                </li>
            </UnorderedList>
        </div>
    );
}
