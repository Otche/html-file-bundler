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
