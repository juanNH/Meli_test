// jest.config.js
module.exports = {
    setupFiles: ['./jest.setup.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'node',
    transformIgnorePatterns: [
      '/node_modules/(?!node-fetch)'
    ],
  };
  