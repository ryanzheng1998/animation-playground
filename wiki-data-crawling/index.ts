import fs from 'fs/promises'

const data = await fs.readFile('./wiki.html', 'utf8')

// srcset="
// srcset="([^"]|\n)*"
// (?<=srcset=")([^"]|\n)*(?=")
const srcset = data.match(/(?<=srcset=")([^"]|\n)*(?=")/g)

if (srcset === null) throw new Error('no match')

const imagePaths = srcset
  .flatMap(x =>
    x
      .replace(/\n/g, '')
      .split(',')
      .map(x => x.replace(/^(\s*)/g, '').replace(/\s*$/g, ''))
  )
  .filter(x => x.at(-2) === '2')
  .filter(x => x.at(1) === '/')
  .map(x => x.replace(/ 2x$/, ''))
  .map(x => 'https:' + x)

console.log(imagePaths)

// download image async
imagePaths.map(path => {
  const imageName = path.split('/').at(-1)
})

// const src =
//   'http://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Pents14.jpg/138px-Pents14.jpg'

// const res = await fetch(src)

// // this can be quicker
// const blob = await res.blob()

// writeFile('./test.jpg', blob.stream())
