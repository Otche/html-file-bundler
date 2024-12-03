import { decodeFileImg, decodeHttpImg } from '.'

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

describe('image loader', () => {
  /**
   *
   */
  test('should decodeHttpImg', async () => {
    const svg = await decodeHttpImg('http://test.com/test.svg')
    expect(svg).toBe('test')
    const png = await decodeHttpImg('http://test.com/test.png')
    expect(png).toBe('dGVzdA==')
    const jpg = await decodeHttpImg('http://test.com/test.jpg')
    expect(jpg).toBe('dGVzdA==')
    const jpeg = await decodeHttpImg('http://test.com/test.jpeg')
    expect(jpeg).toBe('dGVzdA==')
  })
  /**
   *
   */
  test('should decodeHttpImg throw error', async () => {
    expect(() => decodeHttpImg('http://test.com/test.txt')).rejects.toThrow(
      'Invalid image uri'
    )

    expect(() => decodeHttpImg('file://test.com/test.txt')).rejects.toThrow(
      'Invalid http uri'
    )
  })
  /**
   *
   */
  test('should decodeFileImg', async () => {
    const svg = await decodeFileImg('/test/test.svg')
    expect(svg).toBe('test')
    const png = await decodeFileImg('/test/test.png')
    expect(png).toBe('dGVzdA==')
    const jpg = await decodeFileImg('/testtest.jpg')
    expect(jpg).toBe('dGVzdA==')
    const jpeg = await decodeFileImg('/test/test.jpeg')
    expect(jpeg).toBe('dGVzdA==')
  })

  /**
   *
   */
  test('should decodeFileImg throw error', async () => {
    expect(() => decodeFileImg('/test/test.txt')).rejects.toThrow(
      'Invalid image path'
    )
  })
})
