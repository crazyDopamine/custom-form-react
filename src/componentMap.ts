import { toLower } from "lodash"

export default class {
  map: Map<string, Function> = new Map<string, Function>()
  get(key: string) {
    return this.map.get(toLower(key))
  }
  has(key: string) {
    return this.map.has(toLower(key))
  }
  register(key: string, component: Function) {
    this.map.set(toLower(key), component)
  }
  unRegister(key: string) {
    this.map.delete(toLower(key))
  }
  clear() {
    this.map.clear()
  }
}
