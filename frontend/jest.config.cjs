module.exports = {
  preset: 'ts-jest/presets/default-esm',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }],
    '^.+\\.scss$': 'jest-transform-css',
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.module\\.scss$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|webp)$': '<rootDir>/__mocks__/fileMock.js', // Use <rootDir>
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(module-to-transform|another-module))'],
};
