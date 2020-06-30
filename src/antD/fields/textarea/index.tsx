import React, { ChangeEvent } from "react"
import Input from "antd/es/input"
import { FieldProps, FieldSet, FieldState } from "../../../types"
import { pick } from "lodash"
import { BaseField } from "../../../baseField"

export default class extends BaseField<FieldProps, FieldState> {
  onChange(e: ChangeEvent<HTMLTextAreaElement>) {
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
        "autoSize",
        "style",
        "className",
      ]),
    }
  }

  render(): React.ReactNode {
    let props = this.getComponentProps()
    const { editable, value } = this.props
    if (editable) {
      return <Input.TextArea {...props} value={value} onChange={this.onChange.bind(this)} />
    } else {
      return <span className="un-editable-text">{value}</span>
    }
  }
}
