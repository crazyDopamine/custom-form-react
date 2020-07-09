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
    private transform?;
    private config;
    private request;
    private lazy;
    private status;
    private waiting;
    constructor(request: (params?: any) => Promise<OptionRequestResponse>, config: OptionEnumOption);
    get(params?: any): Promise<object[]>;
    private readonly valueFn;
    private readonly labelFn;
}
