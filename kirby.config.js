const phpServer = require('php-server')
const del = require('del')

module.exports = {
  baseDir: 'public',
  publicPath: '/',
  apiUrl: '',
  devHostname: '127.0.0.1',
  devPort: 8080,
  devRouterPath: 'server.php',

  clean: async () => {
    const deletedFiles = await del('public/{css,js,*.js}')
    if (deletedFiles.length !== 0) console.info('Cleaned previous build assets:\n', deletedFiles.join('\n'))
  },

  serveBackend: async () => {
    const server = await phpServer({
      binary: 'php',
      port: module.exports.devPort,
      hostname: module.exports.devHostname,
      base: module.exports.baseDir,
      router: module.exports.devRouterPath
    })

    console.log(`Backend running at ${server.url}`)
  }
}
