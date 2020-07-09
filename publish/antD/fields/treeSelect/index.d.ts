import React from 'react';
import { LabeledValue } from 'antd/es/tree-select';
import { FieldProps, FieldSet, FieldState } from '../../../types';
import { BaseField } from '../../../baseField';
export interface TreeSelectNode {
  label: string;
  value: string | number;
  children?: TreeSelectNode[];
  selectable?: boolean;
  checkable?: boolean;
  disableCheckbox?: boolean;
  disabled?: boolean;
  isLeaf?: boolean;
  [name: string]: any;
}
export interface State extends FieldState {
  optionMap: Map<any, TreeSelectNode>;
}
export default class extends BaseField<FieldProps, State> {
  constructor(props: FieldProps);
  componentWillReceiveProps(nextProps: Readonly<FieldProps>, nextContext: any): void;
  onChange(value: LabeledValue, label: any, extra: any): void;
  getComponentProps(): FieldSet;
  optionsRender(options: TreeSelectNode[]): JSX.Element[];
  render(): React.ReactNode;
}
