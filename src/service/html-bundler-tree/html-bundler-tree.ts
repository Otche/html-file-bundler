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
import { CSSBundlerTree } from './css-bundler-tree'
import { BundlerTreeResolution } from './type'
import { BundlerTree } from './bundler-tree'

export class HtmlBundlerTree extends BundlerTree {
  /**
   *
   */
  private readonly htmlImgsSrc: BundlerTreeResolution[]
  /**
   *
   */
  private readonly htmlStyleImgsUrl: BundlerTreeResolution[]
  /**
   *
   */
  private readonly htmlStylesheetLink: BundlerTreeResolution[]

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
  async resolveImgsSrc() {
    this.htmlOutputStr = await HtmlBundlerTree.resolveImg(
      this.htmlOutputStr,
      this.dirname,
      this.htmlImgsSrc
    )
  }

  /**
   *
   *
   */
  async resolveStyleImgsUrl() {
    this.htmlOutputStr = await HtmlBundlerTree.resolveImg(
      this.htmlOutputStr,
      this.dirname,
      this.htmlStyleImgsUrl
    )
  }

  /**
   *
   */
  async resolveStylesheetLinks() {
    for (const link of this.htmlStylesheetLink) {
      const linkSrc = link[1]
      let cssBundler: CSSBundlerTree

      if (isHttpUriName(linkSrc)) {
        link.data = (await axios.get(linkSrc)).data
        cssBundler = new CSSBundlerTree(link.data!, this.dirname)
      } else {
        const stylesheetPath = path.isAbsolute(linkSrc)
          ? linkSrc
          : path.resolve(this.dirname, linkSrc)

        link.data = (await fs.readFile(stylesheetPath, UTF8)).toString()
        cssBundler = new CSSBundlerTree(
          link.data!,
          path.dirname(stylesheetPath)
        )
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
  toString() {
    return JSON.stringify({
      htmlImgsSrc: this.htmlImgsSrc,
      htmlStyleImgsUrl: this.htmlStyleImgsUrl,
      htmlStylesheetLink: this.htmlStylesheetLink,
      htmlOutputStr: this.htmlOutputStr,
    })
  }

  /**
   *
   * @returns
   *
   */
  getBundledHtmlStr() {
    return this.htmlOutputStr
  }

  /**
   *
   * @returns
   */
  async resolve(): Promise<string> {
    await this.resolveImgsSrc()
    await this.resolveStyleImgsUrl()
    await this.resolveStylesheetLinks()
    return this.htmlOutputStr
  }
}
