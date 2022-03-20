const path = require('path')
const ResolveTypeScriptPlugin = require('resolve-typescript-plugin')

module.exports = {
  mode: 'production',
  entry: './src/client/index.js',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    plugins: [new ResolveTypeScriptPlugin()]
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
  }
}
