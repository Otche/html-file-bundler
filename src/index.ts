import path from 'path'
import { UTF8 } from './utils/constant'
import fs from 'fs/promises'
import { HtmlBundleTree } from './service/html-bundle-tree'

/**
 *
 */
async function bundle() {
  const template = path.resolve('../cv-template-ref/basic-v3/template.html')
  const htmlstr = await fs.readFile(template, UTF8)
  const htmlBundleTree = new HtmlBundleTree(htmlstr, path.dirname(template))
  await htmlBundleTree.resolveImgSrc()
  await htmlBundleTree.resolveStyleImgUrl()
  await htmlBundleTree.resolveStylesheetLink()
  await fs.writeFile(
    path.dirname(template) + '/output.html',
    htmlBundleTree.getBundledHtmlStr(),
    UTF8
  )
}

bundle()
