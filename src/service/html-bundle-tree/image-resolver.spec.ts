import { loadImg } from './image-resolver'
import { mockLoadFileImg, mockLoadHttpImg } from './mocks/load-files.mock'

/**
 *
 *
 */
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

/**
 *
 */
describe('Image resolver', () => {
  //
  test('should load image from uri', async () => {
    expect(await loadImg('/dirname', 'http://test.com/test.svg')).toEqual(
      '<svg></svg>'
    )

    expect(await loadImg('/dirname', 'http://test.com/test.png')).toEqual(
      '==AAAAAABB=='
    )

    expect(await loadImg('/dirname', 'test.jpeg')).toEqual('==AAABB==')
    expect(await loadImg('/dirname', 'test.svg')).toEqual('<svg></svg>')
  })
  //
  test('should load image throw error', async () => {
    expect(() => loadImg('/dirname', 'test')).rejects.toThrow('Mock Error')
    expect(() => loadImg('/dirname', 'http://test.com/test')).rejects.toThrow(
      'Mock Error'
    )
    expect(() =>
      loadImg('/dirname', 'http://test.com/test.txt')
    ).rejects.toThrow('Mock Error')
  })
  //
})
