export function parseQueryInt(
  string: string | undefined | string[],
  defaultValue: number
) {
  if (string && typeof string === 'string') {
    const int = parseInt(string)
    if (!isNaN(int)) {
      return int
    }
  }
  return defaultValue
}

export function parseQueryString(string: string | string[] | undefined) {
  if (typeof string === 'string') {
    return string
  }
}
