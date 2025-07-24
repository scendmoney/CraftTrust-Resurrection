/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');

module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    '@mui/icons-material',
    '@mui/x-date-pickers',
    '@devexpress/dx-react-grid-material-ui'
  ],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add alias resolution for custom paths (but NOT for graphql package)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@src': path.resolve(__dirname, 'src'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@enums': path.resolve(__dirname, 'src/enums'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@common': path.resolve(__dirname, 'src/common'),
      'libs': path.resolve(__dirname, 'libs'),
      'components': path.resolve(__dirname, 'src/components'),
      'sharedProject': path.resolve(__dirname, 'src/sharedProject'),
      'sharedArchitech': path.resolve(__dirname, 'src/sharedArchitech'),
      'mui': path.resolve(__dirname, 'src/mui'),
      'resources': path.resolve(__dirname, 'src/resources'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'projectConstants': path.resolve(__dirname, 'src/projectConstants.ts'),
      'routes': path.resolve(__dirname, 'src/routes.ts'),
      'appContext': path.resolve(__dirname, 'src/appContext.ts'),
      // Explicitly map src/graphql to avoid conflicts with the graphql package
      'src/graphql': path.resolve(__dirname, 'src/graphql')
    };

    // Add module resolution to include node_modules
    config.resolve.modules = config.resolve.modules || [];
    config.resolve.modules.push(path.resolve(__dirname, 'node_modules'));
    
    return config;
  }
};

// Injected content via Sentry wizard below

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'architech-ks',
    project: 'crafttrust-frontend'
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true
  }
);
