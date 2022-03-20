import { createServer } from 'http'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import { createGzip, createDeflate } from 'zlib'
import { Hello } from '../common/Hello.js'
import { renderSSR } from 'nano-jsx/esm/index.js'

const hostname = '127.0.0.1'
const port = 3000

const server = createServer((req, res) => {
  res.statusCode = 200

  // serve bundle.js
  if (req.url === '/bundle.js') {
    res.setHeader('Content-Type', 'application/javascript')
    const raw = createReadStream(resolve('dist/client.bundle.js'))

    let acceptEncoding = req.headers['accept-encoding'] as string
    if (!acceptEncoding) {
      acceptEncoding = ''
    }

    // deflate
    if (acceptEncoding.match(/\bdeflate\b/)) {
      res.writeHead(200, { 'content-encoding': 'deflate' })
      raw.pipe(createDeflate()).pipe(res)
    }
    // gzip
    else if (acceptEncoding.match(/\bgzip\b/)) {
      res.writeHead(200, { 'content-encoding': 'gzip' })
      raw.pipe(createGzip()).pipe(res)
    }
    // no compression
    else {
      res.writeHead(200, {})
      raw.pipe(res)
    }

    return
  }

  // serve index.html
  if (req.url === '/' || req.url === 'index.html') {
    res.setHeader('Content-Type', 'text/html')
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <div id="root">${renderSSR(Hello)}</div>
          <script src="/bundle.js"></script>
        </body>
      </html>`)
    return
  }

  // serve 404
  res.statusCode = 404
  res.end('404')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
