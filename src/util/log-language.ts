import type { languages } from 'monaco-editor';

// Source:
// - https://github.com/emilast/vscode-logfile-highlighter/blob/master/syntaxes/log.tmLanguage
// - https://github.com/sumy7/monaco-language-log/blob/main/language-log.js
export const logLanguage: languages.IMonarchLanguage = {
  defaultToken: '',
  tokenizer: {
    // prettier-ignore
    root: [
      // Trace/Verbose
      [/\b(Trace)\b:/, 'verbose'],
      // Serilog VERBOSE
      [/\[(verbose|verb|vrb|vb|v)]/i, 'verbose'],
      // Android logcat Verbose
      [/\bV\//, 'verbose'],
      // DEBUG
      [/\b(DEBUG|Debug)\b|\b([dD][eE][bB][uU][gG]):/, 'debug'],
      // Serilog DEBUG
      [/\[(debug|dbug|dbg|de|d)]/i, 'debug'],
      // Android logcat Debug
      [/\bD\//, 'debug'],
      // INFO
      [/\b(HINT|INFO|INFORMATION|Info|NOTICE|II)\b|\b([iI][nN][fF][oO]|[iI][nN][fF][oO][rR][mM][aA][tT][iI][oO][nN]):/, 'info'],
      // serilog INFO
      [/\[(information|info|inf|in|i)]/i, 'info'],
      // Android logcat Info
      [/\bI\//, 'info'],
      // WARN
      [/\b(WARNING|WARN|Warn|WW)\b|\b([wW][aA][rR][nN][iI][nN][gG]):/, 'warning'],
      // Serilog WARN
      [/\[(warning|warn|wrn|wn|w)]/i, 'warning'],
      // Android logcat Warning
      [/\bW\//, 'warning'],
      // ERROR
      [/\b(ALERT|CRITICAL|EMERGENCY|ERROR|FAILURE|FAIL|Fatal|FATAL|Error|EE)\b|\b([eE][rR][rR][oO][rR]):/, 'error'],
      // Serilog ERROR
      [/\[(error|eror|err|er|e|fatal|fatl|ftl|fa|f)]/i, 'error'],
      // Android logcat Error
      [/\bE\//, 'error'],
      // ISO dates ("2020-01-01")
      [/\b\d{4}-\d{2}-\d{2}(T|\b)/, 'date'],
      // Culture specific dates ("01/01/2020", "01.01.2020")
      [/\b\d{2}[^\w\s]\d{2}[^\w\s]\d{4}\b/, 'date'],
      // Clock times with optional timezone ("01:01:01", "01:01:01.001", "01:01:01+01:01")
      [/\d{1,2}:\d{2}(:\d{2}([.,]\d{1,})?)?(Z| ?[+-]\d{1,2}:\d{2})?\b/, 'date'],
      // Git commit hashes of length 40, 10, or 7
      //[/\b([0-9a-fA-F]{40}|[0-9a-fA-F]{10}|[0-9a-fA-F]{7})\b/, 'constant'],
      // Guids
      [/[0-9a-fA-F]{8}[-]?([0-9a-fA-F]{4}[-]?){3}[0-9a-fA-F]{12}/, 'constant'],
      // MAC addresses: 89:A1:23:45:AB:C0, fde8:e767:269c:0:9425:3477:7c8f:7f1a
      //[/\b([0-9a-fA-F]{2,}[:-])+([0-9a-fA-F]{2,})+\b/, 'constant'],
      // Constants
      //[/\b([0-9]+|true|false|null)\b/, 'constant'],
      // Hex Constants
      [/\b(0x[a-fA-F0-9]+)\b/, 'constant'],
      // String constants
      [/"[^"]*"/, 'string'],
      [/(?<![\w])'[^']*'/, 'string'],
      // Colorize rows of exception call stacks
      [/[\t ]*at[\t ]+.*$/, 'exception'],
      [/Exception in thread ".*" .*$/, 'exception'],
      // Exception type names
      [/\b([a-zA-Z.]*Exception)\b/, 'exception'],
      // Match Urls
      [/\b(http|https|ftp|file):\/\/\S+\b\/?/, 'constant'],
      // Match character and . sequences (such as namespaces) as well as file names and extensions (e.g. bar.txt)
      //[/(?<![\w/\\])([\w-]+\.)+([\w-])+(?![\w/\\])/, 'constant'],
    ],
  },
};
