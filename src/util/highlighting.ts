export const languages = {
  text: ['plain', 'log'],
  config: ['yaml', 'json', 'xml', 'ini'],
  code: [
    'java',
    'javascript',
    'typescript',
    'python',
    'kotlin',
    'scala',
    'cpp',
    'csharp',
    'shell',
    'ruby',
    'rust',
    'sql',
    'go',
    'lua',
    'swift',
    'c',
  ],
  web: ['html', 'css', 'scss', 'php', 'graphql'],
  misc: ['diff', 'dockerfile', 'markdown', 'proto'],
};

export const languageIds = Object.values(languages).flat(1);
