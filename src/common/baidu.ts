import got from 'got'
// import axios from 'axios'
import cheerio from 'cheerio'

export const getWikiLink = async (word: string) => {
  try {
    const url = `https://baike.baidu.com/search?word=${word}&pn=0&rn=0&enc=utf8`
    const response = await got.get(url)
    let html = response.body
    const $ = cheerio.load(html)
    const link = $('dl.search-list dd a').first().attr('href')
    return link
  } catch (e) {
    console.log(e.message)
    return
  }
}

export const getWiki = async (word: string) => {
  let link = await getWikiLink(word)
  if (link && link.indexOf('https') !== 0) {
    link = link.replace('http', 'https')
  }

  try {
    const response = await got.get(link, {
      headers: {
        'Accept-Encoding': 'identity' // disable gzip
      }
    })
    let html = response.body
    const $ = cheerio.load(html)
    $('div.lemma-summary sup').remove()
    const wiki = $('div.lemma-summary').text()
    return wiki
  } catch (e) {
    console.log(e.message)
    return
  }
}