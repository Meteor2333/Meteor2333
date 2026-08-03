import { XMLParser } from "fast-xml-parser";
import { readFileSync, writeFileSync } from 'fs';

const parser = new XMLParser({
  ignoreAttributes: false
});
const output = readFileSync('../metrics.svg', 'utf8');
const xml = parser.parse(output);
const width = xml.svg["@_width"];
const height = xml.svg["@_height"];
// 添加加载后渐亮动画效果
writeFileSync(
  '../metrics.svg',
  `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
${output}
<animate
  attributeName="opacity"
  from="0"
  to="1"
  dur="0.3s"
  fill="freeze"/>
</svg>
  `
);

export default function() {
  return `
<picture>
  <img 
    src="metrics.svg"
    width="${width}"
    height="${height}"
    style="width:100%;height:100%"
    alt="Metrics"
  />
</picture>
`;
}