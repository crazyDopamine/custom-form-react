import React from "react"
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox"
import { BaseField } from "../../../baseField"
import { FieldProps, FieldSet, FieldState } from "../../../types"
import { pick } from "lodash"

export default class extends BaseField<FieldProps, FieldState> {
  onChange(e: CheckboxChangeEvent) {
    const { onChange } = this.props
    if (onChange) onChange(e.target.checked)
  }

  getComponentProps(): FieldSet {
    const { fieldSet } = this.props
    return {
      placeholder: fieldSet.label,
      ...pick(fieldSet, [
        "autoFocus",
        "checkedChildren",
        "defaultChecked",
        "disabled",
        "loading",
        "size",
        "unCheckedChildren",
        "onClick",
        "className",
        "style",
        "placeholder",
      ]),
    }
  }

  render(): React.ReactNode {
    let props = this.getComponentProps()
    const { editable, value } = this.props
    if (editable) {
      return (
        <div style={{ marginTop: "4px" }}>
          <Checkbox {...props} checked={value} onChange={this.onChange.bind(this)} />
          <span style={{ marginLeft: "8px" }}>{props.placeholder || ""}</span>
        </div>
      )
    } else {
      return (
        <div style={{ marginTop: "4px" }}>
          <Checkbox {...props} value={value} onChange={() => {}} />
          <span style={{ marginLeft: "8px" }}>{props.placeholder || ""}</span>
        </div>
      )
    }
  }
}
