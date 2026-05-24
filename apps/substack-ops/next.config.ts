import type { NextConfig } from "next";
import path from "node:path";

const monorepoRoot = path.join(__dirname, "../..");

const nextConfig: NextConfig = {
  transpilePackages: ["@landing/ui"],
  outputFileTracingRoot: monorepoRoot,
};

export default nextConfig;
