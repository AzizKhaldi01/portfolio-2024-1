/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['mui-tel-input'],

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/, // Match video files
      type: 'asset/resource',   // Use Webpack's built-in asset handling
    });
    return config;
  },
};

export default nextConfig;
