import { loadFileImg, loadHttpImg } from '.'

jest.mock('axios', () => ({
  get: jest.fn(() => {
    return Promise.resolve({
      data: 'test',
      status: 200,
    })
  }),
}))

jest.mock('fs/promises', () => ({
  readFile: jest.fn((uri: string) => {
    return Promise.resolve('test')
  }),
}))

describe('Image loader', () => {
  /**
   *
   */
  test('should loadHttpImg', async () => {
    const svg = await loadHttpImg('http://test.com/test.svg')
    expect(svg).toBe('test')
    const png = await loadHttpImg('http://test.com/test.png')
    expect(png).toBe('dGVzdA==')
    const jpg = await loadHttpImg('http://test.com/test.jpg')
    expect(jpg).toBe('dGVzdA==')
    const jpeg = await loadHttpImg('http://test.com/test.jpeg')
    expect(jpeg).toBe('dGVzdA==')
  })
  /**
   *
   */
  test('should decodeHttpImg throw error', async () => {
    expect(() => loadHttpImg('http://test.com/test.txt')).rejects.toThrow(
      'Invalid image type http://test.com/test.txt must be svg or png or jpg or jpeg'
    )
  })
  /**
   *
   */
  test('should decodeFileImg', async () => {
    const svg = await loadFileImg('/test/test.svg')
    expect(svg).toBe('test')
    const png = await loadFileImg('/test/test.png')
    expect(png).toBe('dGVzdA==')
    const jpg = await loadFileImg('/testtest.jpg')
    expect(jpg).toBe('dGVzdA==')
    const jpeg = await loadFileImg('/test/test.jpeg')
    expect(jpeg).toBe('dGVzdA==')
  })

  /**
   *
   */
  test('should decodeFileImg throw error', async () => {
    expect(() => loadFileImg('/test/test.txt')).rejects.toThrow(
      'Invalid image type /test/test.txt must be svg or png or jpg or jpeg'
    )
  })
})
