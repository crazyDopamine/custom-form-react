import React, { ChangeEvent, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import { BaseForm, registorComponent } from './baseForm';
import { BaseField } from './baseField';
import { FieldProps, FieldState } from './types';

class InputField extends BaseField<FieldProps, FieldState> {
  public constructor(props: FieldProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  public render(): ReactNode {
    const { value } = this.props;
    return <input value={value} onChange={this.onChange} />;
  }

  protected onChange(e: ChangeEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    if (onChange) onChange(e.target.value);
  }
}
registorComponent('input', InputField);

ReactDOM.render(
  <div>
    <BaseForm fields={[{ key: 'input', label: 'input', type: 'input' }]} />
  </div>,
  document.getElementById('root')
);
