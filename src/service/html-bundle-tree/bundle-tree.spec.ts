import { BundleTree } from './bundle-tree'
import { HTML_RESOLVE_IMAGE, mockLoadFileImg, mockLoadHttpImg } from './mock'
import { BundleTreeResolver } from './type'

const resolveMock: BundleTreeResolver[] = [
  {
    0: 'url(http://example.com/img.jpg)',
    1: 'http://example.com/img.jpg',
  },
  {
    0: 'url(test/img.svg)',
    1: 'test/img.svg',
  },
  {
    0: '<img src="http://example.com/img.png" />',
    1: 'http://example.com/img.png',
  },
  {
    0: '<img src="/test/img.svg" />',
    1: '/test/img.svg',
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
  test('should resolve image', async () => {
    const htmlOutput = await BundleTree.resolveImg(
      HTML_RESOLVE_IMAGE.input,
      '/dirname',
      resolveMock
    )
    expect(htmlOutput.replace(/\s/g, '')).toBe(
      HTML_RESOLVE_IMAGE.snapshot.replace(/\s/g, '')
    )
  })
})
