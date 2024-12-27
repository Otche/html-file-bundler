import path from 'path'
import { loadImg } from './image-resolver'
import { BundleTreeResolver } from './type'
import { base64Prefix, SVG_PREFIX_STR } from '@/utils/constant'
import { isBinImgName } from '@/utils/ressource-path'

export abstract class BundleTree {
  static async resolveImg(
    outputStr: string,
    dirname: string,
    imgs: BundleTreeResolver[]
  ) {
    for (const img of imgs) {
      const regExpMatch = img[0]
      const imgSrc = img[1]

      img.data = await loadImg(dirname, img[1])

      const extName = path.extname(imgSrc).slice(1)
      const bundledImgLitteral = isBinImgName(imgSrc)
        ? base64Prefix(extName) + img.data
        : SVG_PREFIX_STR + encodeURI(img.data)

      if (regExpMatch.startsWith('url(')) {
        outputStr = outputStr.replace(
          regExpMatch,
          `url("${bundledImgLitteral}")`
        )
      } else {
        outputStr = outputStr.replace(imgSrc, `${bundledImgLitteral}`)
      }
    }

    return outputStr
  }
}
