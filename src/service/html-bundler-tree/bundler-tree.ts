import path from 'path'
import { loadImg } from './image-resolver'
import { base64BinImagePrefix } from '@/utils/constant'
import { isBinImgName } from '@/utils/ressource-path'
import { BundlerTreeResolution } from './type'
import { svg64 } from 'svg64'

export abstract class BundlerTree {
  static async resolveImg(
    outputStr: string,
    dirname: string,
    imgs: BundlerTreeResolution[]
  ) {
    for (const img of imgs) {
      const regExpMatch = img[0]
      const imgSrc = img[1]

      img.data = await loadImg(dirname, img[1])

      const extName = path.extname(imgSrc).slice(1)
      const bundledImgLitteral = isBinImgName(imgSrc)
        ? base64BinImagePrefix(extName) + img.data
        : svg64(img.data)

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
