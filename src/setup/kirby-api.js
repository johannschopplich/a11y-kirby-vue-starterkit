// Trim trailing slash from api URL
const apiUrl = (window.location.origin + process.env.BASE_URL).slice(0, -1)

const getPage = async id => {
  if (process.env.NODE_ENV === 'development') console.log(`${apiUrl}/${id}.json`)
  const resp = await fetch(`${apiUrl}/${id}.json`)
  const page = await resp.json()
  if (process.env.NODE_ENV === 'development') console.log(page)

  return page
}

export default {
  init: () => {
    return {
      getPage
    }
  }
}
