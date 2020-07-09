import React, { ChangeEvent } from 'react';
import { FieldProps, FieldSet, FieldState } from '../../../types';
import { BaseField } from '../../../baseField';
export default class extends BaseField<FieldProps, FieldState> {
  onChange(e: ChangeEvent<HTMLTextAreaElement>): void;
  getComponentProps(): FieldSet;
  render(): React.ReactNode;
}
