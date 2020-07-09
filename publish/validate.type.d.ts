import { FieldProps } from './types';
export interface Rules {
    [key: string]: RuleItem;
}
export interface RuleItem {
    key: string;
    label: string;
    fieldProps: FieldProps;
    type: RuleType;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
    validator?: (value: any, validatorOption: ValidatorOption) => Promise<ValidateError>;
    [name: string]: any;
}
export declare enum RuleType {
    string = "string",
    number = "number",
    integer = "integer",
    boolean = "boolean",
    object = "object",
    array = "array",
    date = "date",
    any = "any"
}
export interface TypeValidates {
    required?: (v: any, ruleItem: RuleItem) => boolean;
    max?: (v: any, ruleItem: RuleItem) => boolean;
    min?: (v: any, ruleItem: RuleItem) => boolean;
    maxLength?: (v: any, ruleItem: RuleItem) => boolean;
    minLength?: (v: any, ruleItem: RuleItem) => boolean;
    [name: string]: any;
}
export interface ValidateError {
    key: string;
    valid: boolean;
    type: boolean;
    required: boolean;
    maxLength: boolean;
    minLength: boolean;
    max: boolean;
    min: boolean;
    validator: boolean;
    message: string;
    [name: string]: any;
}
export interface ValidateErrors {
    [key: string]: ValidateError;
}
export interface ValidateResult {
    value: object;
    valid: boolean;
    errors: ValidateErrors;
    errorList: ValidateError[];
    rules: Rules;
}
export interface ValidatorOption {
    rule: RuleItem;
    values: object;
}
