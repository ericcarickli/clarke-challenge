export default {
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', {
      // ts-jest specific configuration options go here
      useESM: true,
      tsconfig: 'tsconfig.json',
    }],
  },
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};