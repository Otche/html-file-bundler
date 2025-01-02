import { CSSBundlerTree } from './css-bundler-tree'
import { mockLoadFileImg, mockLoadHttpImg } from './mocks/load-files.mock'

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
  test('should resolve style images url', async () => {
    const cssStr = `body { background: url(http://example.com/img.jpg);} h1 {background: url(test/img.svg);}`
    const cssBundlerTree = new CSSBundlerTree(cssStr, '/dirname')
    await cssBundlerTree.resolveStyleImgUrl()
    expect(cssBundlerTree.getBundledCssStr()).toBe(
      'body { background: url("data:image/jpg;base64,==AAAAAABB==");} h1 {background: url("data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E");}'
    )
  })
})
