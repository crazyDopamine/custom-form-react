/**
 * 下载文件方法，这里做了些兼容
 * @param {string} sUrl 文件地址
 * @param {string} fileName 文件名称
 */
export declare function downloadFile(sUrl: string, fileName: string): boolean;
export declare function uuid(): string;
export declare function compareObj(obj1: object, obj2: object, exclude?: string[]): boolean;
/**
 * 阻止冒泡
 * @param {*} e
 */
export declare function stopPropagation(e: any): void;
export * from "./option";
export * from "./format";
