export default class {
    map: Map<string, Function>;
    get(key: string): Function | undefined;
    has(key: string): boolean;
    register(key: string, component: Function): void;
    unRegister(key: string): void;
    clear(): void;
}
