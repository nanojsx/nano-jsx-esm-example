import { h } from 'nano-jsx/esm/index.js'

export const Hello = () => {
  const isBrowser = typeof window !== 'undefined'

  return (
    <div>
      <h1>Hello from {isBrowser ? 'Browser' : 'Server'}</h1>
    </div>
  )
}
