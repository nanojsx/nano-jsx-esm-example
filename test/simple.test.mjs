import puppeteer from 'puppeteer'
import { spawn } from 'child_process'

let child,
  browser,
  page,
  errors = 0
const PORT = 3000

// timeout
setTimeout(() => {
  console.log('error: timeout')
  process.exit(2)
}, 10_000)

const wait = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

const killChildProcess = () => {
  return new Promise(resolve => {
    child.on('close', code => {
      // console.log(`child process exited with code ${code}`)
      return resolve()
    })
    child.kill()
  })
}

const main = async () => {
  console.log('start node.js server')
  child = spawn('node', ['--experimental-specifier-resolution=node', 'dist/server.bundle.js'], {
    stdio: 'inherit',
    shell: false,
    env: { ...process.env, PORT }
  })

  await wait(1000)

  console.log('launch browser')
  browser = await puppeteer.launch()
  page = await browser.newPage()

  console.log('goto website')
  await page.goto(`http://127.0.0.1:${PORT}/`, {
    waitUntil: 'networkidle2'
  })

  // await page.screenshot({ path: 'example.png' })

  const h1 = await page.evaluate(() => {
    const h1 = Array.from(document.querySelectorAll('h1'))
    return [h1[0].innerText, h1[1].innerText]
  })
  console.log('Heading1: ', h1)

  if (h1[0] !== 'Hello from Server') errors++
  if (h1[1] !== 'Hello from Browser') errors++

  await killChildProcess()
  await browser.close()

  console.log('errors: ', errors)
  if (errors !== 0) process.exit(1)
  else process.exit(0)
}

main()
