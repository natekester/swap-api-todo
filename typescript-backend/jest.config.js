export default {
  //   transform: {
  //     "^.+\\.(ts|tsx)$": "ts-jest",
  //   },
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  //   transform: {
  //     "^.+\\.[t|j]sx?$": "babel-jest",
  //   },
  //   preset: "ts-jest",
  //   transform: {
  //     "\\.m?jsx?$": "jest-esm-transformer",
  //   },

  setupFilesAfterEnv: ["./setup-jest.js", "jest-extended/all"],
  //   testMatch: ["**/tests/**/*.js"],
  //   transformIgnorePatterns: [
  //     "<rootDir>/node_modules/(?!lodash-es|camelcase-keys)",
  //   ],

  //   transformIgnorePatterns: ["node_modules/(?!axios)"],
};
