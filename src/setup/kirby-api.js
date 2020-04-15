let apiUrl

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
  init: url => {
    apiUrl = url

    return {
      getPage
    }
  }
}
