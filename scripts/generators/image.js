import syncFetch from 'sync-fetch';
import { basename } from 'path';
import { pipeline } from 'stream/promises';
import { createWriteStream, mkdirSync, writeFileSync } from 'fs';

export default function(args) {
  const split = args.split(";;;", 2);
  if (split.length !== 2) {
    console.error(`Invalid arguments for image template: ${args}`);
    return '';
  }

  const display = split[0];
  const click = split[1];
  if (!display || !click) return '';

  const response = syncFetch(display);
  if (!response.ok) {
    console.warn(`Download failed: ${response.statusText}`);
    return '';
  }

  mkdirSync('../assets', { recursive: true });
  let filename = basename(new URL(display).pathname);
  if (filename) {
    filename += '.svg';
  } else {
    console.warn(`Get filename failed: ${display}!`);
    return '';
  }

  writeFileSync(`../assets/${filename}`, response.buffer());
  return `
<a href="${click}"><img src="assets/${filename}"/></a>
  `;
}