import React from 'react';
import { BaseForm } from '../baseForm';
import './index.scss';
import { BaseFormProps, FieldProps, FormValidateTrigger, Rules } from '../types';
export * from './demoProps';
export * from './description';
export * from './onDemoRender';
declare class Form extends BaseForm {
  constructor(props: BaseFormProps);
  static defaultProps: {
    validateTrigger: FormValidateTrigger;
    validateFirst: boolean;
    initialValue: {};
    fields: never[];
    rules: Rules;
    fieldLayout: {
      span: number;
      labelStyle: {
        width: string;
      };
      wrapperStyle: {
        width: string;
      };
    };
  };
  formContainerRender: (children: React.ReactNode) => JSX.Element;
  formFieldContainerRender: (
    children: React.ReactNode,
    field: FieldProps,
    domKey: string
  ) => JSX.Element[];
  validateShowMessageFn: (msg: string) => void;
}
export default Form;
