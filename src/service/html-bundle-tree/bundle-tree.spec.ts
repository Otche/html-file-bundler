import { BundleTree } from './bundle-tree'
import { HTML_RESOLVE_IMAGE } from './mock'
import { BundleTreeResolver } from './type'

jest.mock('../image-loader', () => ({
  __esModule: true,
  /**
   *
   */
  loadFileImg: jest.fn((path: string) => {
    if (path.endsWith('.svg')) return Promise.resolve(`<svg></svg>`)
    if (
      path.endsWith('.png') ||
      path.endsWith('.jpg') ||
      path.endsWith('.jpeg')
    )
      return Promise.resolve(`==AAABB==`)
    throw new Error('Mock Error')
  }),
  /**
   *
   */
  loadHttpImg: jest.fn((uri: string) => {
    if (!uri.startsWith('http://') && !uri.startsWith('https://'))
      return Promise.reject('Invalid URI')
    if (uri.endsWith('.svg')) return Promise.resolve(`<svg></svg>`)
    if (uri.endsWith('.png') || uri.endsWith('.jpg') || uri.endsWith('.jpeg'))
      return Promise.resolve(`==AAAAAABB==`)
    throw new Error('Mock Error')
  }),
}))

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
