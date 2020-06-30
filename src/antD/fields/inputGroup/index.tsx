import React from "react"
import { Input } from "antd"
import { CustomRenderFieldObject } from "../../../customRenderFieldObject"
import { CustomRenderFieldProps, CustomRenderFieldState, FieldSet } from "../../../types"
import { get } from "lodash"

export default class extends CustomRenderFieldObject<
  CustomRenderFieldProps,
  CustomRenderFieldState
> {
  shouldComponentUpdate(): boolean {
    return true
  }

  createField(field: FieldSet): FieldSet {
    const { fieldSet, form, keyNest } = this.props
    const { fields } = fieldSet
    const { fieldLayout } = fieldSet
    const key = [keyNest && keyNest[1], field.key].filter(Boolean).join(".")
    const errors = get(form, `state.errors`, undefined)
    return {
      style: { width: `${100 / ((fields && fields.length) || 1)}%` },
      ...fieldLayout,
      ...field,
      className: [field.className, !!errors[key] && "has-error"].filter(Boolean).join(" "),
      key: key,
      keyNest: [key, ...((!!keyNest && keyNest.slice(1)) || [])],
    }
  }
  render(): React.ReactNode {
    const { renderField, fieldSet } = this.props
    const { fields } = fieldSet
    return (
      <Input.Group compact>
        {(fields || []).map((field: FieldSet, i: number) => {
          return renderField(
            this.createField(field),
            i.toString(),
            [field.key, ...(fieldSet.keyNest || [])],
            { componentOnly: true }
          )
        })}
      </Input.Group>
    )
  }
}
