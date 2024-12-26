import {
  isBinImgName,
  isHttpUriName,
  isSvgImgName,
} from '@/utils/ressource-path'

import path from 'path'
import { BASE64_PREFIX_STR, SVG_PREFIX_STR } from '@/utils/constant'
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
  const imgPath = path.isAbsolute(imgSrc)
    ? imgSrc
    : path.resolve(dirname, imgSrc)

  return await loadFileImg(imgPath)
}

/**
 *
 * @param str
 * @param imgSrc
 * @param data
 * @returns
 */
export const replaceImg = async (
  str: string,
  imgSrc: string,
  data: string,
  decorate = ''
) => {
  if (isBinImgName(imgSrc)) {
    const b64Literal = decorate + BASE64_PREFIX_STR + data + decorate
    //console.log('b64Literal:', b64Literal)
    return str.replace(imgSrc, b64Literal)
  }
  //
  if (isSvgImgName(imgSrc)) {
    const svgLiteral = `${decorate}${SVG_PREFIX_STR}${encodeURI(data)}${decorate}`
    return str.replace(imgSrc, svgLiteral)
  }
  //
  throw new Error('Invalid image type')
}
