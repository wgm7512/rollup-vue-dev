module.exports = {
  "root": true,
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-unused-vars": [
      1
    ],
    "no-console": 1,
    "semi": 2,
    "indent": [
      2,
      2
    ]
  }
};