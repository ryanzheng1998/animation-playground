import fs, { writeFile } from 'fs/promises'
import fetch from 'node-fetch'

const data = await fs.readFile('./wiki.html', 'utf8')

// srcset="
// srcset="([^"]|\n)*"
// (?<=srcset=")([^"]|\n)*(?=")
const srcset = data.match(/(?<=srcset=")([^"]|\n)*(?=")/g)

if (srcset === null) throw new Error('no match')

const imagePaths = srcset
  .flatMap((x) =>
    x
      .replace(/\n/g, '')
      .split(',')
      .map((x) => x.replace(/^(\s*)/g, '').replace(/\s*$/g, ''))
  )
  .filter((x) => x.at(-2) === '2')
  .map((x) => x.replace(/ 2x$/, ''))

// download image
const src =
  'http://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Pents14.jpg/138px-Pents14.jpg'

const res = await fetch(src)

// typescript is wired here, don't know why
// this can be quicker
const blob = (await res.blob()) as Blob

writeFile('./test.jpg', blob.stream())
