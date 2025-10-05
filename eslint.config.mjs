// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  // Ignorar rutas comunes
  {
    ignores: [
      '**/node_modules/**',
      '**/.yarn/**',
      '**/dist/**',
      '**/public/**',
      '**/publico/**',
      '**/coverage/**',
      '**/.vite/**',
    ],
  },

  // Base JS
  {
    files: ['**/*.{js,cjs,mjs,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // Reglas recomendadas JS
  js.configs.recommended,

  // Vue (flat config)
  // Nota: esta config aplica a *.vue y ya usa vue-eslint-parser
  // Luego abajo reforzamos el parser TS dentro de <script lang="ts">
  ...vue.configs['flat/recommended'],

  // TypeScript (sin type-check para rapidez)
  ...tseslint.configs.recommended,

  // Asegurar parser TS dentro de SFC
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        // Hace que <script lang="ts"> use el parser de TS
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  // Desactivar reglas que chocan con Prettier
  prettier,
];
