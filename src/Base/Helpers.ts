// https://youmightnotneed.com/lodash/#set
export const set = (obj: any, path: string, value: any): void => {
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

  if (pathArray instanceof Array) {
    (pathArray as Array<string|RegExpMatchArray>).reduce((acc: any, key: any, i: any) => {
      if (acc[key] === undefined) acc[key] = {}

      if (i === pathArray.length - 1) acc[key] = value

      return acc[key]
    }, obj) as unknown
  }
}
