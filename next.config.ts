import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactCompiler: true,
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.credly.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog/:slug(nexus-part.*)',
        destination: '/blog/nexus-collaborative-workspace',
        permanent: false,
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withAnalyzer(withMDX(nextConfig));
