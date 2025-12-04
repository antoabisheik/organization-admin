/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_BACKEND_URL
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/:path*`
          : 'https://sbackend.duckdns.org/api/:path*',
      },
    ];
  },
  // For static export (if deploying to nginx)
  // output: 'export',
  // images: {
  //   unoptimized: true,
  // },
};

export default nextConfig;
