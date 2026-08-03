import { readFileSync, writeFileSync } from 'fs';

import metrics from "./generators/metrics.js";
import image from "./generators/image.js";
import quote from "./generators/quote.js";

let readme = readFileSync('../README_TEMPLATE.md', 'utf8');
readme = replaceTemplate(readme, 'metrics', () => metrics());
readme = replaceTemplate(readme, 'image', (args) => image(args));
readme = replaceTemplate(readme, 'quote', () => quote());
writeFileSync('../README.md', readme);

function replaceTemplate(text, name, generator) {
  return text.replace(
    new RegExp(
      `<!--\\s*@${name}(?:\\((.*?)\\))?\\s*-->`,
      "g"
    ),
    (_, args) => { return generator(args).trim(); }
  );
}