import { loadImg, replaceImg } from './image-resolver'
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
  test('should replace image in string', async () => {
    expect(
      await replaceImg('test <img src="test.svg" />', 'test.svg', '<svg></svg>')
    ).toBe('test <img src="data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E" />')

    expect(
      await replaceImg('test <img src="test.png" />', 'test.png', 'test')
    ).toBe('test <img src="data:image/png;base64,test" />')

    expect(
      await replaceImg(
        'test <style> .h1 {  background: url(./circle_icon-icons.com_64234.svg);}</style>',
        './circle_icon-icons.com_64234.svg',
        'test',
        '"'
      )
    ).toBe(
      'test <style> .h1 {  background: url("data:image/svg+xml;utf8,test");}</style>'
    )
  })

  test('should throw error', async () => {
    expect(() =>
      replaceImg('test <img src="test.txt" />', 'test.txt', 'test')
    ).rejects.toThrow('Invalid image type')
  })
})
