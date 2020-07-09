import React, { ReactNode } from 'react';
import { SelectProps, SelectValue } from 'antd/es/select';
import { BaseField } from '../../../baseField';
import { FieldProps, FieldState } from '../../../types';
export interface SelectOption {
  key?: string | number | undefined;
  label?: string | undefined | ReactNode;
  value?: string | number | undefined;
  [name: string]: any;
}
export default class extends BaseField<FieldProps, FieldState> {
  constructor(props: FieldProps);
  onChange(value: SelectValue, option: React.ReactElement<any> | React.ReactElement<any>[]): void;
  getComponentProps(): SelectProps<SelectValue>;
  filterValue(value: any | any[]): string | string[] | undefined;
  getLabel(value: any | any[] | undefined): string;
  render(): React.ReactNode;
}
