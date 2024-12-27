import {
  isBinImgName,
  isHttpUriName,
  isSvgImgName,
} from '@/utils/ressource-path'

import path from 'path'
import { base64Prefix, SVG_PREFIX_STR } from '@/utils/constant'
import { loadFileImg, loadHttpImg } from '../image-loader'

const removeUrlQuotes = (url: string) => {
  return (url.startsWith('"') && url.endsWith('"')) ||
    (url.startsWith("'") && url.endsWith("'"))
    ? url.slice(1, -1)
    : url
}

/**
 *
 * @param dirname
 * @param imgSrc
 * @returns
 */
export const loadImg = async (dirname: string, imgSrc: string) => {
  if (isHttpUriName(removeUrlQuotes(imgSrc))) {
    return await loadHttpImg(removeUrlQuotes(imgSrc))
  }
  //
  if (path.isAbsolute(imgSrc)) return await loadFileImg(imgSrc)
  const imgPath = path.resolve(dirname, removeUrlQuotes(imgSrc))
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
  const imgPathWithoutQuotes = removeUrlQuotes(imgSrc)
  const extName = path.extname(imgPathWithoutQuotes).slice(1)
  if (isBinImgName(imgPathWithoutQuotes)) {
    const b64Literal = decorate + base64Prefix(extName) + data + decorate

    return str.replace(imgSrc, b64Literal)
  }
  //
  if (isSvgImgName(imgPathWithoutQuotes)) {
    const svgLiteral = `${decorate}${SVG_PREFIX_STR}${encodeURI(data)}${decorate}`
    return str.replace(imgSrc, svgLiteral)
  }
  //
  throw new Error(`unsuported ${imgSrc} must be svg or png or jpg or jpeg`)
}
