module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:nuxt/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "vue/multi-word-component-names": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
