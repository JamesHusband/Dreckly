const nxPreset = require('@nx/jest/preset').default;
const path = require('path');

module.exports = { 
  ...nxPreset,
  setupFilesAfterEnv: [path.join(__dirname, 'test-setup.ts')],
  transform: {
    '^test-setup\\.ts$': ['babel-jest', { presets: ['@nx/react/babel'] }]
  }
};
