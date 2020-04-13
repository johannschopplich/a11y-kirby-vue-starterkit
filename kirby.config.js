const path = require('path')
const php = require('node-php-server')
const del = require('del')

const baseDir = path.join(__dirname, 'public')

module.exports = {
  devApi: 'http://127.0.0.1:8080',
  prodApi: '',
  host: '127.0.0.1',
  port: 8080,
  baseDir: baseDir,
  routerPath: path.join(__dirname, 'server.php'),

  clean: async () => {
    const deletedFiles = await del([`${baseDir}/{js,css}`, `${baseDir}/*.js`])
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
