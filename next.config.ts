import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/sliitwif',
  assetPrefix: '/sliitwif/',
};

export default nextConfig;
