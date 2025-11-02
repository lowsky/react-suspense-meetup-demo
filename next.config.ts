import { NextConfig } from 'next';
import nextMDX from '@next/mdx';

const withMDX = nextMDX();

const nextConfig: NextConfig = {
    pageExtensions: ['ts', 'tsx', 'mdx'],
    experimental: {
        // https://chakra-ui.com/docs/get-started/frameworks/next-app#optimize-bundle
        // This also helps to resolve warnings like:
        //
        // [webpack.cache.PackFileCacheStrategy] Serializing big strings (xxxkiB)
        optimizePackageImports: ['@chakra-ui/react'],
        mdxRs: true,
    },

    reactStrictMode: true,
};

export default withMDX(nextConfig);
