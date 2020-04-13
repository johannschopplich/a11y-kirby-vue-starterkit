import modifyPageHtml from './modify-page-html'

let baseUrl

const getPage = async id => {
  const resp = await fetch(`${baseUrl}/${id}?content=json`)
  const page = await resp.json()
  if (process.env.NODE_ENV === 'development') console.log(page)

  modifyPageHtml(page, document, html => {
    // Fix relative links
    for (const a of html.getElementsByTagName('a')) {
      a.href = a.href.replace(baseUrl, process.env.BASE_URL.slice(0, -1))
    }
  })

  return page
}

export default {
  init: url => {
    baseUrl = url

    return {
      getPage
    }
  }
}
