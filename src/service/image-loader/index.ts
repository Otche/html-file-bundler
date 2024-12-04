import { UTF8 } from '@/utils/constant'
import { isBinImgName, isSvgImgName } from '@/utils/ressource-path'
import axios from 'axios'
import fs from 'fs/promises'

/**
 *
 * @param imgUri
 * @returns
 */
export const loadHttpImg = async (imgUri: string) => {
  const resp = await axios.get(imgUri)
  if (isSvgImgName(imgUri)) {
    return resp.data as string
  }

  if (isBinImgName(imgUri)) {
    return Buffer.from(resp.data).toString('base64')
  }

  throw new Error('Invalid image uri')
}
/**
 *
 * @param imgPath
 * @returns
 */
export const loadFileImg = async (imgPath: string) => {
  if (isSvgImgName(imgPath)) {
    const data = await fs.readFile(imgPath, UTF8)
    return data
  }

  if (isBinImgName(imgPath)) {
    const data = await fs.readFile(imgPath)
    return Buffer.from(data).toString('base64')
  }

  throw new Error('Invalid image path')
}
