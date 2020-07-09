export default class {
    private map;
    get(key: string): Function | undefined;
    has(key: string): boolean;
    register(key: string, component: Function): void;
    unRegister(key: string): void;
    clear(): void;
}
