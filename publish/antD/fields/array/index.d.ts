import React from 'react';
import { CustomRenderFieldArray } from '../../../customRenderFieldArray';
import { CustomRenderFieldProps, CustomRenderFieldState, FieldSet } from '../../../types';
import './index.scss';
export default class Array extends CustomRenderFieldArray<
  CustomRenderFieldProps,
  CustomRenderFieldState
> {
  createField(field: FieldSet, rowIndex: number): FieldSet;
  shouldComponentUpdate(): boolean;
  render(): React.ReactNode;
}
