export function *rangeInclusive(start: number, end: number) {
  for (let i = start; i <= end; i += 1) yield i
}