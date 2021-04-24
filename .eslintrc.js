module.exports = {
	env: {
		browser: true,
		es6: true,
		es2017: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
		tsconfigRootDir: './',
		project: ['./tsconfig.json'],
	},
	extends: [
		'eslint:recommended',
		'plugin:promise/recommended',
		'plugin:sonarjs/recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	plugins: [
		'promise',
		'optimize-regex',
		'sonarjs',
		'svelte3',
		'@typescript-eslint'
	],
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3'
		}
	],
	rules: {
		'no-shadow': [
			'error',
			{
				'builtinGlobals': false
			}
		],
		'no-duplicate-imports': 'off',
		'no-template-curly-in-string': 'error',
		'block-scoped-var': 'error',
		'curly': [
			'error',
			'all'
		],
		'eqeqeq': 'error',
		'max-classes-per-file': [
			'error',
			1
		],
		'no-alert': 'warn',
		'no-console': 'warn',
		'no-else-return': [
			'error',
			{
				'allowElseIf': false
			}
		],
		'no-implicit-coercion': 'error',
		'no-labels': 'error',
		'no-lone-blocks': 'error',
		'no-multi-spaces': 'error',
		'no-new': 'error',
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-return-await': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-throw-literal': 'error',
		'no-unused-expressions': 'error',
		'no-useless-call': 'error',
		'no-useless-concat': 'error',
		'no-useless-return': 'error',
		'prefer-promise-reject-errors': 'error',
		'radix': 'error',
		'no-undefined': 'error',
		'semi': 'off',
		'@typescript-eslint/semi': [
			'error'
		],
		'array-bracket-newline': [
			'error',
			{
				'multiline': true
			}
		],
		'comma-dangle': 'off',
		'comma-style': 'error',
		'eol-last': 'error',
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'new-parens': 'error',
		'no-bitwise': 'warn',
		'no-lonely-if': 'warn',
		'no-multiple-empty-lines': 'error',
		'no-nested-ternary': 'error',
		'no-new-object': 'error',
		'no-tabs': 'off',
		'no-trailing-spaces': 'error',
		'no-unneeded-ternary': 'error',
		'no-whitespace-before-property': 'error',
		'object-curly-newline': 'error',
		'semi-spacing': 'error',
		'space-before-blocks': 'error',
		'space-before-function-paren': [
			'error',
			{
				'anonymous': 'always',
				'named': 'never',
				'asyncArrow': 'always'
			}
		],
		'space-in-parens': 'error',
		'space-infix-ops': 'error',
		'space-unary-ops': 'error',
		'spaced-comment': [
			'error',
			'always'
		],
		'switch-colon-spacing': 'error',
		'arrow-body-style': 'off',
		'arrow-parens': 'off',
		'arrow-spacing': 'error',
		'generator-star-spacing': [
			'error',
			'after'
		],
		'no-confusing-arrow': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-rename': 'error',
		'object-shorthand': [
			'error',
			'always'
		],
		'prefer-arrow-callback': 'warn',
		'prefer-destructuring': 'off',
		'sort-imports': 'off',
		'template-curly-spacing': 'error',
		'promise/prefer-await-to-then': 'off',
		'optimize-regex/optimize-regex': 'warn',
		'@typescript-eslint/no-extra-parens': [
			'error'
		],
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{
				'multiline': {
					'delimiter': 'none'
				}
			}
		],
		'@typescript-eslint/member-ordering': 'warn',
		'@typescript-eslint/no-magic-numbers': 'off',
		'@typescript-eslint/brace-style': [
			'error',
			'1tbs'
		],
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/quotes': [
			'error',
			'single',
			{
				'avoidEscape': true
			}
		],
		'@typescript-eslint/func-call-spacing': [
			'error',
			'never'
		],
		'@typescript-eslint/no-useless-constructor': 'error',
		'@typescript-eslint/prefer-for-of': 'warn',
		'@typescript-eslint/no-parameter-properties': 'error',
		'@typescript-eslint/prefer-function-type': 'warn',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/explicit-function-return-type': [
			'error',
			{
				'allowExpressions': true
			}
		],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				'argsIgnorePattern': '^_',
				'varsIgnorePattern': '^_$'
			}
		],
		'sonarjs/cognitive-complexity': [
			'warn',
			32
		]
	},
	settings: {
		'svelte3/typescript': require('typescript'), // pass the TypeScript package to the Svelte plugin
		'svelte3/ignore-styles': () => true
	}
};
