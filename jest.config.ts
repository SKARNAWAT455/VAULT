import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["<rootDir>/src/__tests__/**/*.test.ts"],
    testPathIgnorePatterns: ["/node_modules/", "/tests/e2e/"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
    },
};

export default config;
