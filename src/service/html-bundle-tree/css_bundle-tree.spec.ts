import { CSSBundleTree } from './css_bundle-tree'
import { mockLoadFileImg, mockLoadHttpImg } from './mock'

jest.mock('../image-loader', () => ({
  __esModule: true,
  /**
   *
   */
  loadFileImg: (path: string) => mockLoadFileImg(path),
  /**
   *
   */
  loadHttpImg: (uri: string) => mockLoadHttpImg(uri),
}))

describe('CSSBundleTree', () => {
  test('resolveStyleImgUrl', async () => {
    const cssStr = `body { background: url(http://example.com/img.jpg);} h1 {background: url(test/img.svg);}`
    const cssBundleTree = new CSSBundleTree(cssStr, '/dirname')
    await cssBundleTree.resolveStyleImgUrl()
    expect(cssBundleTree.getBundledCssStr()).toBe(
      'body { background: url(http://example.com/img.jpg);} h1 {background: url("data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E");}'
    )
  })
})
