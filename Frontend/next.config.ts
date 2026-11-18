import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cataas.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
    ],
  },
  compress: true,
  // The AEP Builder case study was renamed Persona Builder; keep old links working.
  async redirects() {
    return [
      { source: "/dune/aep-creation", destination: "/dune/persona-creation", permanent: true },
    ];
  },
};

export default nextConfig;
