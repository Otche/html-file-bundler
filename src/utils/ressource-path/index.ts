export const isBinImgName = (path: string) => {
  return (
    path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg')
  )
}

export const isSvgImgName = (path: string) => {
  return path.endsWith('.svg')
}

export const isHttpUriName = (uri: string) => {
  return uri.startsWith('http://') || uri.startsWith('https://')
}
