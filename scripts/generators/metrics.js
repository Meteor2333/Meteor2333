import { XMLParser } from "fast-xml-parser";
import { readFileSync } from 'fs';

export default function() {
  const parser = new XMLParser({
    ignoreAttributes: false
  });
  const output = readFileSync('../metrics.svg', 'utf8');
  const xml = parser.parse(output);
  return `
<picture>
  <img 
    src="metrics.svg"
    width="${xml.svg["@_width"]}"
    height="${xml.svg["@_height"]}"
    style="width:100%;height:auto"
    alt="Metrics"
  />
</picture>
`;
}