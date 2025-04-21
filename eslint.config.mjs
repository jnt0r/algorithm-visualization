import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        plugins: {
            '@stylistic': stylistic
        },

        rules: {
            'max-len': [ 'error', 180 ],
            '@typescript-eslint/no-non-null-assertion': [ 'off' ],
            'no-trailing-spaces': [ 'error' ],
            quotes: [ 'error', 'single' ],
            'prefer-const': 'error',
            '@stylistic/semi': [ 'error', 'always' ],
            'no-extra-semi': [ 'error' ],
            'semi-spacing': [ 'error', { 'before': false, 'after': true } ],
            'arrow-parens': [ 'error', 'as-needed' ],
            'object-curly-spacing': [ 'error', 'always' ],
            'array-bracket-spacing': [ 'error', 'always' ],
            // "comma-dangle": ["error", "always"],
            // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
            // e.g. "@typescript-eslint/explicit-function-return-type": "off",
            'newline-before-return': [ 'error' ],
            indent: [ 'error', 4, { MemberExpression: 1 } ],
            'newline-per-chained-call': [ 'error', { ignoreChainWithDepth: 2 } ],
            'lines-between-class-members': [ 'error', 'always', { exceptAfterSingleLine: true } ],
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
                        'private-method' // = ["private-static-method", "private-instance-method"]],
                    ]
                }
            ]
        }
    }
]);
