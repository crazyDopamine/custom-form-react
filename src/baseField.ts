import React, { ReactNode } from "react"
import { FieldProps, FieldState } from "./types"

export class BaseField<P extends FieldProps, S extends FieldState> extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    this.state = {} as S
  }

  inValue(v: any): any {
    return v
  }

  outValue(v: any): any {
    return v
  }

  onChange(v: any, ...args) {
    const { onChange } = this.props
    if (onChange) onChange(v)
  }

  static getDerivedStateFromProps(
    nextProps: Readonly<FieldProps>,
    preState: FieldState
  ): FieldState {
    const state = {
      ...preState
    } as FieldState
    if (nextProps.value !== preState.value) {
      state.value = nextProps.value
    }
    return state
  }

  render(): ReactNode {
    return null
  }
}
