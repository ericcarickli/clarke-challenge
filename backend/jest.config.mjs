export default {
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', {
      useESM: true,
      tsconfig: 'tsconfig.json',
    }],
  },
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};