// Trim trailing slash from api URL
const apiUrl = process.env.VUE_APP_API_URL || (window.location.origin + process.env.BASE_URL).slice(0, -1)

const getPage = async id => {
  const resp = await fetch(`${apiUrl}/${id}.json`)
  const page = await resp.json()
  if (process.env.NODE_ENV === 'development') {
    console.log(`${apiUrl}/${id}.json`)
    console.log(page)
  }

  return page
}

export default {
  init: () => {
    return {
      getPage
    }
  }
}
