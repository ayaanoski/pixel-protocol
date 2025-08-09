/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      useESM: true
    }],
    '^.+\\.jsx?$': ['babel-jest', {
      presets: ['@babel/preset-env']
    }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^wagmi$': '<rootDir>/node_modules/wagmi/dist/index.js',
    '^wagmi/(.*)$': '<rootDir>/node_modules/wagmi/dist/$1.js',
    '^viem(.*)$': '<rootDir>/node_modules/viem/dist$1.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(wagmi|@wagmi|viem|@viem|@tanstack)/)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  verbose: true
};
