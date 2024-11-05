module.exports = {
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  };