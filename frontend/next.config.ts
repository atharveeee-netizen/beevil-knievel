import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/beevil-knievel" : "",
  assetPrefix: isProd ? "/beevil-knievel/" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/beevil-knievel" : "",
  },
};

export default nextConfig;
