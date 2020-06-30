import React from "react";
import { BaseFormProps, BaseFormState, BaseFormValue, FieldProps, Rules, ValidateResult, BaseFormInterface, FormValidateTrigger, FieldClass } from "./types";
import ComponentMap from "./componentMap";
/**
 * 注册组件
 * @param key
 * @param component
 */
export declare function registorComponent(key: string, component: FieldClass): void;
/**
 * 注销组件
 * @param key
 */
export declare function unRegistorComponent(key: string): void;
export declare class BaseForm extends React.Component<BaseFormProps, BaseFormState> implements BaseFormInterface {
    static defaultProps: {
        validateTrigger: FormValidateTrigger;
        validateFirst: boolean;
        initialValue: {};
        fields: never[];
        rules: Rules;
    };
    rules: Rules;
    options: Map<string, object[]>;
    fieldComponentMap: ComponentMap;
    constructor(props: Readonly<BaseFormProps>);
    validateShowMessageFn?: (msg: string, validateResult: ValidateResult) => void;
    defaultField: string;
    formContainerRender?: (children: React.ReactNode, props: BaseFormProps) => React.ReactNode;
    formFieldContainerRender?: (children: React.ReactNode, fieldSet: FieldProps, domKey: string) => React.ReactNode;
    static getDerivedStateFromProps(nextProps: Readonly<BaseFormProps>, preState: BaseFormState): BaseFormState;
    /**
     * 重设表单值 => {}
     * @param fieldKeys 需要重设的值
     */
    reset(fieldKeys?: string[]): void;
    /**
     * 重置字段验证
     */
    resetValidate(): void;
    /**
     * 设置表单值
     * @param value 设置的表单值
     * @param reset 是否重置
     */
    setValue(value: BaseFormValue, reset?: boolean): void;
    /**
     * 获取表单值
     */
    getValue(): BaseFormValue;
    /**
     * 设置选项参数
     * @param key
     * @param options
     */
    setOption(key: string, options: object[]): void;
    /**
     * 注册规则
     * @param fieldProps
     */
    private registerRule;
    /**
     * 验证表单值
     * @param fieldKeys 需要验证的字段
     * @param isShowMsg 是否显示消息
     * @param isClear 是否清空验证
     */
    validate(fieldKeys?: string[], isShowMsg?: boolean, isClear?: boolean): Promise<ValidateResult>;
    private onFieldChange;
    private renderField;
    render(): React.ReactNode;
}
