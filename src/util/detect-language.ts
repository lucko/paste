import { languageDetectionUrl } from './constants';
import { Language } from './language';

interface DetectedLanguage {
  languageId: string;
  confidence: number;
}

export async function detectLanguage(id: string): Promise<Language | null> {
  try {
    const resp = await fetch(languageDetectionUrl + id);
    if (resp.ok) {
      const results = (await resp.json()) as DetectedLanguage[];
      for (const { languageId, confidence } of results) {
        if (confidence > 0.5 && lookup[languageId]) {
          return lookup[languageId];
        }
      }
    }
  } catch (e) {}
  return null;
}

const lookup: Record<string, Language> = {
  ini: 'log', // the model seems to confidently guess log files as ini - log is the more likely option
  yaml: 'yaml',
  md: 'markdown',
  rb: 'ruby',
  kt: 'kotlin',
  xml: 'xml',
  js: 'javascript',
  html: 'html',
  ts: 'typescript',
  json: 'json',
  php: 'php',
  py: 'python',
  rs: 'rust',
  sql: 'sql',
  sh: 'shell',
  cpp: 'cpp',
  go: 'go',
  scala: 'scala',
  dockerfile: 'dockerfile',
  java: 'java',
  cs: 'csharp',
  css: 'css',
  groovy: 'java',
};
// missing: csv, ml, ex, pas, bat, lua, groovy, v, jl, pm, prolog, matlab, clj, f90, c, tex, coffee, ps1, hs, mm, cmake, erl, dm, dart, asm, makefile, r, swift, lisp, vba, toml, cbl
