import { ReactNode } from "react";
import { ValidateErrors, RuleItem, Rules, ValidateError, ValidatorOption } from "./validate.type";
import { BaseForm } from "./baseForm";
import { OptionEnum } from "./util";
export * from "./validate.type";
export interface BaseFormInterface {
    [propName: string]: any;
}
export interface FieldSet {
    key?: string;
    label?: string;
    type?: string;
    editable?: boolean;
    asyncValidator?(scope: any, rule: any, value: any): Promise<any>;
    validator?(value: any, validatorOption: ValidatorOption): Promise<ValidateError>;
    required?: boolean;
    rules?: RuleItem[];
    fields?: FieldSet[];
    onChange?(v: any, option: FieldSetOnChangeOption, ...args: any[]): void;
    customFieldSet?(values: any[], field: FieldSet): FieldSet;
    optionKey?: string;
    optionRequest?: OptionEnum;
    render?(props: FieldProps, op: {
        renderField(field: FieldSet, domKey?: string, keyNest?: string[], fieldOptions?: FormRenderFieldOptions): ReactNode;
    }): ReactNode;
    [propName: string]: any;
}
export interface FieldSetOnChangeOption {
    form: BaseForm;
    field: FieldProps;
}
export interface FieldProps {
    key?: string;
    domKey?: string;
    keyNest?: string[];
    label?: string;
    value?: any;
    onChange?(v: any, ...args: any[]): void;
    error?: ValidateError;
    editable?: boolean;
    form: BaseFormInterface;
    fieldSet: FieldSet;
    [propName: string]: any;
}
export interface FieldClass extends Function {
}
export interface CustomRenderFieldProps extends FieldProps {
    renderField(fieldProps: FieldSet, domKey?: string, keyNest?: string[], options?: FormRenderFieldOptions): ReactNode;
}
export interface CustomRenderFieldSet extends FieldSet {
    fields?: FieldSet[];
}
export interface FieldState {
    value: any;
    [propName: string]: any;
}
export interface CustomRenderFieldState extends FieldState {
    [propName: string]: any;
}
export declare enum FormValidateTrigger {
    onChange = "onChange",
    onBlur = "onBlur",
    onSubmit = "onSubmit"
}
export interface BaseFormProps {
    initialValue?: object;
    validateFirst?: boolean;
    validateTrigger?: FormValidateTrigger;
    fields: Array<FieldSet>;
    value?: BaseFormValue;
    rules?: Rules;
    rulesFn?(values: BaseFormValue): Rules;
    editable?: boolean;
    onChange?(value: object, option: BaseFormOnChangeOption): void;
    beforeRender?(fields: FieldSet[], value: object): FieldSet[];
    [propName: string]: any;
}
export interface BaseFormOnChangeOption {
    form: BaseForm;
    field: FieldSet;
    changeKey: string;
    changeValue: any;
}
export interface BaseFormState {
    fields: Array<FieldSet>;
    fieldsMap: Map<string, FieldSet>;
    value: BaseFormValue;
    errors: ValidateErrors;
    [propName: string]: any;
}
export interface BaseFormValue {
    [propName: string]: any;
}
export interface CreateFieldOption {
    getValueFromEvent?(event: any): any;
    valuePropName?: string;
    propsMap?(fieldProps: FieldProps): object;
    inValue?(v: any): any;
    outValue?(v: any): any;
    unEditableRender?(v: any): React.ReactNode;
    [propName: string]: any;
}
export interface FormRenderFieldOptions {
    componentOnly?: boolean;
    formFieldContainerRender?: (children: React.ReactNode, fieldSet: FieldProps, domKey: string) => React.ReactNode;
}
