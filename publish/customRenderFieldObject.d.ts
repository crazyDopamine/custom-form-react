import { CustomRenderFieldState, CustomRenderFieldProps, FieldSet } from './types';
import { BaseField } from './baseField';
export declare class CustomRenderFieldObject<P extends CustomRenderFieldProps, S extends CustomRenderFieldState> extends BaseField<P, S> {
    constructor(props: P);
    protected createField(field: FieldSet): FieldSet;
}
