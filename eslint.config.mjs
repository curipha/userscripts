import globals from "globals";
import js from "@eslint/js";
import path from "node:path";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([{
  extends: compat.extends("eslint:recommended"),

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.greasemonkey,
    },
    sourceType: "script",
  },

  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    "max-depth": ["warn", 3],
    quotes: ["warn", "single"],
    semi: ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "operator-assignment": ["error", "always"],
    "quote-props": ["error", "as-needed"],
    eqeqeq: ["error", "always"],
    strict: ["error", "function"],
    yoda: ["error", "never"],
    "consistent-return": "error",
    "prefer-const": "warn",
    "prefer-template": "warn",
    "no-bitwise": "error",
    "no-confusing-arrow": "error",
    "no-else-return": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-lonely-if": "error",
    "no-shadow": "error",
    "no-unneeded-ternary": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    "no-var": "error",
  },
}]);
