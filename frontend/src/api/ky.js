import Ky from 'ky'

const ky = Ky.extend({
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set('X-Requested-With', 'ky')
      }
    ]
  }
})

export default ky
