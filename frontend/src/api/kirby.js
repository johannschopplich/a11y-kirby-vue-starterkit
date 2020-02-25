import ky from './ky'

const url = window.location.origin + process.env.BASE_URL

export default {
  async getPage (pageUri) {
    const json = await ky.get(`${url}${pageUri}.json`).json()
    if (process.env.NODE_ENV === 'development') console.log(json)
    return json
  }
}
