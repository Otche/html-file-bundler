import { HtmlBundleTree } from './html-bundle-tree'
import { HTML_MOCK } from './mocks/html-mock'
import { mockLoadFileImg, mockLoadHttpImg } from './mocks/load-files.mock'

jest.mock('axios', () => {
  return {
    get: jest.fn(() => {
      return Promise.resolve({
        data: 'h1 { background-color : red;}  body { background: url(./img.jpg); }',
      })
    }),
  }
})

jest.mock('fs/promises', () => {
  return {
    readFile: jest.fn(() => {
      return Promise.resolve(
        'h1 { background-color : green;} body { background: url(http://example.com/img.jpg); } '
      )
    }),
  }
})

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

describe('HtmlBundleTree', () => {
  let htmlBundleTree: HtmlBundleTree
  beforeAll(() => {
    htmlBundleTree = new HtmlBundleTree(HTML_MOCK.input, 'dirname')
  })
  test('should get input data as first bundled html string ', () => {
    expect(htmlBundleTree.getBundledHtmlStr()).toBe(HTML_MOCK.input)
  })

  test('should replace src image with base64 data ', async () => {
    await htmlBundleTree.resolveImgsSrc()
    expect(htmlBundleTree.getBundledHtmlStr().replace(/\s/g, '')).toBe(
      HTML_MOCK.resolve_src_images_snapshot.replace(/\s/g, '')
    )
  })

  test('should replace style url images with base64 data ', async () => {
    await htmlBundleTree.resolveStyleImgsUrl()
    expect(htmlBundleTree.getBundledHtmlStr().replace(/\s/g, '')).toBe(
      HTML_MOCK.resolve_all_imgs_snapshot.replace(/\s/g, '')
    )
  })

  test('should styles and here url images with base64', async () => {
    await htmlBundleTree.resolveStylesheetLinks()
    expect(htmlBundleTree.getBundledHtmlStr().replace(/\s/g, '')).toBe(
      HTML_MOCK.resolve_all_snapshot.replace(/\s/g, '')
    )
  })

  test('should html bundle tree return string parsed data', () => {
    const htmlBundleData = JSON.parse(htmlBundleTree.toString())
    expect(htmlBundleData.htmlImgsSrc.length).toBe(2)
    expect(htmlBundleData.htmlStyleImgsUrl.length).toBe(2)
    expect(htmlBundleData.htmlStylesheetLink.length).toBe(3)
    expect(htmlBundleData.htmlOutputStr.replace(/\s/g, '')).toBe(
      HTML_MOCK.resolve_all_snapshot.replace(/\s/g, '')
    )
  })
})
