module.exports = {
    verbose: true,
    roots: ['<rootDir>/src', '<rootDir>/test'],
    // testMatch: ['<rootDir>/test/**/*.spec.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};
