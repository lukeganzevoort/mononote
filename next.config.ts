import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  // Important: This ensures client-side navigation works
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
