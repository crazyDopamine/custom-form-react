import React from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { BaseField } from "../../../baseField";
import { FieldProps, FieldSet, FieldState } from "../../../types";
export default class extends BaseField<FieldProps, FieldState> {
    onChange(e: CheckboxChangeEvent): void;
    getComponentProps(): FieldSet;
    render(): React.ReactNode;
}
