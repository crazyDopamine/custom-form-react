import React, { ChangeEvent } from "react"
import Input from "antd/es/input"
import { BaseField } from "../../../baseField"
import { FieldProps, FieldSet, FieldState } from "../../../types"
import { pick } from "lodash"

export default class extends BaseField<FieldProps, FieldState> {
  onChange(e: ChangeEvent<HTMLInputElement>) {
    const { onChange } = this.props
    if (onChange) onChange(e.target.value)
  }

  getComponentProps(): FieldSet {
    const { fieldSet } = this.props
    return {
      placeholder: fieldSet.label,
      ...pick(fieldSet, [
        "addonAfter",
        "addonBefore",
        "defaultValue",
        "disabled",
        "id",
        "maxLength",
        "prefix",
        "size",
        "suffix",
        "onPressEnter",
        "allowClear",
        "placeholder",
        "style",
        "className",
        "onBlur",
      ]),
    }
  }

  render(): React.ReactNode {
    let props = this.getComponentProps()
    const { editable, value } = this.props
    if (editable) {
      return <Input {...props} value={value} onChange={this.onChange.bind(this)} />
    } else {
      return <span className="un-editable-text">{value}</span>
    }
  }
}
