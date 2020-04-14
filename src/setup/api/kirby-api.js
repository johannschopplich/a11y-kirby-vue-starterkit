import modifyPageHtml from './modify-page-html'

let apiUrl

const getPage = async id => {
  const resp = await fetch(`${apiUrl}/${id}?content=json`)
  const page = await resp.json()
  if (process.env.NODE_ENV === 'development') console.log(page)

  modifyPageHtml(page, document, html => {
    // Fix relative links
    for (const a of html.getElementsByTagName('a')) {
      a.href = a.href.replace(apiUrl, process.env.BASE_URL.slice(0, -1))
    }
  })

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
