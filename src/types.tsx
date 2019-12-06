import { ReactNode } from "react"
import { BaseForm } from "./baseForm"
import { Errors, RuleItem, Rules, Error, ValidatorOption } from "./validate.type"

export * from "./validate.type"

export interface FieldSet {
  key?: string
  label?: string
  type?: string
  value?: any
  onChange?(v: any): void
  asyncValidator?(scope: any, rule: any, value: any): Promise<any>
  validator?(value: any, validatorOption: ValidatorOption): Promise<Error>
  required?: boolean
  rules?: RuleItem[]
  fields?: FieldSet[]
  [propName: string]: any
}

export interface FieldProps {
  key?: string
  keyNest?: string[]
  label?: string
  value?: any
  onChange?(v: any, ...args): void
  error?: Error
  form: BaseForm
  fieldSet: FieldSet
  [propName: string]: any
}

export interface FieldClass extends Function {}

type BaseField<P, S> = FieldClass

export interface CustomRenderFieldProps extends FieldProps {
  renderField(fieldProps: FieldSet, domKey?: string, keyNest?: string[]): ReactNode
}

export interface CustomRenderFieldSet extends FieldSet {
  fields?: FieldSet[]
}

export interface FieldState {
  value: any
  [propName: string]: any
}

export interface CustomRenderFieldState extends FieldState {
  [propName: string]: any
}

export enum FormValidateTrigger {
  onChange = "onChange",
  onSubmit = "onSubmit"
}

export interface BaseFormProps {
  //初始值
  initialValue?: object
  //第一个验证报错返回
  validateFirst?: boolean
  //验证触发
  validateTrigger?: FormValidateTrigger
  //字段配置
  fields: Array<FieldSet>
  //值
  value?: BaseFormValue
  //验证规则
  rules?: Rules
  //验证规则生成方法
  rulesFn?(values: BaseFormValue): Rules
  //值改变回调
  onChange?(value: object): void
  //渲染前回调，可修改fields配置
  beforeRender?(fields: FieldSet[]): FieldSet[]
  [propName: string]: any
}

export interface BaseFormState {
  fields: Array<FieldSet>
  fieldsMap: Map<string, FieldSet>
  value: BaseFormValue
  errors: Errors
  [propName: string]: any
}

export interface BaseFormValue {
  [propName: string]: any
}
