const url = (process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BACKEND_URL : window.location.origin) + process.env.BASE_URL

export default {
  async getPage (id) {
    const resp = await fetch(`${url}${id}?content=json`)
    const json = await resp.json()
    if (process.env.NODE_ENV === 'development') console.log(json)
    return json
  }
}
