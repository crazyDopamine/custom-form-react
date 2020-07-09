import { toLower } from 'lodash';

export default class {
  private map: Map<string, Function> = new Map<string, Function>();
  public get(key: string) {
    return this.map.get(toLower(key));
  }
  public has(key: string) {
    return this.map.has(toLower(key));
  }
  public register(key: string, component: Function) {
    this.map.set(toLower(key), component);
  }
  public unRegister(key: string) {
    this.map.delete(toLower(key));
  }
  public clear() {
    this.map.clear();
  }
}
