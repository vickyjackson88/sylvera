/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/projects/all',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
