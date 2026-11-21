/// <reference types="vite/client" />
import fraunces500 from '@fontsource/fraunces/files/fraunces-latin-500-normal.woff2?url';
import fraunces600 from '@fontsource/fraunces/files/fraunces-latin-600-normal.woff2?url';
import jetbrainsMono400 from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2?url';
import jetbrainsMono700 from '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2?url';
import nunito from '@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2?url';
import sairaCondensed700 from '@fontsource/saira-condensed/files/saira-condensed-latin-700-normal.woff2?url';

/** The latin font files each theme needs for its first paint, for `<link rel="preload">`. */
export const fontPreloads: Record<string, string[]> = {
  default: [fraunces500, fraunces600, nunito],
  opal: [fraunces600, nunito],
  blueprint: [fraunces600, jetbrainsMono400, jetbrainsMono700, sairaCondensed700],
};
