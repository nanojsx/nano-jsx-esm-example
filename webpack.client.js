import path from 'path'
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin'

export default {
  mode: 'production',
  entry: './src/client/index.js',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve('dist')
  },
  resolve: {
    plugins: [new ResolveTypeScriptPlugin()]
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
  }
}
