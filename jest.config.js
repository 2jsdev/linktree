/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], // ts-jest configuration moved inside the array
  },
  moduleNameMapper: {
    // Map the aliases defined in your tsconfig.json to relative paths
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFiles: ["reflect-metadata"],
};
