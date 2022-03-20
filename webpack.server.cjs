const path = require('path')
const ResolveTypeScriptPlugin = require('resolve-typescript-plugin')
const nodeExternals = require('webpack-node-externals')

// see: https://github.com/nrwl/nx/issues/7872#issuecomment-997460397
module.exports = {
  mode: 'production',
  entry: './src/server/index.js',
  externalsPresets: {
    node: true
  },
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    module: true,
    libraryTarget: 'module',
    chunkFormat: 'module',
    library: {
      type: 'module'
    },
    environment: {
      module: true
    }
  },
  resolve: {
    plugins: [new ResolveTypeScriptPlugin()]
  },
  module: {
    rules: [{ test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' }]
  },
  experiments: {
    outputModule: true
  },
  externals: nodeExternals({
    importType: 'module'
  })
}
