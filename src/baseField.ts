import React, {
  ComponentClass,
  ForwardRefExoticComponent,
  FunctionComponent,
  ReactNode,
} from "react"
import { CreateFieldOption, FieldProps, FieldState } from "./types"
import { omit, toString } from "lodash"
import { compareObj } from "./util"

export class BaseField<P extends FieldProps, S extends FieldState> extends React.Component<P, S> {
  constructor(props: P) {
    super(props)
    this.state = {
      value: props.value,
    } as S
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if (nextProps.value != this.props.value) {
      this.setState({ value: nextProps.value })
    }
  }

  shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
    if (
      compareObj(nextProps, this.props, ["onChange", "onBlur"]) &&
      compareObj(nextState, this.state)
    )
      return false
    return true
  }

  getComponentProps() {
    let props = omit(this.props.fieldSet, [
      "key",
      "label",
      "type",
      "editable",
      "asyncValidator",
      "validator",
      "required",
      "rules",
      "fields",
      "onChange",
      "customFieldSet",
    ])
    return props
  }

  inValue(v: any): any {
    return v
  }

  outValue(v: any): any {
    return v
  }

  onChange(v: any, ...args: any[]) {
    const { onChange } = this.props
    if (onChange) onChange(v, ...args)
  }

  onBlur(v: any, ...args: any[]) {
    const { onBlur } = this.props
    if (onBlur) onBlur(v, ...args)
  }

  // static getDerivedStateFromProps(
  //   nextProps: Readonly<FieldProps>,
  //   preState: FieldState
  // ): FieldState {
  //   const state = {
  //     ...preState,
  //   } as FieldState
  //   if (nextProps.value !== preState.value) {
  //     state.value = nextProps.value
  //   }
  //   return state
  // }
  //
  // componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
  //   if (nextProps.value != this.props.value) {
  //     this.setState({ value: nextProps.value })
  //   }
  // }

  render(): ReactNode {
    return null
  }
}

export function createField(
  Component: ComponentClass | FunctionComponent | ForwardRefExoticComponent<any>,
  options: CreateFieldOption
) {
  return class extends BaseField<FieldProps, FieldState> {
    onChange(e: any) {
      const { onChange } = this.props
      let value = e
      if (options.outValue) {
        value = options.outValue.call(this, value)
      }
      if (options.getValueFromEvent) {
        value = options.getValueFromEvent(e)
      }
      if (onChange) onChange(value)
    }
    render(): ReactNode {
      const { editable } = this.props
      const { unEditableRender } = options
      let value = this.props.value
      if (options.inValue) {
        value = options.inValue.call(this, value)
      }
      let props = {
        value,
      }
      if (options.propsMap) {
        props = { ...props, ...options.propsMap(this.props) }
      }
      if (editable) {
        return React.createElement<any>(Component, {
          ...props,
          ...((options.valuePropName && { [options.valuePropName]: props.value }) || {}),
          onChange: this.onChange.bind(this),
        })
      } else if (!!unEditableRender) {
        return unEditableRender.call(this, value)
      } else {
        return React.createElement("span", {}, toString(value))
      }
    }
  }
}
