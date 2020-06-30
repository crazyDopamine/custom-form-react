import React from "react"
import Cascader, { CascaderOptionType, CascaderValueType } from "antd/es/cascader"
import { BaseField } from "../../../baseField"
import { FieldProps, FieldSet, FieldState } from "../../../types"
import { pick } from "lodash"

export interface Option {
  value: string | number
  label: string
  children?: Option[]
}

function getOptionMap(options: Option[]) {
  const map = new Map<string | number, Option>()
  const loopOptions = (options: Option[], keyNest: any[] = []) => {
    options.forEach((op: Option) => {
      map.set([...keyNest, op.value].toString(), op)
      if (op.children && op.children.length) {
        loopOptions(op.children, [...keyNest, op.value])
      }
    })
  }
  loopOptions(options)
  return map
}

export interface State extends FieldState {
  optionMap: Map<any, Option>
}

export default class extends BaseField<FieldProps, State> {
  constructor(props: FieldProps) {
    super(props)
    this.state = {
      value: props.value,
      optionMap: getOptionMap(props.options || props.fieldSet.options || []),
    }
    this.onChange = this.onChange.bind(this)
  }
  componentWillReceiveProps(nextProps: Readonly<FieldProps>, nextContext: any): void {
    super.componentWillReceiveProps(nextProps, nextContext)
    if (nextProps.options != this.props.options) {
      this.setState({
        optionMap: getOptionMap(nextProps.options || nextProps.fieldSet.options || []),
      })
    }
  }
  onChange(value: CascaderValueType, selectedOptions?: CascaderOptionType[]) {
    const { onChange } = this.props
    if (onChange) onChange(value, selectedOptions)
  }

  getComponentProps(): FieldSet {
    const { fieldSet, options } = this.props
    return {
      placeholder: fieldSet.label,
      ...pick(fieldSet, [
        "allowClear",
        "autoFocus",
        "changeOnSelect",
        "className",
        "defaultValue",
        "disabled",
        "displayRender",
        "expandTrigger",
        "fieldNames",
        "getPopupContainer",
        "loadData",
        "notFoundContent",
        "options",
        "placeholder",
        "popupClassName",
        "popupPlacement",
        "popupVisible",
        "showSearch",
        "size",
        "style",
        "suffixIcon",
        "onPopupVisibleChange",
      ]),
      ...((!!options && { options }) || {}),
    }
  }

  getLabel() {
    const { value } = this.props
    const { optionMap } = this.state
    if (!value || (value && !value.length)) return ""
    const keys = value.map((v: any, i: number) => {
      return value.slice(0, i + 1)
    })
    return keys.map((k: string[]) => (optionMap.get(k.toString()) || {}).label).join("/")
  }

  render(): React.ReactNode {
    let props = this.getComponentProps()
    const { editable, value } = this.props
    if (editable) {
      return <Cascader {...props} value={value} onChange={this.onChange} />
    } else {
      return <span className="un-editable-text">{this.getLabel()}</span>
    }
  }
}
