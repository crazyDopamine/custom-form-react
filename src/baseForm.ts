import React, { ComponentClass, ReactNode } from "react"
import { BaseField } from "./baseField"
import { defaultsDeep, get, pick, set, toString } from "lodash"
import {
  BaseFormProps,
  BaseFormState,
  BaseFormValue,
  CustomRenderFieldProps,
  Errors,
  FieldClass,
  FieldProps,
  FieldSet,
  RuleItem,
  Rules,
  RuleType,
  ValidateResult,
  BaseFormInterface
} from "./types"
import { CustomRenderFieldArray } from "./customRenderFieldArray"
import { CustomRenderFieldObject } from "./customRenderFieldObject"
import { validate } from "./validate"

export class BaseForm extends React.Component<BaseFormProps, BaseFormState>
  implements BaseFormInterface {
  static defaultProps = {
    validateTrigger: "onChange",
    validateFirst: false,
    initialValue: {},
    fields: [],
    rules: {} as Rules
  }
  rules: Rules = {}

  constructor(props: Readonly<BaseFormProps>) {
    super(props)
    this.state = {
      value: props.value || {},
      fields: props.fields || [],
      fieldsMap: getFieldsMap(props.fields || []),
      errors: {} as Errors
    } as BaseFormState
  }
  static validateShowMessageFn?: Function
  static defaultFieldComponent: Function = BaseField
  static formContainerRender?: Function
  static formFieldContainerRender?: Function
  static fieldComponentMap: Map<string, FieldClass> = new Map<string, FieldClass>()
  static getDerivedStateFromProps(
    nextProps: Readonly<BaseFormProps>,
    preState: BaseFormState
  ): BaseFormState {
    const state = {
      ...preState
    } as BaseFormState
    if (nextProps.value && nextProps.value !== preState.value) {
      state.value = nextProps.value as BaseFormValue
    }
    if (nextProps.fields !== preState.fields) {
      state.fields = nextProps.fields
      state.fieldsMap = getFieldsMap(nextProps.fields || [])
    }
    return state
  }

  reset(): void {
    this.setState({ value: {} as BaseFormValue })
  }

  setValue(value: BaseFormValue, reset: boolean = false): void {
    if (!reset) {
      value = defaultsDeep(value, this.state.value)
    }
    this.setState({ value })
  }

  getValue(): BaseFormValue {
    return this.state.value as BaseFormValue
  }

  //注册规则
  registerRule(fieldProps: FieldProps) {
    if (!fieldProps.fieldSet.key) {
      return null
    }
    this.rules = {
      ...this.rules,
      [fieldProps.fieldSet.key]: {
        type: RuleType.any,
        fieldProps: fieldProps,
        ...pick(fieldProps.fieldSet, [
          "key",
          "label",
          "required",
          "maxLength",
          "minLength",
          "max",
          "min",
          "validator"
        ]),
        ...(fieldProps.fieldSet.rules || {}),
        ...((fieldProps.fieldSet.validator && { validator: fieldProps.fieldSet.validator }) || {})
      } as RuleItem
    }
  }

  // getRules(fieldKeys?: string[]): Rules {
  //   const { rules } = this.props
  //   return !!fieldKeys
  //     ? pick(
  //         {
  //           ...rules,
  //           ...this.rules
  //         },
  //         fieldKeys
  //       )
  //     : {
  //         ...rules,
  //         ...this.rules
  //       }
  // }

  validate(fieldKeys?: string[], isShowMsg: boolean = true): Promise<ValidateResult> {
    return new Promise<ValidateResult>(
      (resolve: (result: ValidateResult) => void, reject: (result: ValidateResult) => void) => {
        const { value } = this.state
        const { rules } = this
        validate(value, rules).then((result): void => {
          const { errors, errorList, valid } = result
          if (!valid) {
            const message = errorList[0].message
            BaseForm.validateShowMessageFn &&
              BaseForm.validateShowMessageFn.call(this, message, result)
            this.setState({
              errors
            })
            reject(result)
          } else {
            this.setState({
              errors
            })
            resolve(result)
          }
        })
      }
    )
  }

  onFieldChange(k: string, v: any): void {
    const { onChange } = this.props
    const { value } = this.state
    set(value, k, v)
    this.setState({ value })
    if (onChange) onChange(value)
  }

  renderField(field: FieldSet, domKey?: string, keyNest?: string[]): ReactNode {
    const { key = "", type = "", render } = field
    keyNest = [key, ...(keyNest || [])]
    const { value, errors } = this.state
    const Component = BaseForm.fieldComponentMap.has(type)
      ? BaseForm.fieldComponentMap.get(type)
      : BaseForm.defaultFieldComponent
    const fieldValue = get(value, key, null)
    let props = {
      keyNest,
      valueNest: keyNest.map(k => get(value, k, undefined)),
      fieldSet: field,
      form: this,
      value: fieldValue,
      onChange: this.onFieldChange.bind(this, key),
      error: errors[field.key || ""]
    } as FieldProps
    if (
      Component &&
      (Component.prototype instanceof CustomRenderFieldArray ||
        Component.prototype instanceof CustomRenderFieldObject)
    ) {
      props = {
        ...props,
        renderField: this.renderField.bind(this)
      } as CustomRenderFieldProps
    }
    this.registerRule(props)
    if (render) {
      return render.call(this, props, { renderField: this.renderField.bind(this) })
    }
    if (Component) {
      return React.createElement(Component as ComponentClass, { ...props, key: domKey || key }) //<Component {...props} key={domKey || key} />
    } else {
      return null
    }
  }

  render(): React.ReactNode {
    const { fields } = this.state
    const { renderField } = this
    return BaseForm.formContainerRender
      ? BaseForm.formContainerRender(
          fields.map((f, i) =>
            BaseForm.formFieldContainerRender
              ? BaseForm.formFieldContainerRender(renderField.call(this, f, toString(i)))
              : renderField.call(this, f)
          )
        )
      : fields.map((f, i) =>
          BaseForm.formFieldContainerRender
            ? BaseForm.formFieldContainerRender(renderField.call(this, f, toString(i)))
            : renderField.call(this, f)
        )
  }
}

function getFieldsMap(fields: Array<FieldSet> = []): Map<string, FieldSet> {
  const fieldsMap = new Map<string, FieldSet>()
  fields
    .filter(f => f.key)
    .forEach(f => {
      fieldsMap.set(f.key as string, f)
    })
  return fieldsMap
}
