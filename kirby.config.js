const php = require('node-php-server')
const del = require('del')

module.exports = {
  baseDir: 'public',
  publicPath: '/',
  apiUrl: '',
  devHost: '127.0.0.1',
  devPort: 8080,
  devRouterPath: '../server.php',

  clean: async () => {
    const deletedFiles = await del('public/{css,js,*.js}')
    if (deletedFiles.length !== 0) console.info('Cleaned previous build assets:\n', deletedFiles.join('\n'))
  },

  serveBackend: () => {
    php.createServer({
      hostname: module.exports.devHost,
      port: module.exports.devPort,
      base: module.exports.baseDir,
      router: module.exports.routerPath
    })

    console.info(`Backend running at: http://${module.exports.devHost}:${module.exports.devPort}`)
  }
}
