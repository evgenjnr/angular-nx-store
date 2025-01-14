const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const { composePlugins, withNx } = require('@nx/webpack');
module.exports = composePlugins(withNx(), (config, { options, context }) => {
  // `config` is the Webpack configuration object
  // `options` is the options passed to the `@nx/webpack:webpack` executor
  // `context` is the context passed to the `@nx/webpack:webpack` executor
  // customize configuration here
  config = {
    ...config,
    ...{
      output: {
        path: join(__dirname, '../../../dist/apps/backend/api'),
      },
      plugins: [
        new NxAppWebpackPlugin({
          target: 'node',
          compiler: 'tsc',
          main: './src/main.ts',
          tsConfig: './tsconfig.app.json',
          assets: ['./src/assets'],
          optimization: false,
          outputHashing: 'none',
          generatePackageJson: false,
        }),
      ],
    },
  };
  return config;
});

// module.exports = {
//   output: {
//     path: join(__dirname, '../../../dist/apps/backend/api'),
//   },
//   plugins: [
//     new NxAppWebpackPlugin({
//       target: 'node',
//       compiler: 'tsc',
//       main: './src/main.ts',
//       tsConfig: './tsconfig.app.json',
//       assets: ['./src/assets'],
//       optimization: false,
//       outputHashing: 'none',
//       generatePackageJson: true,
//       watch: true,
//     }),
//   ],
// };
