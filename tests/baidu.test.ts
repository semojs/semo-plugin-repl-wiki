import { getWikiLink, getWiki } from '../src/common/baidu'

test('baidu: getWikiLink', async () => {
  const link = await getWikiLink('php')
  expect(link).toBe('http://baike.baidu.com/item/PHP/9337')
})

test('baidu: getWiki', async () => {
  const wiki = await getWiki('php')
  expect(wiki).not.toBeUndefined()
  expect(wiki).toContain('PHP')
})