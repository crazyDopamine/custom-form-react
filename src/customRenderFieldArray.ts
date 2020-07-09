import { CustomRenderFieldState, CustomRenderFieldProps, FieldSet } from './types';
import { BaseField } from './baseField';

export class CustomRenderFieldArray<
  P extends CustomRenderFieldProps,
  S extends CustomRenderFieldState
> extends BaseField<P, S> {
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
  public constructor(props: P) {
    super(props);
  }
  protected add(data?: any) {
    const { value, onChange } = this.props;
    if (onChange) onChange([...(value || []), data || {}]);
  }
  protected remove(index: number) {
    const { value, onChange } = this.props;
    if (onChange) onChange((value || []).filter((item: object, i: number) => i != index));
  }
  protected createField(field: FieldSet, rowIndex: number): FieldSet {
    const { fieldSet } = this.props;
    return {
      ...field,
      key: `${fieldSet.key}[${rowIndex}].${field.key}`
    };
  }
}
