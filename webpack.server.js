import path from 'path'
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin'
import nodeExternals from 'webpack-node-externals'

// see: https://github.com/nrwl/nx/issues/7872#issuecomment-997460397
export default {
  mode: 'production',
  entry: './src/server/index.js',
  externalsPresets: {
    node: true
  },
  output: {
    filename: 'server.bundle.js',
    path: path.resolve('dist'),
    chunkFormat: 'module',
    module: true,
    environment: {
      dynamicImport: true,
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
