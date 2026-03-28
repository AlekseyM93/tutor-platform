import type { NextConfig } from 'next';

const isGithubPages = process.env.NEXT_PAGES_EXPORT_BUILD === 'true';
const basePath = (process.env.NEXT_BASE_PATH || '').replace(/\/$/, '');

const nextConfig: NextConfig = {
  ...(isGithubPages && {
    output: 'export' as const,
    ...(basePath ? { basePath } : {}),
    images: { unoptimized: true },
    trailingSlash: true
  }),
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb'
    }
  }
};

export default nextConfig;
