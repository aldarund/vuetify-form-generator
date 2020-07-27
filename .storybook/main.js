const path = require('path');


module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: [
    // '@storybook/addon-actions',
    // '@storybook/addon-links'
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    config.resolve.alias['@'] = path.resolve('src')

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require('sass'),
            fiber: require('fibers'),
            indentedSyntax: true // optional
          },
          // Requires sass-loader@^8.0.0
          options: {
            implementation: require('sass'),
            sassOptions: {
              fiber: require('fibers'),
              indentedSyntax: true // optional
            },
          },
        },
      ],

    });

    // Return the altered config
    return config;
  },
};
