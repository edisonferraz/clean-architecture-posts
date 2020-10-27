module.exports = {
    rootDir: "../",
    roots: ['<rootDir>'],
    transform: {
      '^.+\\.ts?$': 'ts-jest'
    },
    testRegex: '(../tests/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    testPathIgnorePatterns: ['../tests/stubs/'],    
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverage: true,
    clearMocks: true,
    coverageDirectory: "coverage",
};