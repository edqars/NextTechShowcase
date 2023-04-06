/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['via.placeholder.com'],
    },
    typescript: {
        ignoreBuildErrors: true, // отключил для сборки прод версии
    },
}

module.exports = nextConfig
