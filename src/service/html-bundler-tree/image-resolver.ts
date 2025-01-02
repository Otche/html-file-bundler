import { isHttpUriName } from '@/utils/ressource-path'

import path from 'path'
import { loadFileImg, loadHttpImg } from '../image-loader'

/**
 *
 * @param dirname
 * @param imgSrc
 * @returns
 */
export const loadImg = async (dirname: string, imgSrc: string) => {
  if (isHttpUriName(imgSrc)) {
    return await loadHttpImg(imgSrc)
  }
  //
  if (path.isAbsolute(imgSrc)) return await loadFileImg(imgSrc)
  const imgPath = path.resolve(dirname, imgSrc)
  return await loadFileImg(imgPath)
}
