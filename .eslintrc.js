module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser

    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },

    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],

    root: true,
    env: {
        node: true,
        // jest: true,
    },

    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        'newline-before-return': ['error'],
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    // Index signature
                    // No accessibility for index signature. See above.

                    // Fields
                    'private-field', // = ["private-static-field", "private-instance-field"]
                    'protected-field', // = ["protected-static-field", "protected-instance-field"]
                    'public-field', // = ["public-static-field", "public-instance-field"]

                    // Constructors
                    // Only the accessibility of constructors is configurable. See below.

                    // Methods
                    'public-method', // = ["public-static-method", "public-instance-method"]
                    'protected-method', // = ["protected-static-method", "protected-instance-method"]
                    'private-method', // = ["private-static-method", "private-instance-method"]],
                ],
            },
        ],
    },
};
