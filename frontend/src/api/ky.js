import Ky from 'ky'

// const token = localStorage.getItem('jwt')

const ky = Ky.extend({
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set('X-Requested-With', 'ky')
        // if (token) request.headers.set('Authorization', `Bearer ${token}`)
      }
    ]
  }
})

export default ky
