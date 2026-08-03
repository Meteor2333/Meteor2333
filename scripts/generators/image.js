import { basename } from 'path';
import { pipeline } from 'stream/promises';
import { createWriteStream, mkdirSync } from 'fs';

let queue = Promise.resolve();
const sleep = ms => new Promise(r => setTimeout(r, ms));

export default function(args) {
  const split = args.split(";;;", 2);
  if (split.length !== 2) {
    console.error(`Invalid arguments for image template: ${args}`);
    return '';
  }

  const display = split[0];
  const click = split[1];
  if (!display || !click) return '';

  mkdirSync('../assets', { recursive: true });
  let filename = basename(new URL(display).pathname);
  if (filename) {
    filename += '.svg';
  } else {
    console.warn(`Get filename failed: ${display}!`);
    return '';
  }

  const result = `<a href="${click}"><img src="assets/${filename}"/></a>`;
  queue = queue.then(async () => {
    const response = await fetch(display);
    if (!response.ok) {
      console.warn(`Download failed: ${response.statusText} (${response.status})`);
    } else {      
      await pipeline(response.body, createWriteStream(`../assets/${filename}`));
    }

    // 延时1s 防止403 forbidden
    await sleep(1000);
  }).catch(console.error);

  return result;
}