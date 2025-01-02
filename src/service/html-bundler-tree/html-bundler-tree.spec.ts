import { HtmlBundlerTree } from './html-bundler-tree'
import { HTML_MOCK } from './mocks/html.mock'
import { mockLoadFileImg, mockLoadHttpImg } from './mocks/load-files.mock'

jest.mock('axios', () => {
  return {
    get: jest.fn(() => {
      return Promise.resolve({
        data: 'h1 { background-color : red;}  body { background: url(./img.png); }',
      })
    }),
  }
})

jest.mock('fs/promises', () => {
  return {
    readFile: jest.fn(() => {
      return Promise.resolve(
        'h1 { background-color : green;} body { background: url(http://example.com/img.png); } '
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

describe('HtmlBundleTree steps', () => {
  let htmlBundlerTree: HtmlBundlerTree
  beforeAll(() => {
    htmlBundlerTree = new HtmlBundlerTree(HTML_MOCK.input, 'dirname')
  })
  test('should get input data as first bundled html string ', () => {
    expect(htmlBundlerTree.getBundledHtmlStr()).toBe(HTML_MOCK.input)
  })

  test('should replace src image with base64 data ', async () => {
    await htmlBundlerTree.resolveImgsSrc()
    expect(htmlBundlerTree.getBundledHtmlStr().replace(/\s/g, '')).toBe(
      HTML_MOCK.resolve_src_images_snapshot.replace(/\s/g, '')
    )
  })

  test('should replace style url images with base64 data ', async () => {
    await htmlBundlerTree.resolveStyleImgsUrl()
    expect(htmlBundlerTree.getBundledHtmlStr().replace(/\s/g, '')).toBe(
      HTML_MOCK.resolve_all_imgs_snapshot.replace(/\s/g, '')
    )
  })

  test('should styles and here url images with base64', async () => {
    await htmlBundlerTree.resolveStylesheetLinks()
    expect(htmlBundlerTree.getBundledHtmlStr().replace(/\s/g, '')).toBe(
      HTML_MOCK.resolve_all_snapshot.replace(/\s/g, '')
    )
  })

  test('should html bundle tree return string parsed data', () => {
    const htmlBundleData = JSON.parse(htmlBundlerTree.toString())
    expect(htmlBundleData.htmlImgsSrc.length).toBe(2)
    expect(htmlBundleData.htmlStyleImgsUrl.length).toBe(2)
    expect(htmlBundleData.htmlStylesheetLink.length).toBe(3)
    expect(htmlBundleData.htmlOutputStr.replace(/\s/g, '')).toBe(
      HTML_MOCK.resolve_all_snapshot.replace(/\s/g, '')
    )
  })
})

describe('HtmlBundleTree resolve all', () => {
  let htmlBundlerTree: HtmlBundlerTree
  beforeAll(() => {
    htmlBundlerTree = new HtmlBundlerTree(HTML_MOCK.input, 'dirname')
  })

  test('should get input data as first bundled html string ', () => {
    expect(htmlBundlerTree.getBundledHtmlStr()).toBe(HTML_MOCK.input)
  })

  test('should resolve all', async () => {
    const htmlOutputStr = await htmlBundlerTree.resolve()
    expect(htmlOutputStr.replace(/\s/g, '')).toBe(
      HTML_MOCK.resolve_all_snapshot.replace(/\s/g, '')
    )
  })
})
