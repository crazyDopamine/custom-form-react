import React from "react"
import Button from "antd/es/button"
import { CustomRenderFieldArray } from "../../../customRenderFieldArray"
import { CustomRenderFieldProps, CustomRenderFieldState, FieldSet } from "../../../types"
import "./index.scss"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"

export default class Array extends CustomRenderFieldArray<
  CustomRenderFieldProps,
  CustomRenderFieldState
> {
  createField(field: FieldSet, rowIndex: number): FieldSet {
    const { fieldSet } = this.props
    const { fieldLayout } = fieldSet
    return {
      ...fieldLayout,
      ...field,
      key: `${fieldSet.key}[${rowIndex}].${field.key}`,
    }
  }
  shouldComponentUpdate(): boolean {
    return true
  }
  render(): React.ReactNode {
    const { value, renderField, fieldSet, editable } = this.props
    const { className, minLength = 0, maxLength = Infinity } = fieldSet
    const length = (value || []).length
    const {
      fields,
      removeBtnRender = (onRemove: React.MouseEventHandler<HTMLElement>) => (
        <Button
          icon={<DeleteOutlined />}
          className="gwy-field-array-remove-btn"
          onClick={onRemove}
          shape="circle"
        />
      ),
      addBtnRender = (onAdd: React.MouseEventHandler<HTMLElement>) => (
        <Button icon={<PlusOutlined />} className="gwy-field-array-add-btn" onClick={onAdd}>
          添加
        </Button>
      ),
    } = fieldSet
    return (
      <div className={["gwy-field-array", className].filter(Boolean).join(" ")}>
        {(value || []).map((row: object, index: number) => {
          const rowKey = `${fieldSet.key}[${index}]`
          return (
            <div className="gwy-field-array-row" key={index}>
              <div className="gwy-field-array-row-fields">
                {(fields || []).map((field: FieldSet, i: number) => {
                  return renderField(this.createField(field, index), i.toString(), [
                    rowKey,
                    ...(fieldSet.keyNest || []),
                  ])
                })}
              </div>
              {editable && length > minLength && (
                <div className="gwy-field-array-row-remove">
                  {!!removeBtnRender && removeBtnRender(this.remove.bind(this, index))}
                </div>
              )}
            </div>
          )
        })}
        {editable && length < maxLength && (
          <div className="gwy-field-array-add">
            {!!addBtnRender && addBtnRender(this.add.bind(this, {}))}
          </div>
        )}
      </div>
    )
  }
}
