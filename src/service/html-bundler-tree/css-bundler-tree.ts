import { STYLE_URL_REGEXP } from '@/utils/constant'
import { regExpExecArray } from '@/utils/string'
import { BundlerTreeResolution } from './type'
import { BundlerTree } from './bundler-tree'

/**
 *
 */
export class CSSBundlerTree extends BundlerTree {
  private readonly styleImgsUrl: BundlerTreeResolution[]
  private styleOutputStr: string

  /**
   *
   * @param cssInputStr
   * @param dirname
   */
  constructor(
    private readonly cssInputStr: string,
    private readonly dirname: string
  ) {
    super()
    this.styleImgsUrl = Array.from(
      regExpExecArray(this.cssInputStr, STYLE_URL_REGEXP)
    )
    this.styleOutputStr = this.cssInputStr
  }

  /**
   *
   */
  async resolveStyleImgUrl() {
    this.styleOutputStr = await CSSBundlerTree.resolveImg(
      this.styleOutputStr,
      this.dirname,
      this.styleImgsUrl
    )
  }

  /**
   *
   * @returns
   */
  public getBundledCssStr(): string {
    return this.styleOutputStr
  }
}
