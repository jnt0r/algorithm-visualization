module.exports = {
    overrides: [
        {
            files: [ '*.spec.ts' ],
            rules: {
                '@typescript-eslint/no-non-null-assertion': 'off',
            },
        },
    ],
};
