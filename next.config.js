/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // {
            //   protocol: 'http',
            //   hostname: 'localhost',
            //   port: '3030',
            //   pathname: '/_next/image',
            // },
            {
                protocol: "https",
                hostname: "wclouds.ptz-potolki.ru",
                port: "",
                pathname: "/uploads/**",
            },
        ],
    },
    distDir: "out",
    transpilePackages: ["@plaiceholder/ui"],
    reactStrictMode: false,
};

module.exports = nextConfig;
