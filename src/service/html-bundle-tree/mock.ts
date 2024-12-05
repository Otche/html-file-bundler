export const HTML_RESOLVE_IMAGE = {
  input: `<html>
        <head>
            <title>Test</title>
            <link rel="stylesheet" href="/css/style.css" />
            <style>
                body {
                    background: url(http://example.com/img.jpg);
                }
                h1 {
                    background: url(test/img.svg);
                }
        </head>
        <body>
            <h1>Test</h1>
            <img src="http://example.com/img.png" />
            <img src="/test/img.svg" />
        </body>
    </html>`,
  snapshot: `<html>
  <head>
      <title>Test</title>
      <link rel="stylesheet" href="/css/style.css" />
      <style>
          body {
              background: url(data:image/png;base64,==AAAAAABB==);
          }
          h1 {
              background: url(data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E);
          }
  </head>
  <body>
      <h1>Test</h1>
      <img src="data:image/png;base64,==AAAAAABB==" />
      <img src="data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E" />
  </body>
</html>`,
}

export const mockLoadFileImg = (path: string) => {
  if (path.endsWith('.svg')) return Promise.resolve(`<svg></svg>`)
  if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg'))
    return Promise.resolve(`==AAABB==`)
  throw new Error('Mock Error')
}

export const mockLoadHttpImg = (uri: string) => {
  if (!uri.startsWith('http://') && !uri.startsWith('https://'))
    return Promise.reject('Invalid URI')
  if (uri.endsWith('.svg')) return Promise.resolve(`<svg></svg>`)
  if (uri.endsWith('.png') || uri.endsWith('.jpg') || uri.endsWith('.jpeg'))
    return Promise.resolve(`==AAAAAABB==`)
  throw new Error('Mock Error')
}
