import { HtmlBundleTree } from './html-bundle-tree'
import {
  HTML_RESOLVE_IMAGE,
  mockLoadFileImg,
  mockLoadHttpImg,
} from './mocks/load-files.mock'

jest.mock('axios', () => {
  return {
    get: jest.fn(() => {
      return Promise.resolve({ data: 'h1 { background-color : green:}' })
    }),
  }
})

jest.mock('fs/promises', () => {
  return {
    readFile: jest.fn(() => {
      return Promise.resolve('h1 { background-color : green:}')
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
    htmlBundleTree = new HtmlBundleTree(HTML_RESOLVE_IMAGE.input, 'dirname')
  })
  test('should get input data as first bundled html string ', () => {
    expect(htmlBundleTree.getBundledHtmlStr()).toBe(HTML_RESOLVE_IMAGE.input)
  })
})
