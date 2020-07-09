// import React from "react"
import { BaseField } from './baseField';
import { CustomRenderFieldState, CustomRenderFieldProps } from './types';

export class CustomRenderField<
  P extends CustomRenderFieldProps,
  S extends CustomRenderFieldState
> extends BaseField<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {} as S;
  }
}
