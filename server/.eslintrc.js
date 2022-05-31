module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {},
};
