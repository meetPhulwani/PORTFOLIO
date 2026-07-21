/**
 * One-off favicon rasterizer — run with:
 * npx --yes -p sharp -p png-to-ico node scripts/generate-favicons.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const svg = readFileSync(join(publicDir, 'favicon.svg'))

async function writePng(size, filename) {
  const buffer = await sharp(svg)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .png()
    .toBuffer()
  writeFileSync(join(publicDir, filename), buffer)
  return buffer
}

const png16 = await writePng(16, 'favicon-16x16.png')
const png32 = await writePng(32, 'favicon-32x32.png')
await writePng(48, 'favicon-48x48.png')
await writePng(180, 'apple-touch-icon.png')

const ico = await pngToIco([png16, png32, await sharp(svg).resize(48, 48).png().toBuffer()])
writeFileSync(join(publicDir, 'favicon.ico'), ico)

console.log('Generated: favicon-16x16.png, favicon-32x32.png, favicon-48x48.png, apple-touch-icon.png, favicon.ico')
