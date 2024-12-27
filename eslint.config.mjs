import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import eslintTs from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintJs from '@eslint/js'
import importPlugin from 'eslint-plugin-import'

const tsFiles = ['src/**/*.ts', 'sample/**/*.ts']

const languageOptions = {
  globals: {
    ...globals.node,
    ...globals.jest,
  },
  ecmaVersion: 2023,
  sourceType: 'module',
}

const customTypescriptConfig = {
  files: tsFiles,
  plugins: {
    import: importPlugin,
    'import/parsers': tsParser,
  },
  languageOptions: {
    ...languageOptions,
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
  },
  rules: {
    'import/export': 'error',
    'import/no-duplicates': 'warn',
    ...importPlugin.configs.typescript.rules,
    '@typescript-eslint/no-use-before-define': 'off',
    'require-await': 'off',
    'no-duplicate-imports': 'error',
    'no-unneeded-ternary': 'error',
    'prefer-object-spread': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        args: 'none',
      },
    ],
  },
}

const recommendedTypeScriptConfigs = [
  ...eslintTs.configs.recommended.map((config) => ({
    ...config,
    files: tsFiles,
  })),
  ...eslintTs.configs.stylistic.map((config) => ({
    ...config,
    files: tsFiles,
  })),
]

export default [
  { ignores: ['docs/*', 'build/*', 'lib/*', 'dist/*'] }, // global ignores
  eslintJs.configs.recommended,
  ...recommendedTypeScriptConfigs,
  customTypescriptConfig,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
]
