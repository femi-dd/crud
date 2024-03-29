module.exports = {
  parserOptions: {
    ecmaVersion: "6",
    sourceType: "module"
  },
  env: {
    node: true,
    es6: true
  },
  extends: "eslint-config-airbnb",
  rules: {
    "no-empty": "error",
    "no-multiple-empty-lines": "warn",
    "no-var": "error",
    "prefer-const": "error"
  }
};
