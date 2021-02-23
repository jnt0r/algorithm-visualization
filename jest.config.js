module.exports = {
    verbose: true,
    roots: ['<rootDir>/src', '<rootDir>/test'],
    cache: false,
    // testMatch: ['<rootDir>/test/**/*.spec.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: ['./setupJest.ts'],
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
};
