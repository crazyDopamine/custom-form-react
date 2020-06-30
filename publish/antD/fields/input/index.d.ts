import React, { ChangeEvent } from "react";
import { BaseField } from "../../../baseField";
import { FieldProps, FieldSet, FieldState } from "../../../types";
export default class extends BaseField<FieldProps, FieldState> {
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    getComponentProps(): FieldSet;
    render(): React.ReactNode;
}
