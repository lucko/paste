export const bytebinUrl =
  process.env.REACT_APP_BYTEBIN_URL || 'https://bytebin.lucko.me/';

export const postUrl = bytebinUrl + 'post';

export const languageDetectionUrl =
  process.env.REACT_APP_LANG_DETECT_URL ||
  'https://language-detection-service.pastes.dev/';
