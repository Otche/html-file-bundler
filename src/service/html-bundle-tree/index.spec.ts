import { HtmlBundleTree, CSSBundleTree } from './index'

describe('should export css and html bundler', () => {
  test('should export the HtmlBundleTree class', () => {
    expect(HtmlBundleTree).toBeDefined()
  })

  test('should export the HtmlBundleTree class', () => {
    expect(CSSBundleTree).toBeDefined()
  })
})
