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
  experimental: {
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: {
          subsets: ['latin', 'latin-ext']
        }
      }
    ]
  },
  webpack: (config, options, dev, isServer) => {
    const modifiedConfig = { ...config };

    modifiedConfig.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {}
        }
      ]
    });

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
