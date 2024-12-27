import { BundleTree } from './bundle-tree'
import { HTML_MOCK } from './mocks/html.mock'
import { mockLoadFileImg, mockLoadHttpImg } from './mocks/load-files.mock'
import { BundleTreeResolver } from './type'

const resolve_src_mock: BundleTreeResolver[] = [
  {
    0: '<img src="http://example.com/img.png" />',
    1: 'http://example.com/img.png',
  },
  {
    0: '<img src="/test/img.svg" />',
    1: '/test/img.svg',
  },
] as unknown as BundleTreeResolver[]

const resolve_style_url_img_mock: BundleTreeResolver[] = [
  {
    0: 'url(http://example.com/img.jpg)',
    1: 'http://example.com/img.jpg',
  },
  {
    0: 'url(test/img.svg)',
    1: 'test/img.svg',
  },
] as unknown as BundleTreeResolver[]

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

describe('BundleTree', () => {
  test('should resolve src images', async () => {
    const htmlOutput = await BundleTree.resolveImg(
      HTML_MOCK.input,
      '/dirname',
      resolve_src_mock
    )
    expect(htmlOutput.replace(/\s/g, '')).toBe(
      HTML_MOCK.resolve_src_images_snapshot.replace(/\s/g, '')
    )
  })

  test('should resolve style url images', async () => {
    const htmlOutput = await BundleTree.resolveImg(
      HTML_MOCK.input,
      '/dirname',
      resolve_style_url_img_mock,
      '"'
    )
    expect(htmlOutput.replace(/\s/g, '')).toBe(
      HTML_MOCK.resolve_styles_url_images_snapshot.replace(/\s/g, '')
    )
  })
})
