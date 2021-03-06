module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    'browser': true
  },
  globals: {
    ArrayBuffer: true,
    Uint32Array: true,
    Uint16Array: true,
    Uint8Array: true
  },
  rules: {
    'quotes': ['error', 'single', {  "allowTemplateLiterals": true, "avoidEscape": true }],
    'ember-suave/no-const-outside-module-scope': 0,
    'ember-suave/no-direct-property-access': 1
  }
};
