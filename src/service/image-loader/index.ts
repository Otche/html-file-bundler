import axios from 'axios'
import fs from 'fs/promises'
/**
 *
 * @param imgUri
 * @returns
 */
export const decodeHttpImg = async (imgUri: string) => {
  if (!imgUri.startsWith('http://') && !imgUri.startsWith('https://'))
    throw new Error('Invalid http uri')

  const data = await axios.get(imgUri)
  if (imgUri.endsWith('.svg')) {
    return data.data
  }

  if (
    imgUri.endsWith('.png') ||
    imgUri.endsWith('.jpg') ||
    imgUri.endsWith('.jpeg')
  ) {
    return Buffer.from(data.data, 'binary').toString('base64')
  }

  throw new Error('Invalid image uri')
}
/**
 *
 * @param imgPath
 * @returns
 */
export const decodeFileImg = async (imgPath: string) => {
  const data = await fs.readFile(imgPath, 'utf8')
  if (imgPath.endsWith('.svg')) {
    return data
  }

  if (
    imgPath.endsWith('.png') ||
    imgPath.endsWith('.jpg') ||
    imgPath.endsWith('.jpeg')
  ) {
    return Buffer.from(data, 'binary').toString('base64')
  }

  throw new Error('Invalid image path')
}
