import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        plugins: { js },
        extends: ["js/recommended"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
    prettier,
    pluginVue.configs["flat/recommended"],
    {
        files: ["**/*.vue", "**/*.ts"],
        rules: {
            "vue/multi-word-component-names": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_",
                },
            ],
            "vue/singleline-html-element-content-newline": "off",
            "vue/no-v-html": "off",
            "vue/html-self-closing": [
                "error",
                {
                    "html": {
                        "void": "always",
                        "normal": "never",
                        "component": "always",
                    },
                },
            ],
        },
    },
    {
        files: ["**/*.vue"],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
    },
    {
        files: ["**/*.css"],
        plugins: { css },
        language: "css/css",
        extends: ["css/recommended"],
    },
]);