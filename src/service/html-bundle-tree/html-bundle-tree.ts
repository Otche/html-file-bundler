import {
  IMG_REGEXP,
  LINK_STYLESHEET_REGEXP,
  STYLE_URL_REGEXP,
  UTF8,
} from '@/utils/constant'
import { regExpExecArray } from '@/utils/string'
import { isHttpUriName } from '@/utils/ressource-path'
import path from 'path'
import axios from 'axios'
import fs from 'fs/promises'
import { CSSBundleTree } from './css_bundle-tree'
import { BundleTreeResolver } from './type'
import { BundleTree } from './bundle-tree'

export class HtmlBundleTree extends BundleTree {
  /**
   *
   */
  private readonly htmlImgsSrc: BundleTreeResolver[]
  /**
   *
   */
  private readonly htmlStyleImgsUrl: BundleTreeResolver[]
  /**
   *
   */
  private readonly htmlStylesheetLink: BundleTreeResolver[]

  /**
   *
   */
  private htmlOutputStr: string

  /**
   *
   * @param htmlInputStr
   * @param dirname
   */
  constructor(
    private readonly htmlInputStr: string,
    private readonly dirname: string
  ) {
    super()
    this.htmlImgsSrc = Array.from(
      regExpExecArray(this.htmlInputStr, IMG_REGEXP)
    )
    this.htmlStyleImgsUrl = Array.from(
      regExpExecArray(this.htmlInputStr, STYLE_URL_REGEXP)
    )
    this.htmlStylesheetLink = Array.from(
      regExpExecArray(this.htmlInputStr, LINK_STYLESHEET_REGEXP)
    )
    this.htmlOutputStr = this.htmlInputStr
  }

  /**
   *
   *
   */
  async resolveImgSrc() {
    this.htmlOutputStr = await HtmlBundleTree.resolveImg(
      this.htmlOutputStr,
      this.dirname,
      this.htmlImgsSrc
    )
  }

  /**
   *
   *
   */
  async resolveStyleImgUrl() {
    this.htmlOutputStr = await HtmlBundleTree.resolveImg(
      this.htmlOutputStr,
      this.dirname,
      this.htmlStyleImgsUrl,
      '"'
    )
  }

  /**
   *
   */
  async resolveStylesheetLink() {
    for (const link of this.htmlStylesheetLink) {
      const linkSrc = link[1]
      let cssBundler: CSSBundleTree

      if (isHttpUriName(linkSrc)) {
        link.data = (await axios.get(linkSrc)).data
        cssBundler = new CSSBundleTree(link.data!, this.dirname)
      } else {
        const stylesheetPath = path.isAbsolute(linkSrc)
          ? linkSrc
          : path.resolve(this.dirname, linkSrc)

        link.data = (await fs.readFile(stylesheetPath, UTF8)).toString()
        cssBundler = new CSSBundleTree(link.data!, path.dirname(stylesheetPath))
      }

      await cssBundler.resolveStyleImgUrl()
      const cssOutputStr = cssBundler.getBundledCssStr()
      this.htmlOutputStr = this.htmlOutputStr.replace(
        link[0],
        `<style>${cssOutputStr}</style>`
      )
    }
  }

  /**
   *
   * @returns
   *
   */
  tostring() {
    return JSON.stringify(this.htmlImgsSrc)
  }

  /**
   *
   * @returns
   *
   */
  getBundledHtmlStr() {
    return this.htmlOutputStr
  }
}
