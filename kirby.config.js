const php = require('node-php-server')
const del = require('del')

module.exports = {
  prodApi: '',
  host: '127.0.0.1',
  port: 8080,
  baseDir: 'public',
  routerPath: '../server.php',
  publicPath: '/',

  clean: async () => {
    const deletedFiles = await del('public/{css,js,*.js}')
    if (deletedFiles.length !== 0) console.info('Cleaned previous build assets:\n', deletedFiles.join('\n'))
  },

  serveBackend: () => {
    php.createServer({
      hostname: module.exports.host,
      port: module.exports.port,
      base: module.exports.baseDir,
      router: module.exports.routerPath
    })

    console.info(`Backend running at: http://${module.exports.host}:${module.exports.port}`)
  }
}
