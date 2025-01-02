import { HtmlBundlerTree, CSSBundlerTree } from './index'

describe('should export css and html bundler', () => {
  test('should export the HtmlBundleTree class', () => {
    expect(HtmlBundlerTree).toBeDefined()
  })

  test('should export the HtmlBundleTree class', () => {
    expect(CSSBundlerTree).toBeDefined()
  })
})
