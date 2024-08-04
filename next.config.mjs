/** @type {import('next').NextConfig} */
//信任外部網站
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'oaidalleapiprodscus.blob.core.windows.net',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
