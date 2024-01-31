module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  setupFiles: ["jest-localstorage-mock"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
};
