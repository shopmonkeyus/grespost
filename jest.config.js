module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js']
}
