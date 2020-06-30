export interface OptionEnumOption {
    keyFn?: (o: any) => any;
    valueFn?: (o: any) => any;
    transform?: (o: any) => any;
    lazy?: boolean;
}
export interface OptionRequestResponse {
    data: Array<object>;
}
export declare class OptionEnum {
    config: OptionEnumOption;
    request: (params?: any) => Promise<OptionRequestResponse>;
    valueFn: (o: any) => any;
    labelFn: (o: any) => any;
    lazy: boolean;
    transform?: (o: any) => any;
    status: number;
    waiting: Array<(value?: object[] | PromiseLike<object[]>) => void>;
    constructor(request: (params?: any) => Promise<OptionRequestResponse>, config: OptionEnumOption);
    /**
     * 请求数据
     * @param params 请求参数
     */
    get(params?: any): Promise<object[]>;
}
