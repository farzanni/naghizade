import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/trucks",
        destination: "/machinery",
        permanent: true,
      },
      {
        source: "/trucks/:slug",
        destination: "/machinery/:slug",
        permanent: true,
      },
      {
        source: "/construction",
        destination: "/machinery",
        permanent: true,
      },
      {
        source: "/construction/:slug",
        destination: "/machinery/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
