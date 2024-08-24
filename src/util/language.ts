export type Language =
  | 'plain'
  | 'plaintext'
  | 'log'
  | 'yaml'
  | 'json'
  | 'xml'
  | 'ini'
  | 'java'
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'kotlin'
  | 'scala'
  | 'cpp'
  | 'csharp'
  | 'shell'
  | 'ruby'
  | 'rust'
  | 'sql'
  | 'go'
  | 'html'
  | 'css'
  | 'scss'
  | 'php'
  | 'graphql'
  | 'dockerfile'
  | 'markdown'
  | 'proto';

export const unknownLanguage: Language & 'plain' = 'plain';

export interface Languages {
  text: Language[];
  config: Language[];
  code: Language[];
  web: Language[];
  misc: Language[];
}

export const languages: Languages = {
  text: ['plaintext', 'log'],
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
  ],
  web: ['html', 'css', 'scss', 'php', 'graphql'],
  misc: ['dockerfile', 'markdown', 'proto'],
};

export const languageIds: Language[] = [
  ...Object.values(languages).flat(1),
  unknownLanguage,
];

export function isLanguage(lang: string): lang is Language {
  return languageIds.includes(lang as Language);
}
