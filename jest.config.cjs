module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
  transform: {
    '^.+\\.ts$': 'ts-jest'  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: [
    `<rootDir>/jest.setup.ts`
  ],
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
};
