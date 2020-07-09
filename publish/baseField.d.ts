import React, { ComponentClass, ForwardRefExoticComponent, FunctionComponent } from 'react';
import { CreateFieldOption, FieldProps, FieldState } from './types';
export declare class BaseField<P extends FieldProps, S extends FieldState> extends React.Component<FieldProps, FieldState> {
    static getDerivedStateFromProps(nextProps: Readonly<FieldProps>, preState: FieldState): FieldState;
    constructor(props: P);
    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
    getComponentProps(): Pick<import("./types").FieldSet, string | number>;
    protected onChange(v: any, ...args: any[]): void;
    protected onBlur(v: any, ...args: any[]): void;
}
export declare function createField(Component: ComponentClass | FunctionComponent | ForwardRefExoticComponent<any>, options: CreateFieldOption): {
    new (props: FieldProps): {
        render(): React.ReactNode;
        onChange(e: any): void;
        onBlur(v: any, ...args: any[]): void;
        shouldComponentUpdate(nextProps: Readonly<FieldProps>, nextState: Readonly<FieldState>, nextContext: any): boolean;
        getComponentProps(): Pick<import("./types").FieldSet, string | number>;
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
        componentWillReceiveProps?(nextProps: Readonly<FieldProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<FieldProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<FieldProps>, nextState: Readonly<FieldState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<FieldProps>, nextState: Readonly<FieldState>, nextContext: any): void;
    };
    getDerivedStateFromProps(nextProps: Readonly<FieldProps>, preState: FieldState): FieldState;
    contextType?: React.Context<any> | undefined;
};
