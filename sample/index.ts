import path from 'path'
import { UTF8 } from '@/utils/constant'
import fs from 'fs/promises'
import { HtmlBundleTree } from '@/service/html-bundle-tree'

/**
 *
 */
async function bundle() {
  console.log('Start bundling...')
  const template = path.resolve('sample/input/sample.html')
  const htmlstr = await fs.readFile(template, UTF8)
  const htmlBundleTree = new HtmlBundleTree(htmlstr, path.dirname(template))
  await htmlBundleTree.resolveImgsSrc()
  await htmlBundleTree.resolveStyleImgsUrl()
  await htmlBundleTree.resolveStylesheetLinks()
  await fs.writeFile(
    path.resolve(path.dirname(template), '../output.html'),
    htmlBundleTree.getBundledHtmlStr(),
    UTF8
  )
  console.log('Bundling done!')
}

bundle()
