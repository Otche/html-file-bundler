import { isBinImgName, isSvgImgName } from '.'

describe('Ressource path utils', () => {
  test('should isBinImgName check', async () => {
    expect(isBinImgName('./test/test.png')).toBe(true)
    expect(isBinImgName('/test/test.jpeg')).toBe(true)
    expect(isBinImgName('http:///test.jpg')).toBe(true)
    expect(isBinImgName('https://test/test.txt')).toBe(false)
  })

  test('should isSvgImgName check', async () => {
    expect(isSvgImgName('./test/test.svg')).toBe(true)
    expect(isSvgImgName('/test/test.svg')).toBe(true)
    expect(isSvgImgName('http:///test.svg')).toBe(true)
    expect(isSvgImgName('https://test/test.svg')).toBe(true)
  })
})
