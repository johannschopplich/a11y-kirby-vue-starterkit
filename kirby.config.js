const phpServer = require('php-server')

module.exports = {
  baseDir: 'public',
  indexPath: '../site/snippets/vue-index.php',
  hostname: '127.0.0.1',
  port: 8000,
  routerPath: 'server.php',

  start: () => async () => {
    // eslint-disable-next-line no-unused-vars
    const server = await phpServer({
      binary: 'php',
      hostname: module.exports.hostname,
      port: module.exports.port,
      base: `${module.exports.baseDir}/`,
      router: module.exports.routerPath
    })

    // console.log(`Backend running at ${server.url}`)
  }
}
