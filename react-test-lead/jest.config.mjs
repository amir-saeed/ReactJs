import jestConfig from "next/jest.js";

const createJestConfig = jestConfig({
  dir: "./",
});

/** @type {import ("jest").Config} */
const config = {
  collectCoverage: false,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Only needed for what is not covered by tsconfig's `paths` option
    "^utils/(.*)$": "<rootDir>/utils/$1",
  },
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
