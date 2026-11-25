// usage: node scripts/gold-stills.mjs <outPrefix> <frame,frame,...> [scale]
import fs from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
const [prefix, frames, scale = '0.35'] = process.argv.slice(2);
const browserExecutable = '/opt/pw-browsers/chromium';
const chromiumOptions = {gl: 'swangle'};
fs.mkdirSync(path.dirname(prefix), {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id: 'GoldShort', browserExecutable, chromeMode: 'chrome-for-testing', chromiumOptions});
for (const f of frames.split(',').map(Number)) {
  await renderStill({composition, serveUrl, frame: f, output: `${prefix}${f}.png`, scale: Number(scale), browserExecutable, chromeMode: 'chrome-for-testing', chromiumOptions});
  console.log('still', f);
}
