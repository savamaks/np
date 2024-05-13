/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
         
            {
                protocol: "https",
                hostname: "wclouds.ru",
                port: "",
                pathname: "/uploads/**",
            },
        ],
    },
    distDir: 'out',
    

};
module.exports = nextConfig;
