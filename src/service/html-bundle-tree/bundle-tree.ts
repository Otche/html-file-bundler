import { loadImg, replaceImg } from './image-resolver'
import { BundleTreeResolver } from './type'

export abstract class BundleTree {
  static async resolveImg(
    outputStr: string,
    dirname: string,
    imgs: BundleTreeResolver[],
    decorate = ''
  ) {
    for (const img of imgs) {
      img.data = await loadImg(dirname, img[1])
      //console.log('img.data:', img.data)
      outputStr = await replaceImg(outputStr, img[1], img.data, decorate)
    }
    return outputStr
  }
}
