module.exports = {
  preset: 'ts-jest',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['<rootDir>/test/**/*.test.{ts,tsx}'],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
}
