import { FieldProps } from "./types"

export interface Rules {
  [key: string]: RuleItem
}

export interface RuleItem {
  key: string
  label: string
  fieldProps: FieldProps
  type: RuleType
  required?: boolean
  maxLength?: number
  minLength?: number
  max?: number
  min?: number
  validator?(value: any, validatorOption: ValidatorOption): Promise<Error>
}

export enum RuleType {
  string = "string",
  number = "number",
  integer = "integer",
  boolean = "boolean",
  object = "object",
  array = "array",
  date = "date",
  any = "any"
}

export interface Error {
  key: string
  valid: boolean
  type: boolean
  required: boolean
  maxLength: boolean
  minLength: boolean
  max: boolean
  min: boolean
  validator: boolean
  message: string
  className: string
}

export interface Errors {
  [key: string]: Error
}

export interface ValidateResult {
  value: object
  valid: boolean
  errors: Errors
  errorList: Error[]
  rules: Rules
}

export interface ValidatorOption {
  rule: RuleItem
  values: object
}
