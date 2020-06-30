import React, { ComponentClass, ForwardRefExoticComponent, FunctionComponent, ReactNode } from "react";
import { CreateFieldOption, FieldProps, FieldState } from "./types";
export declare class BaseField<P extends FieldProps, S extends FieldState> extends React.Component<P, S> {
    constructor(props: P);
    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void;
    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
    getComponentProps(): Pick<P["fieldSet"], Exclude<keyof P["fieldSet"], "key" | "label" | "onChange" | "editable" | "type" | "asyncValidator" | "validator" | "required" | "rules" | "fields" | "customFieldSet">>;
    inValue(v: any): any;
    outValue(v: any): any;
    onChange(v: any, ...args: any[]): void;
    onBlur(v: any, ...args: any[]): void;
    render(): ReactNode;
}
export declare function createField(Component: ComponentClass | FunctionComponent | ForwardRefExoticComponent<any>, options: CreateFieldOption): {
    new (props: FieldProps): {
        onChange(e: any): void;
        render(): React.ReactNode;
        componentWillReceiveProps(nextProps: Readonly<FieldProps>, nextContext: any): void;
        shouldComponentUpdate(nextProps: Readonly<FieldProps>, nextState: Readonly<FieldState>, nextContext: any): boolean;
        getComponentProps(): Pick<import("./types").FieldSet, string | number>;
        inValue(v: any): any;
        outValue(v: any): any;
        onBlur(v: any, ...args: any[]): void;
        context: any;
        setState<K extends string | number>(state: FieldState | ((prevState: Readonly<FieldState>, props: Readonly<FieldProps>) => FieldState | Pick<FieldState, K> | null) | Pick<FieldState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<FieldProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<FieldState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<FieldProps>, prevState: Readonly<FieldState>): any;
        componentDidUpdate?(prevProps: Readonly<FieldProps>, prevState: Readonly<FieldState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<FieldProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<FieldProps>, nextState: Readonly<FieldState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<FieldProps>, nextState: Readonly<FieldState>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
