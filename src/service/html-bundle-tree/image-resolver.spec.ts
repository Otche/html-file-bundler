import { loadImg, replaceImg } from './image-resolver'

/**
 *
 *
 */
jest.mock('../image-loader', () => ({
  __esModule: true,
  /**
   *
   */
  loadFileImg: jest.fn((path: string) => {
    if (path.endsWith('.svg')) return Promise.resolve('<svg></svg>')
    if (
      path.endsWith('.png') ||
      path.endsWith('.jpg') ||
      path.endsWith('.jpeg')
    )
      return Promise.resolve('test')
    throw new Error('Mock Error')
  }),
  /**
   *
   */
  loadHttpImg: jest.fn((uri: string) => {
    if (!uri.startsWith('http://') && !uri.startsWith('https://'))
      return Promise.reject('Invalid URI')
    if (uri.endsWith('.svg')) return Promise.resolve('<svg></svg>')
    if (uri.endsWith('.png') || uri.endsWith('.jpg') || uri.endsWith('.jpeg'))
      return Promise.resolve('test')
    throw new Error('Mock Error')
  }),
}))

/**
 *
 */
describe('Image-resolver', () => {
  //
  test('Should loadImg from uri', async () => {
    expect(await loadImg('/dirname', 'http://test.com/test.svg')).toEqual(
      '<svg></svg>'
    )

    expect(await loadImg('/dirname', 'http://test.com/test.png')).toEqual(
      'test'
    )

    expect(await loadImg('/dirname', 'test.jpeg')).toEqual('test')
    expect(await loadImg('/dirname', 'test.svg')).toEqual('<svg></svg>')
  })
  //
  test('loadImg should throw error', async () => {
    expect(() => loadImg('/dirname', 'test')).rejects.toThrow('Mock Error')
    expect(() => loadImg('/dirname', 'http://test.com/test')).rejects.toThrow(
      'Mock Error'
    )
    expect(() =>
      loadImg('/dirname', 'http://test.com/test.txt')
    ).rejects.toThrow('Mock Error')
  })
  //
  test('Should replaceImg in string', async () => {
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
})
