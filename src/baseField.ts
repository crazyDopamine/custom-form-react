import React, {
  ComponentClass,
  ForwardRefExoticComponent,
  FunctionComponent,
  ReactNode
} from 'react';
import { CreateFieldOption, FieldProps, FieldState } from './types';
import { omit, toString } from 'lodash';
import { compareObj } from './util';

export class BaseField<P extends FieldProps, S extends FieldState> extends React.Component<
  FieldProps,
  FieldState
> {
  public static getDerivedStateFromProps(
    nextProps: Readonly<FieldProps>,
    preState: FieldState
  ): FieldState {
    const state: FieldState = {
      ...preState
    };
    if (nextProps.value !== preState.value) {
      state.value = nextProps.value;
    }
    return state;
  }

  public constructor(props: P) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  // public UNSAFE_componentWillReceiveProps(
  //   nextProps: Readonly<P>,
  //   nextContext: any
  // ): void {
  //   if (nextProps.value != this.props.value) {
  //     this.setState({ value: nextProps.value })
  //   }
  // }

  public shouldComponentUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    nextContext: any
  ): boolean {
    if (
      compareObj(nextProps, this.props, ['onChange', 'onBlur']) &&
      compareObj(nextState, this.state)
    )
      return false;
    return true;
  }

  public getComponentProps() {
    let props = omit(this.props.fieldSet, [
      'key',
      'label',
      'type',
      'editable',
      'asyncValidator',
      'validator',
      'required',
      'rules',
      'fields',
      'onChange',
      'customFieldSet'
    ]);
    return props;
  }

  protected onChange(v: any, ...args: any[]) {
    const { onChange } = this.props;
    if (onChange) onChange(v, ...args);
  }

  protected onBlur(v: any, ...args: any[]) {
    const { onBlur } = this.props;
    if (onBlur) onBlur(v, ...args);
  }
}

export function createField(
  Component: ComponentClass | FunctionComponent | ForwardRefExoticComponent<any>,
  options: CreateFieldOption
) {
  return class extends BaseField<FieldProps, FieldState> {
    public constructor(props: FieldProps) {
      super(props);
      this.onChange = this.onChange.bind(this);
      this.onBlur = this.onBlur.bind(this);
    }

    public render(): ReactNode {
      const { editable } = this.props;
      const { unEditableRender } = options;
      let value = this.props.value;
      if (options.inValue) {
        value = options.inValue.call(this, value);
      }
      let props = {
        value
      };
      if (options.propsMap) {
        props = { ...props, ...options.propsMap(this.props) };
      }
      if (editable) {
        return React.createElement<any>(Component, {
          ...props,
          ...((options.valuePropName && {
            [options.valuePropName]: props.value
          }) ||
            {}),
          onChange: this.onChange.bind(this)
        });
      } else if (unEditableRender) {
        return unEditableRender.call(this, value);
      } else {
        return React.createElement('span', {}, toString(value));
      }
    }
    public onChange(e: any) {
      const { onChange } = this.props;
      let value = e;
      if (options.outValue) {
        value = options.outValue.call(this, value);
      }
      if (options.getValueFromEvent) {
        value = options.getValueFromEvent(e);
      }
      if (onChange) onChange(value);
    }
    public onBlur(v: any, ...args: any[]) {
      const { onBlur } = this.props;
      if (onBlur) onBlur(v, ...args);
    }
  };
}
