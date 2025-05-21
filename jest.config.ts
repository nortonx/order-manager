import nextJs from "next/jest";

const createJestConfig = nextJs({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  verbose: true,
  testMatch: ['<rootDir>/tests/**/*.test.tsx'],
}

module.exports = createJestConfig(customJestConfig);