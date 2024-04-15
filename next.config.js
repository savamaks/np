/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
    images: {
        remotePatterns: [
          // {
          //   protocol: 'http',
          //   hostname: 'localhost',
          //   port: '3030',
          //   pathname: '/_next/image',
          // },
          {
            protocol: 'https',
            hostname: 'wclouds.ru',
            port: '',
            pathname: '/uploads/**',
          },
        ],
      },
      distDir:"out",
}

module.exports = nextConfig
