export const languages = {
  config: ['yaml', 'json', 'xml', 'ini'],
  code: [
    'java',
    'javascript',
    'typescript',
    'python',
    'kotlin',
    'cpp',
    'csharp',
    'shell',
    'ruby',
    'rust',
    'sql',
    'go',
  ],
  web: ['html', 'css', 'php'],
  misc: ['plain', 'dockerfile', 'markdown'],
};

// missing following the rewrite: toml, properties, log, javastacktrace, groovy, haskell, protobuf
// would be good to add these back with custom language definitions

export const languageIds = Object.values(languages).flat(1);
