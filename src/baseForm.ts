import React, { ComponentClass, ReactNode } from "react"
import { defaultsDeep, get, pick, set, toString, cloneDeep } from "lodash"
import {
  BaseFormProps,
  BaseFormState,
  BaseFormValue,
  CustomRenderFieldProps,
  ValidateErrors,
  FieldProps,
  FieldSet,
  RuleItem,
  Rules,
  RuleType,
  ValidateResult,
  BaseFormInterface,
  FormValidateTrigger,
  FormRenderFieldOptions,
  FieldClass,
} from "./types"
import { CustomRenderFieldArray } from "./customRenderFieldArray"
import { CustomRenderFieldObject } from "./customRenderFieldObject"
import { validate } from "./validate"
import { omit, isFunction } from "lodash"
import ComponentMap from "./componentMap"

const fieldComponentMap = new ComponentMap()

/**
 * 注册组件
 * @param key
 * @param component
 */
export function registorComponent(key: string, component: FieldClass) {
  if (fieldComponentMap.has(key)) {
    console.warn(
      `component named ${key} has been registered, the registered component will be replaced!`
    )
  }
  fieldComponentMap.register(key, component)
}

/**
 * 注销组件
 * @param key
 */
export function unRegistorComponent(key: string) {
  fieldComponentMap.unRegister(key)
}

