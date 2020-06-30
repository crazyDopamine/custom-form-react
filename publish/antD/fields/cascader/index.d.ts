import React from "react";
import { CascaderOptionType, CascaderValueType } from "antd/es/cascader";
import { BaseField } from "../../../baseField";
import { FieldProps, FieldSet, FieldState } from "../../../types";
export interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}
export interface State extends FieldState {
    optionMap: Map<any, Option>;
}
export default class extends BaseField<FieldProps, State> {
    constructor(props: FieldProps);
    componentWillReceiveProps(nextProps: Readonly<FieldProps>, nextContext: any): void;
    onChange(value: CascaderValueType, selectedOptions?: CascaderOptionType[]): void;
    getComponentProps(): FieldSet;
    getLabel(): any;
    render(): React.ReactNode;
}
