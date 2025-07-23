module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: false
    }]
  },
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: [
    '**/*.(ts|js)',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**'
  ]
};