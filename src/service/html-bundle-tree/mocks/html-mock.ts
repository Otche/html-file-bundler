export const HTML_MOCK = {
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
  resolve_src_images_snapshot: `<html>
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
            <img src="data:image/png;base64,==AAAAAABB==" />
            <img src="data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E" />
        </body>
    </html>`,
  resolve_styles_url_images_snapshot: `<html>
        <head>
            <title>Test</title>
            <link rel="stylesheet" href="/css/style.css" />
            <style>
                body {
                    background: url("data:image/png;base64,==AAAAAABB==");
                }
                h1 {
                    background: url("data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E");
                }
        </head>
        <body>
                <h1>Test</h1>
                <img src="http://example.com/img.png" />
                <img src="/test/img.svg" />
        </body>
    </html>`,
}