import _ from 'lodash'

/**
 *
 * @param regexp
 * @param str
 * @returns
 */
export const regExpExecArray = (str: string, regexp: RegExp) => {
  const regExpExecArrayList = new Set<RegExpExecArray>([])
  let regExpExecArray: RegExpExecArray | null
  while (
    (regExpExecArray = regexp.exec(str)) &&
    !_.isEmpty(regExpExecArray) &&
    _.isArray(regExpExecArray)
  ) {
    regExpExecArrayList.add(regExpExecArray)
  }
  return regExpExecArrayList
}
