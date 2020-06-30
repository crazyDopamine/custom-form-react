import React, { ReactNode } from "react"
import Select, { SelectProps, SelectValue } from "antd/es/select"
import { BaseField } from "../../../baseField"
import { FieldProps, FieldState } from "../../../types"
import { pick, isArray, toString } from "lodash"

export interface SelectOption {
  key?: string | number | undefined
  label?: string | undefined | ReactNode
  value?: string | number | undefined
  [name: string]: any
}

export default class extends BaseField<FieldProps, FieldState> {
  constructor(props: FieldProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(value: SelectValue, option: React.ReactElement<any> | React.ReactElement<any>[]) {
    const { onChange } = this.props
    // const options = (this.props.options || this.props.fieldSet.options) as SelectOption[]
    if (onChange) onChange(value, option)
  }

  // shouldComponentUpdate(nextProps: Readonly<FieldProps>): boolean {
  //   if (nextProps.value != this.props.value) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }
  getComponentProps(): SelectProps<SelectValue> {
    const { fieldSet, options } = this.props
    return {
      placeholder: fieldSet.placeholder || fieldSet.label,
      ...pick(fieldSet, [
        "allowClear",
        "autoClearSearchValue",
        "autoFocus",
        "defaultActiveFirstOption",
        "defaultValue",
        "disabled",
        "dropdownClassName",
        "dropdownMatchSelectWidth",
        "dropdownRender",
        "dropdownStyle",
        "dropdownMenuStyle",
        "filterOption",
        "firstActiveValue",
        "getPopupContainer",
        "labelInValue",
        "maxTagCount",
        "maxTagTextLength",
        "maxTagPlaceholder",
        "mode",
        "notFoundContent",
        "optionFilterProp",
        "optionLabelProp",
        "showArrow",
        "showSearch",
        "size",
        "suffixIcon",
        "removeIcon",
        "clearIcon",
        "menuItemSelectedIcon",
        "tokenSeparators",
        "onBlur",
        "onDeselect",
        "onFocus",
        "onInputKeyDown",
        "onMouseEnter",
        "onMouseLeave",
        "onPopupScroll",
        "onSearch",
        "onSelect",
        "defaultOpen",
        "open",
        "onDropdownVisibleChange",
        "loading",
        "style",
        "className",
      ]),
      ...((!!options && { options }) || {}),
    }
  }

  filterValue(value: any | any[]): string | string[] | undefined {
    if (value && isArray(value)) {
      return value.map((i: any) => toString(i))
    } else {
      return (!!value && toString(value)) || undefined
    }
  }

  getLabel(value: any | any[] | undefined): string {
    const options = this.props.options || this.props.fieldSet.options || []
    if (value && isArray(value)) {
      return (value || [])
        .map((v: any) => {
          const op = !!v && (options || []).find((i: SelectOption) => i.value == v)
          return (op && op.label) || v
        })
        .join(",")
    } else {
      const op = !!value && (options || []).find((i: SelectOption) => i.value == value)
      return (op && op.label) || value
    }
  }

  render(): React.ReactNode {
    let props = this.getComponentProps()
    const { editable, value, fieldSet } = this.props
    const { optionsRender } = fieldSet
    if (editable) {
      return (
        <Select {...props} value={this.filterValue(value)}>
          {!!optionsRender && optionsRender(props.options)}
          {/*{!optionsRender &&*/}
          {/*  (props.options || []).map((op: SelectOption) => {*/}
          {/*    return (*/}
          {/*      <Select.Option value={toString(op.value)} key={toString(op.value)} data={op}>*/}
          {/*        {op.label}*/}
          {/*      </Select.Option>*/}
          {/*    )*/}
          {/*  })}*/}
        </Select>
      )
    } else {
      return <div style={{ marginTop: "4px" }}>{this.getLabel(value)}</div>
    }
  }
}
