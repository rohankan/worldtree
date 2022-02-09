import githubdb from "./githubdb"

export type CollectionName = string

const deriveHashCode = (value: string) => [...value]
  .map(char => char.charCodeAt(0))
  .reduce((hash, charCode) => (((hash << 5) - hash) + charCode) | 0, 0)

export default class Collection<T> {
  name: CollectionName
  items: T[]

  reorder() {
    this.items.sort((a, b) => {
      const aHash = deriveHashCode(JSON.stringify(a))
      const bHash = deriveHashCode(JSON.stringify(b))
      return aHash - bHash
    })
  }

  constructor(name: string, items?: T[]) {
    this.name = name
    this.items = items || []

    githubdb.collections.read(name).then(console.log)
  }
}

export const collections = {
  constraints: new Collection<unknown>('constraints', [])
}
