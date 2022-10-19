export const listToObject = <T>(
  list: T[]
): { [key: string]: { item: T; order: number } } => {
  const listEntry = list.map((item, index) => [
    crypto.randomUUID(),
    { item, order: index },
  ])
  return Object.fromEntries(listEntry)
}
