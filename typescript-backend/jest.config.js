export default {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["./setup-jest.js", "jest-extended/all"],
  testMatch: ["**/tests/**/*.js"],
  //   transformIgnorePatterns: ["node_modules/(?!axios)"],
};
