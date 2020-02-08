import ky from './ky'

export default class KirbyApi {
  constructor () {
    this.baseUrl = window.location.origin
  }

  async get (page) {
    // Site data is already available in production environment
    if (page === 'site' && window.$site) return window.$site

    const json = await ky.get(`${this.baseUrl}/${page}.json`).json()
    if (process.env.NODE_ENV === 'development') console.log(json)
    return json
  }
}
