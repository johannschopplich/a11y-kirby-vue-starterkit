const php = require('node-php-server')

module.exports = {
  devApi: 'http://127.0.0.1:8000',
  prodApi: '',
  host: '127.0.0.1',
  port: 8000,
  baseDir: '../public',
  routerPath: '../cliserver.php',

  serveBackend: () => {
    php.createServer({
      hostname: module.exports.host,
      port: module.exports.port,
      base: module.exports.baseDir,
      router: module.exports.routerPath
    })

    console.log(`Backend running at: http://${module.exports.host}:${module.exports.port}`)
  }
}
