// import ky from './ky'

const url = window.location.origin + process.env.BASE_URL

export default {
  async getPage (pageUri) {
    const resp = await fetch(`${url}${pageUri}.json`)
    const json = await resp.json()
    if (process.env.NODE_ENV === 'development') console.log(json)
    return json
  }
}
