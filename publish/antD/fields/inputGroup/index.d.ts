import React from "react";
import { CustomRenderFieldObject } from "../../../customRenderFieldObject";
import { CustomRenderFieldProps, CustomRenderFieldState, FieldSet } from "../../../types";
export default class extends CustomRenderFieldObject<CustomRenderFieldProps, CustomRenderFieldState> {
    shouldComponentUpdate(): boolean;
    createField(field: FieldSet): FieldSet;
    render(): React.ReactNode;
}
