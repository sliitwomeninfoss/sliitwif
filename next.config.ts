import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/sliitwif',
  assetPrefix: '/sliitwif/',
   outdir: path.join(__dirname, 'out')
};

export default nextConfig;
