import React from "react"
import TreeSelect, { LabeledValue } from "antd/es/tree-select"
import { FieldProps, FieldSet, FieldState } from "../../../types"
import { pick } from "lodash"
import { BaseField } from "../../../baseField"

function getOptionMap(options: TreeSelectNode[]) {
  const map = new Map<string | number, TreeSelectNode>()
  const loopOptions = (options: TreeSelectNode[]) => {
    options.forEach((op: TreeSelectNode) => {
      map.set(op.value, op)
      if (op.children && op.children.length) {
        loopOptions(op.children)
      }
    })
  }
  loopOptions(options)
  return map
}

export interface TreeSelectNode {
  label: string
  value: string | number
  children?: TreeSelectNode[]
  selectable?: boolean
  checkable?: boolean
  disableCheckbox?: boolean
  disabled?: boolean
  isLeaf?: boolean
  [name: string]: any
}

export interface State extends FieldState {
  optionMap: Map<any, TreeSelectNode>
}

export default class extends BaseField<FieldProps, State> {
  constructor(props: FieldProps) {
    super(props)
    this.state = {
      value: props.value,
      optionMap: getOptionMap(props.options || props.fieldSet.options || []),
    }
  }
  componentWillReceiveProps(nextProps: Readonly<FieldProps>, nextContext: any): void {
    super.componentWillReceiveProps(nextProps, nextContext)
    if (nextProps.options != this.props.options) {
      this.setState({
        optionMap: getOptionMap(nextProps.options || nextProps.fieldSet.options || []),
      })
    }
  }
  onChange(value: LabeledValue, label: any, extra: any) {
    const { onChange } = this.props
    const { optionMap } = this.state
    if (onChange) onChange(value, optionMap.get(value), extra)
  }
  getComponentProps(): FieldSet {
    const { fieldSet, options } = this.props
    return {
      placeholder: fieldSet.label,
      ...pick(fieldSet, [
        "allowClear",
        "autoClearSearchValue",
        "defaultValue",
        "disabled",
        "dropdownClassName",
        "dropdownMatchSelectWidth",
        "dropdownStyle",
        "filterTreeNode",
        "getPopupContainer",
        "labelInValue",
        "loadData",
        "maxTagCount",
        "maxTagPlaceholder",
        "multiple",
        "placeholder",
        "searchPlaceholder",
        "searchValue",
        "treeIcon",
        "showCheckedStrategy",
        "showSearch",
        "size",
        "suffixIcon",
        "treeCheckable",
        "treeCheckStrictly",
        "treeData",
        "treeDataSimpleMode",
        "treeDefaultExpandAll",
        "treeDefaultExpandedKeys",
        "treeExpandedKeys",
        "treeNodeFilterProp",
        "treeNodeLabelProp",
        "onSearch",
        "onSelect",
        "onTreeExpand",
        "className",
      ]),
      ...((!!options && { options }) || {}),
    }
  }

  optionsRender(options: TreeSelectNode[]) {
    return (options || []).map((op: TreeSelectNode) => (
      <TreeSelect.TreeNode {...op} key={op.value} title={op.label}>
        {!!op.children && op.children.length && this.optionsRender(op.children)}
      </TreeSelect.TreeNode>
    ))
  }

  render(): React.ReactNode {
    let props = this.getComponentProps()
    const { editable, value, fieldSet } = this.props
    const { optionMap } = this.state
    const { optionsRender } = fieldSet
    if (editable) {
      return (
        <TreeSelect {...props} value={value} onChange={this.onChange.bind(this)}>
          {!!optionsRender && optionsRender.call(this, props.options)}
          {!optionsRender && this.optionsRender(props.options)}
        </TreeSelect>
      )
    } else {
      return <span className="un-editable-text">{(optionMap.get(value) || {}).label || value}</span>
    }
  }
}
