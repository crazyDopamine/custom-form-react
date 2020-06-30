import React from "react";
import { BaseField } from "../../../baseField";
import { FieldProps, FieldState } from "../../../types";
import "./index.scss";
export default class extends BaseField<FieldProps, FieldState> {
    component1: React.RefObject<any>;
    component2: React.RefObject<any>;
    onHourChange(e: number | string | undefined): void;
    onMinuteChange(e: number | string | undefined): void;
    focus(): any[];
    render(): JSX.Element;
}
