import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../../libs/shared/ui-kit/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../libs/features/cart/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../libs/features/restaurants/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../libs/features/home/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../libs/features/menu/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../libs/shared/layout/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: ['@nx/react/plugins/storybook'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../../apps/dreckly/public/mocks'],
  webpackFinal: async (config) => {
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          configFile: require.resolve('../../tsconfig.base.json'),
        }),
      ];
    }
    return config;
  },
};

export default config;
