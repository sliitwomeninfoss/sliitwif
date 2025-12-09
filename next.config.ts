import type { NextConfig } from "next";

const isPR = process.env.NEXT_PUBLIC_PR_NUMBER;
const repoBase = "/sliitwif";

const dynamicBasePath = isPR ? `${repoBase}/pr-${isPR}` : repoBase;

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: dynamicBasePath,
  assetPrefix: `${dynamicBasePath}/`,
};

export default nextConfig;
