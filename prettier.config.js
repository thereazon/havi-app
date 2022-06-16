module.exports = {
  tabWidth: 2,
  jsxSingleQuote: true,
  jsxBracketSameLine: true,
  printWidth: 100,
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto',
    },
  ],
  arrowParens: 'always',
  trailingComma: 'all',
  useTabs: false,
  cursorOffset: -1,
  insertPragma: false,
  jsxBracketSameLine: true,
  printWidth: 120,
  proseWrap: 'preserve',
  requirePragma: false,
}
