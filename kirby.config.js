const php = require('node-php-server')
const path = require('path')

module.exports = {
  devApi: 'http://127.0.0.1:8080',
  prodApi: '',
  host: '127.0.0.1',
  port: 8080,
  baseDir: path.join(__dirname, 'public'),
  routerPath: path.join(__dirname, 'server.php'),

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
