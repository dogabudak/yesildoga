module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@atoms/(.*)': '<rootDir>/src/components/atoms/$1',
    '@helpers/(.*)': '<rootDir>/src/helpers/$1',
    '@molecules/(.*)': '<rootDir>/src/components/molecules/$1',
    '@organisms/(.*)': '<rootDir>/src/components/organisms/$1',
    '@style/(.*)': '<rootDir>/src/style/$1',
    '@templates/(.*)': '<rootDir>/src/components/templates/$1',
    '@type/(.*)': '<rootDir>/src/types/$1',
    '@mockdata/(.*)': '<rootDir>/src/mockdata/$1',
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'text', 'lcov'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  resetMocks: true,
  bail: false,
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'snapshot-diff/extend-expect',
    'jest-styled-components',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  displayName: {
    name: 'Yesildoga',
    color: 'yellow',
  },
};
