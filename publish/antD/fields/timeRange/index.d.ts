import React from "react";
import { BaseField } from "../../../baseField";
import { FieldProps, FieldSet, FieldState } from "../../../types";
import moment from "moment";
import "./index.scss";
export default class extends BaseField<FieldProps, FieldState> {
    component1: React.RefObject<any>;
    component2: React.RefObject<any>;
    constructor(props: FieldProps);
    onStartChange(e: moment.Moment | null, dateString: string): void;
    onEndChange(e: moment.Moment | null, dateString: string): void;
    focus(): any[];
    getStartComponentProps(): FieldSet;
    getEndComponentProps(): FieldSet;
    render(): JSX.Element;
}
