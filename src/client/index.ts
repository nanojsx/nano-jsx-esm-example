import { render } from 'nano-jsx/esm/index.js'
import { Hello } from '../common/Hello.js'

const root = document.getElementById('root')

const hello = render(Hello)

root?.append(hello)
