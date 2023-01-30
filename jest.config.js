module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest'],
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testTimeout: 10000,
};
