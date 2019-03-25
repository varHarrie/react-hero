module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader')
  })

  config.resolve.extensions.push('.js', '.ts', '.tsx')
  config.resolve.symlinks = false

  return config
}
