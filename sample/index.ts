import path from 'path'
import { UTF8 } from '@/utils/constant'
import fs from 'fs/promises'
import { HtmlBundlerTree } from '@/service/html-bundler-tree'

/**
 *
 */
async function bundle() {
  console.log('Start bundling...')
  const template = path.resolve(
    '/home/amine/Bureau/document-edition-project/cv-template-ref/modern-v1/template.html'
  )
  const htmlstr = await fs.readFile(template, UTF8)
  const htmlBundlerTree = new HtmlBundlerTree(htmlstr, path.dirname(template))
  await htmlBundlerTree.resolveImgsSrc()
  await htmlBundlerTree.resolveStyleImgsUrl()
  await htmlBundlerTree.resolveStylesheetLinks()
  await fs.writeFile(
    path.resolve(__dirname, './output.html'),
    htmlBundlerTree.getBundledHtmlStr(),
    UTF8
  )
  console.log('Bundling done!')
}

bundle()
