import { RuleItem } from '../validate.type';
export declare const demoProps: {
  editable: boolean;
  fieldLayout: {
    span: number;
    labelStyle: {
      width: string;
    };
    wrapperStyle: {
      width: string;
    };
  };
  fields: (
    | {
        key: string;
        label: string;
        type: string;
        required: boolean;
        br: boolean;
        allowClear: boolean;
        helpText: string;
        hidden: boolean;
        validator?: undefined;
        style?: undefined;
        editable?: undefined;
        optionKey?: undefined;
        options?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        span?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        fields?: undefined;
      }
    | {
        key: string;
        label: string;
        type: string;
        required: boolean;
        br: boolean;
        allowClear: boolean;
        helpText: string;
        hidden: boolean;
        validator: (
          value: any,
          op: {
            rule: RuleItem;
            values: {
              password: any;
            };
          }
        ) => Promise<unknown>;
        style?: undefined;
        editable?: undefined;
        optionKey?: undefined;
        options?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        span?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        fields?: undefined;
      }
    | {
        key: string;
        label: string;
        type: string;
        required: boolean;
        br: boolean;
        allowClear: boolean;
        style: {
          width: string;
        };
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        editable?: undefined;
        optionKey?: undefined;
        options?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        span?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        fields?: undefined;
      }
    | {
        key: string;
        label: string;
        type: string;
        required: boolean;
        br?: undefined;
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        editable?: undefined;
        optionKey?: undefined;
        options?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        span?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        fields?: undefined;
      }
    | {
        key: string;
        label: string;
        type: string;
        required: boolean;
        editable: boolean;
        br: boolean;
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        optionKey?: undefined;
        options?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        span?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        fields?: undefined;
      }
    | {
        key: string;
        label: string;
        type: string;
        required: boolean;
        editable: boolean;
        br: boolean;
        optionKey: string;
        options: {
          label: string;
          value: string;
        }[];
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        span?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        fields?: undefined;
      }
    | {
        key: string;
        label: string;
        type: string;
        dataSource: string[];
        required: boolean;
        editable: boolean;
        br: boolean;
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        optionKey?: undefined;
        options?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        span?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        fields?: undefined;
      }
    | {
        key: string;
        label: string;
        type: string;
        required: boolean;
        editable: boolean;
        br: boolean;
        options: {
          label: string;
          value: string;
        }[];
        mode: string;
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        optionKey?: undefined;
        dataSource?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        span?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        fields?: undefined;
      }
    | {
        key: string;
        label: string;
        type: string;
        required: boolean;
        editable: boolean;
        br: boolean;
        options: (
          | {
              label: string;
              value: string;
              children: {
                label: string;
                value: string;
              }[];
            }
          | {
              label: string;
              value: string;
              children?: undefined;
            }
        )[];
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        optionKey?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        span?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        fields?: undefined;
      }
    | {
        key: string;
        label: string;
        type: string;
        required: boolean;
        editable: boolean;
        rules: never[];
        br: boolean;
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        optionKey?: undefined;
        options?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        uploadType?: undefined;
        span?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        fields?: undefined;
      }
    | {
        key: string;
        label: string;
        type: string;
        required: boolean;
        editable: boolean;
        rules: never[];
        uploadType: string;
        br: boolean;
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        optionKey?: undefined;
        options?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        span?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
        fields?: undefined;
      }
    | {
        key: string;
        label: string;
        type: string;
        required: boolean;
        editable: boolean;
        span: number;
        br: boolean;
        fieldLayout: {
          span: number;
          wrapperStyle: {
            width: string;
          };
        };
        minLength: number;
        maxLength: number;
        fields: (
          | {
              type: string;
              span: number;
              br: boolean;
              fields: (
                | {
                    key: string;
                    label: string;
                    type: string;
                    required: boolean;
                    editable: boolean;
                    br: boolean;
                    options: {
                      label: string;
                      value: string;
                    }[];
                    allowClear?: undefined;
                  }
                | {
                    key: string;
                    label: string;
                    required: boolean;
                    br: boolean;
                    allowClear: boolean;
                    type?: undefined;
                    editable?: undefined;
                    options?: undefined;
                  }
                | {
                    key: string;
                    label: string;
                    type: string;
                    required: boolean;
                    br: boolean;
                    allowClear: boolean;
                    editable?: undefined;
                    options?: undefined;
                  }
              )[];
              key?: undefined;
              placeholder?: undefined;
              required?: undefined;
              allowClear?: undefined;
              style?: undefined;
              editable?: undefined;
            }
          | {
              key: string;
              placeholder: string;
              type: string;
              required: boolean;
              br: boolean;
              allowClear: boolean;
              style: {
                width: string;
              };
              span?: undefined;
              fields?: undefined;
              editable?: undefined;
            }
          | {
              key: string;
              placeholder: string;
              type: string;
              required: boolean;
              editable: boolean;
              br: boolean;
              span?: undefined;
              fields?: undefined;
              allowClear?: undefined;
              style?: undefined;
            }
          | {
              key: string;
              placeholder: string;
              type: string;
              required: boolean;
              br: boolean;
              allowClear: boolean;
              span: number;
              style: {
                width: string;
              };
              fields?: undefined;
              editable?: undefined;
            }
        )[];
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        optionKey?: undefined;
        options?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
      }
    | {
        label: string;
        type: string;
        span: number;
        br: boolean;
        fields: (
          | {
              key: string;
              label: string;
              type: string;
              required: boolean;
              editable: boolean;
              br: boolean;
              options: {
                label: string;
                value: string;
              }[];
              allowClear?: undefined;
            }
          | {
              key: string;
              label: string;
              type: string;
              required: boolean;
              br: boolean;
              allowClear: boolean;
              editable?: undefined;
              options?: undefined;
            }
        )[];
        key?: undefined;
        required?: undefined;
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        editable?: undefined;
        optionKey?: undefined;
        options?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
      }
    | {
        label: string;
        type: string;
        required: boolean;
        editable: boolean;
        span: number;
        br: boolean;
        fields: (
          | {
              key: string;
              label: string;
              type: string;
              options: {
                label: string;
                value: string;
                children: {
                  label: string;
                  value: string;
                }[];
              }[];
              required: boolean;
              editable: boolean;
              br: boolean;
            }
          | {
              key: string;
              label: string;
              type: string;
              required: boolean;
              editable: boolean;
              br: boolean;
              options?: undefined;
            }
        )[];
        key?: undefined;
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        optionKey?: undefined;
        options?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
      }
    | {
        label: string;
        type: string;
        span: number;
        br: boolean;
        fields: (
          | {
              key: string;
              label: string;
              type: string;
              dataSource: string[];
              required: boolean;
              editable: boolean;
              br: boolean;
            }
          | {
              key: string;
              label: string;
              type: string;
              required: boolean;
              editable: boolean;
              br: boolean;
              dataSource?: undefined;
            }
        )[];
        key?: undefined;
        required?: undefined;
        allowClear?: undefined;
        helpText?: undefined;
        hidden?: undefined;
        validator?: undefined;
        style?: undefined;
        editable?: undefined;
        optionKey?: undefined;
        options?: undefined;
        dataSource?: undefined;
        mode?: undefined;
        rules?: undefined;
        uploadType?: undefined;
        fieldLayout?: undefined;
        minLength?: undefined;
        maxLength?: undefined;
      }
  )[];
};
