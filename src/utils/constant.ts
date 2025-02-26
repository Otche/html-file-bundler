//
export const UTF8 = 'utf-8'
//
export const LINK_STYLESHEET_REGEXP =
  /<link[^>]*rel=['|"]stylesheet['|"][^>]+href="([^"]+\.css)"[^>]*>/g
//
export const SCRIPT_REGEXP = /<script[^>]+src="([^"]+)"[^>]*>/g
//
export const STYLE_REGEXP = /<style[^>]*>([^<]+)<\/style>/g
//
export const IMG_REGEXP = /<img[^>]+src="([^"]+)"[^>]*>/g
//
export const STYLE_URL_REGEXP = /url[^)]*\("?([^)|^"]*)"?\)/gm

export const base64BinImagePrefix = (fileType: string) =>
  `data:image/${fileType};base64,`
//
export const SVG_PREFIX_STR = 'data:image/svg+xml;utf8,'
