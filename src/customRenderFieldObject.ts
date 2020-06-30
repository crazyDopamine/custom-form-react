// import React from "react"
import { CustomRenderFieldState, CustomRenderFieldProps, FieldSet } from "./types"
import { BaseField } from "./baseField"

export class CustomRenderFieldObject<
  P extends CustomRenderFieldProps,
  S extends CustomRenderFieldState
> extends BaseField<P, S> {
  // static registorRule(field: FieldSet): RuleItem[] {
  //   const rules: RuleItem[] = super.registorRule(field)
  //   return rules
  // }
  // static getDerivedStateFromProps(
  //   nextProps: Readonly<FieldProps>,
  //   preState: FieldState
  // ): FieldState {
  //   const state = super.getDerivedStateFromProps(nextProps, preState)
  //   if (nextProps.fieldSet && nextProps.fieldSet.fields != state.fields) {
  //     state.fields = nextProps.fieldSet.fields
  //   }
  //   return state
  // }
  constructor(props: P) {
    super(props)
    this.state = {} as S
  }
  createField(field: FieldSet): FieldSet {
    const { fieldSet } = this.props
    return {
      ...field,
      key: `${fieldSet.key}.${field.key}`,
    }
  }
}
