/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'g-ecx.images-amazon.com',
      'ecx.images-amazon.com',
      'avatars.githubusercontent.com',
    ],
  },
}

module.exports = nextConfig
