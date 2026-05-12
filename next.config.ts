import "./src/env"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.epicurious.com', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/:path*`,
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/provider-dashboard/my%20meals",
        destination: "/provider-dashboard/my-meals",
        permanent: true,
      }
    ]
  },
};

export default nextConfig;