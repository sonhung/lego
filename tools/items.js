const items = [
  {
    option: 'Button Component',
    defaultCase: '(noCase)',
    entry: {
      folderPath: './tools/templates/component/button',
    },
    stringReplacers: ['__name__', '__buttonText__'],
    output: {
      path: './src/views/__name__(kebabCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
    },
  },
  {
    option: 'Page View',
    defaultCase: '(noCase)',
    entry: {
      folderPath: './tools/templates/page/page-with-title',
    },
    stringReplacers: ['__name__', '__pageTitle__'],
    output: {
      path: './src/pages/__name__(kebabCase)',
      pathAndFileNameDefaultCase: '(pascalCase)',
    },
  },
];

exports.items = items;
