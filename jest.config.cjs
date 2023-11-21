module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testEnvironment: 'node'
}
