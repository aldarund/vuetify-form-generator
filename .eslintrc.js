module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'vue',
    'promise',
    'import'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0
  },
  globals: {}
}
