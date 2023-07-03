const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    experimental: {
        mdxRs: true,
    },

    reactStrictMode: true,
};

module.exports = withMDX(nextConfig);
