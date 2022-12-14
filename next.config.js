const dotenv = require('dotenv');

dotenv.config();

const { NEXT_PUBLIC_ENVIRONMENT } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: NEXT_PUBLIC_ENVIRONMENT === 'local'
  },
  eslint: {
    ignoreDuringBuilds: NEXT_PUBLIC_ENVIRONMENT === 'local'
  },
  webpack: (config, options, dev, isServer) => {
    const modifiedConfig = { ...config };
    if (!dev && !isServer) {
      modifiedConfig.resolve.alias = {
        ...modifiedConfig.resolve.alias,
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      };
    }

    return modifiedConfig;
  }
};

module.exports = nextConfig;