export class BaseForm extends React.Component<BaseFormProps, BaseFormState>
  implements BaseFormInterface {
  static defaultProps = {
    validateTrigger: FormValidateTrigger.onChange,
    validateFirst: false,
    initialValue: {},
    fields: [],
    rules: {} as Rules,
  }
  rules: Rules = {}
  options = new Map<string, object[]>()
  fieldComponentMap: ComponentMap = fieldComponentMap

  constructor(props: Readonly<BaseFormProps>) {
    super(props)
    this.state = {
      value: props.value || cloneDeep(props.initialValue) || {},
      fields: props.fields || [],
      fieldsMap: getFieldsMap(props.fields || []),
      errors: {} as ValidateErrors,
    } as BaseFormState
  }
  validateShowMessageFn?: (msg: string, validateResult: ValidateResult) => void
  defaultField: string = "input"
  formContainerRender?: (children: React.ReactNode, props: BaseFormProps) => React.ReactNode
  formFieldContainerRender?: (
    children: React.ReactNode,
    fieldSet: FieldProps,
    domKey: string
  ) => React.ReactNode
  static getDerivedStateFromProps(
    nextProps: Readonly<BaseFormProps>,
    preState: BaseFormState
  ): BaseFormState {
    const state = {
      ...preState,
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

  /**
   * 重设表单值 => {}
   * @param fieldKeys 需要重设的值
   */
  public reset(fieldKeys?: string[]): void {
    const { initialValue } = this.props
    if (fieldKeys) {
      const { value } = this.state
      fieldKeys.forEach(k => (value[k] = undefined))
      defaultsDeep(value, pick(initialValue, fieldKeys))
      this.setState({ value, errors: {} })
    } else {
      this.setState({ value: cloneDeep(initialValue) as BaseFormValue, errors: {} })
    }
  }

  /**
   * 重置字段验证
   */
  public resetValidate(): void {
    this.setState({ errors: {} })
  }

  /**
   * 设置表单值
   * @param value 设置的表单值
   * @param reset 是否重置
   */
  public setValue(value: BaseFormValue, reset: boolean = false): void {
    if (!reset) {
      value = defaultsDeep(value, this.state.value)
      this.setState({ value })
      return
    }
    this.setState({ value, errors: {} })
  }

  /**
   * 获取表单值
   */
  public getValue(): BaseFormValue {
    return this.state.value as BaseFormValue
  }

  /**
   * 设置选项参数
   * @param key
   * @param options
   */
  setOption(key: string, options: object[]): void {
    this.options.set(key, options)
    //有待优化
    this.forceUpdate()
  }

  /**
   * 注册规则
   * @param fieldProps
   */
  private registerRule(fieldProps: FieldProps) {
    const { fieldSet } = fieldProps
    if (!fieldSet.key) {
      return null
    }
    this.rules = {
      ...this.rules,
      [fieldSet.key || ""]: {
        type: RuleType.any,
        fieldProps: fieldProps,
        label: fieldSet.validateLabel || fieldSet.label || fieldSet.placeholder,
        ...pick(fieldSet, ["key", "required", "maxLength", "minLength", "max", "min", "validator"]),
        ...(fieldProps.fieldSet.rules || {}),
        ...((fieldProps.fieldSet.validator && { validator: fieldProps.fieldSet.validator }) || {}),
      } as RuleItem,
    }
  }

  /**
   * 验证表单值
   * @param fieldKeys 需要验证的字段
   * @param isShowMsg 是否显示消息
   * @param isClear 是否清空验证
   */
  public validate(
    fieldKeys?: string[],
    isShowMsg: boolean = true,
    isClear: boolean = true
  ): Promise<ValidateResult> {
    return new Promise<ValidateResult>(
      (resolve: (result: ValidateResult) => void, reject: (result: ValidateResult) => void) => {
        const { value } = this.state
        const { rules } = this
        validate(value, (fieldKeys && pick(rules, fieldKeys)) || rules).then((result): void => {
          const { errors, errorList, valid } = result
          if (!valid) {
            const message = errorList[0].message
            this.validateShowMessageFn && this.validateShowMessageFn.call(this, message, result)
            this.setState(
              {
                errors: isClear
                  ? errors
                  : {
                      ...((fieldKeys && omit(this.state.errors, fieldKeys)) ||
                        this.state.errors ||
                        {}),
                      ...errors,
                    },
              },
              () => {
                reject(result)
              }
            )
          } else {
            this.setState({
              errors: isClear
                ? errors
                : {
                    ...((fieldKeys && omit(this.state.errors, fieldKeys)) ||
                      this.state.errors ||
                      {}),
                    ...errors,
                  },
            })
            resolve(result)
          }
        })
      }
    )
  }

  private onFieldChange(fieldProps: FieldProps, k: string, v: any, ...args: any[]) {
    const field = fieldProps.fieldSet
    const { onChange, validateTrigger } = this.props
    const { value } = this.state
    set(value, k, v)
    this.setState({ value })
    if (field.onChange) {
      field.onChange(v, { form: this, field: fieldProps }, ...args)
    }
    if (onChange) onChange(value, { changeKey: k, changeValue: v, form: this, field })
    if (validateTrigger == FormValidateTrigger.onChange && field.key) {
      this.validate([field.key], true, false).then()
    }
  }

  private renderField(
    field: FieldSet,
    domKey?: string,
    keyNest?: string[],
    fieldOptions?: FormRenderFieldOptions
  ): ReactNode {
    const { editable } = this.props
    const { value, errors } = this.state
    const { key = "", customFieldSet, optionKey } = field
    keyNest = [key, ...(keyNest || [])]
    const valueNest = [...keyNest.map(k => get(value, k, undefined)), value]
    if (customFieldSet) {
      field = { ...field, ...customFieldSet(valueNest, field) }
    }
    const { type = "", render } = field
    const Component =
      this.fieldComponentMap && this.fieldComponentMap.has(type)
        ? this.fieldComponentMap.get(type)
        : this.fieldComponentMap.get(this.defaultField)
    const fieldValue = get(value, key, undefined)
    let options = this.options.get(key) || field.options
    if (optionKey && this.options.get(optionKey)) {
      options = this.options.get(optionKey)
    }
    const fieldEditable = [field.editable, editable].find(i => i !== null && i !== undefined)
    let props = {
      key: key,
      domKey: domKey || key,
      keyNest,
      valueNest,
      fieldSet: field,
      form: this,
      value: fieldValue,
      error: errors[field.key || ""],
      editable: fieldEditable !== undefined && fieldEditable !== null ? fieldEditable : true,
      options,
    } as FieldProps
    props.onChange = this.onFieldChange.bind(this, props, key)
    props.onBlur = this.onFieldChange.bind(this, props, key)
    if (
      Component &&
      (Component.prototype instanceof CustomRenderFieldArray ||
        Component.prototype instanceof CustomRenderFieldObject)
    ) {
      props = {
        ...props,
        renderField: this.renderField.bind(this),
      } as CustomRenderFieldProps
    }
    if (
      (field.hidden && isFunction(field.hidden) && field.hidden(props)) ||
      (field.hidden && !isFunction(field.hidden))
    ) {
      return null
    }
    this.registerRule(props)
    let fieldDom = null
    if (render) {
      fieldDom = render.call(this, props, { renderField: this.renderField.bind(this) })
    } else if (Component) {
      fieldDom = React.createElement(Component as ComponentClass, props) //<Component {...props} key={domKey || key} />
    }
    const componentOnly = fieldOptions && fieldOptions.componentOnly
    const formFieldContainerRender =
      (!!fieldOptions && fieldOptions.formFieldContainerRender) || this.formFieldContainerRender
    return (
      (!componentOnly &&
        !!formFieldContainerRender &&
        formFieldContainerRender(fieldDom, props, domKey || key)) ||
      fieldDom
    )
  }

  render(): React.ReactNode {
    const { fields, value } = this.state
    const { renderField } = this
    const { beforeRender } = this.props
    this.rules = {}
    let toRenderFields = [...fields].filter(f => isFunction(f.hidden) || !f.hidden)
    if (beforeRender) {
      toRenderFields = [...beforeRender(fields, value)]
    }
    return this.formContainerRender
      ? this.formContainerRender(
          toRenderFields.map((f, i) => renderField.call(this, f, toString(i))).filter(Boolean),
          this.props
        )
      : toRenderFields.map((f, i) => renderField.call(this, f, toString(i))).filter(Boolean)
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

BaseForm.prototype.fieldComponentMap = fieldComponentMap
