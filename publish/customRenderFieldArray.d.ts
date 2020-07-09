import { CustomRenderFieldState, CustomRenderFieldProps, FieldSet } from './types';
import { BaseField } from './baseField';
export declare class CustomRenderFieldArray<
  P extends CustomRenderFieldProps,
  S extends CustomRenderFieldState
> extends BaseField<P, S> {
  constructor(props: P);
  add(data?: any): void;
  remove(index: number): void;
  createField(field: FieldSet, rowIndex: number): FieldSet;
}
