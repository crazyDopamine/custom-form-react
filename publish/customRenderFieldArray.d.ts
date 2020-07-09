import { CustomRenderFieldState, CustomRenderFieldProps, FieldSet } from './types';
import { BaseField } from './baseField';
export declare class CustomRenderFieldArray<P extends CustomRenderFieldProps, S extends CustomRenderFieldState> extends BaseField<P, S> {
    constructor(props: P);
    protected add(data?: any): void;
    protected remove(index: number): void;
    protected createField(field: FieldSet, rowIndex: number): FieldSet;
}
