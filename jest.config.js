// jest.config.js
export default {
  transform: {},
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  transformIgnorePatterns: ['/node_modules/']
};
