import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,
};

export default nextConfig;
