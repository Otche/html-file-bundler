import { regExpExecArray } from '.'

const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Test</title>
    <link rel="stylesheet" href="style1.css">
    <style>
      body {
        background-color: lightblue;
      }
    </style>
    <link rel="stylesheet" href="style2.css">
  </head>
  <body>
  </body>
  </html>`

describe('extractResources', () => {
  test('Find css links', async () => {
    const regexp = /<link.*?href="(.*?)".*?>/g
    const res = Array.from(regExpExecArray(html, regexp))
    expect(res.length).toBe(2)
    expect(res.map((e) => e[1])).toEqual(['style1.css', 'style2.css'])
  })
})
