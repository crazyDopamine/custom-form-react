#custom-form-react

`npm install custom-form-react`

<div>
    自定义表单-customForm
    <br />
    className:表单class
    <br />
    fieldLayout:字段布局总体配置
    <br />
    fieldLayout.span:每个字段默认占用宽度（一行总共24）
    <br />
    fieldLayout.labelStyle:字段label样式
    <br />
    fieldLayout.wrapperStyle:字段组件容器样式
    <br />
    beforeRender?(fields: FieldSet[], value: object): FieldSet[]==渲染前回调，可修改fields配置
    <br />
    <br />
    fields:表单字段配置
    <br />
    fields.field共有配置:
    <div style={{ paddingLeft: "20px" }}>
      key?: string 参数名
      <br />
      label?: string 显示名
      <br />
      type?: string 组件类型
      <br />
      editable?: boolean 是否可编辑(参数传给组件需组件判断处理)
      <br />
      validator?(value: any, validatorOption: ValidatorOption): Promise 验证器，自定义验证支持异步
      <br />
      required?: boolean 是否必填
      <br />
      rules?: RuleItem[] 验证规则
      <br />
      onChange?(v: any, option: FieldSetOnChangeOption, ...args: any[]): void onChange回调
      <br />
      customFieldSet?(values: any[], field: FieldSet): FieldSet
      配置自定义方法，最终渲染方法返回的配置
      <br />
      span?:字段占用宽度（一行总共24）
      <br />
      labelStyle:字段显示名样式
      <br />
      wrapperStyle:字段组件容器样式
    </div>
    <br />
    输入框-type:input/textarea/inputGroup配置:参考
    <a href="https://3x.ant.design/components/input-cn/" target="_blank" rel="noopener noreferrer">
      antd-input
    </a>
    组件配置
    <br />
    <br />
    开关-type:switch配置:参考
    <a href="https://3x.ant.design/components/switch-cn/" target="_blank" rel="noopener noreferrer">
      antd-switch
    </a>
    组件配置
    <br />
    <br />
    多选框-type:checkout/checkoutGroup配置:参考
    <a
      href="https://3x.ant.design/components/checkbox-cn/"
      target="_blank"
      rel="noopener noreferrer">
      antd-switch
    </a>
    组件配置
    <br />
    <br />
    自动完成-type:autoComplete配置:参考
    <a
      href="https://3x.ant.design/components/auto-complete-cn/"
      target="_blank"
      rel="noopener noreferrer">
      antd-autoComplete
    </a>
    组件配置
    <br />
    <br />
    级联选择-type:cascader配置:参考
    <a
      href="https://3x.ant.design/components/cascader-cn/"
      target="_blank"
      rel="noopener noreferrer">
      antd-cascader
    </a>
    组件配置
    <br />
    <br />
    日期-type:datePicker/monthPicker/weekPicker/rangePicker配置:参考
    <a
      href="https://3x.ant.design/components/date-picker-cn/"
      target="_blank"
      rel="noopener noreferrer">
      antd-datePicker
    </a>
    组件配置
    <br />
    <br />
    数字输入框-type:inputNumber配置:参考
    <a
      href="https://3x.ant.design/components/input-number-cn/"
      target="_blank"
      rel="noopener noreferrer">
      antd-inputNumber
    </a>
    组件配置
    <br />
    <br />
    单选框-type:radioGroup配置:参考
    <a href="https://3x.ant.design/components/radio-cn/" target="_blank" rel="noopener noreferrer">
      antd-radioGroup
    </a>
    组件配置
    <br />
    <br />
    选择器-type:select配置:参考
    <a href="https://3x.ant.design/components/select-cn/" target="_blank" rel="noopener noreferrer">
      antd-select
    </a>
    组件配置
    <br />
    <br />
    树选择-type:treeSelect配置:参考
    <a
      href="https://3x.ant.design/components/tree-select-cn/"
      target="_blank"
      rel="noopener noreferrer">
      antd-treeSelect
    </a>
    组件配置
    <br />
    <br />
    时间选择框-type:timePicker配置:参考
    <a
      href="https://3x.ant.design/components/time-picker-cn/"
      target="_blank"
      rel="noopener noreferrer">
      antd-timePicker
    </a>
    组件配置
    <br />
    <br />
    数组-type:array配置:
    <br />
    fieldLayout:字段默认布局配置
    <br />
    fields:同表单fields配置
    <br />
    removeBtnRender:删除按钮自定义渲染(onRemove) =React.ReactNode
    <br />
    addBtnRender:添加按钮自定义渲染(onAdd) =React.ReactNode
    <br />
    <br />
    方法:
    <br />
    getValue(): BaseFormValue == 获取表单参数
    <br />
    setValue(value: BaseFormValue, reset: boolean = false): void == 设置表单值
    <br />
    reset(fieldKeys?: string[]): void == 重设表单值
    <br />
    validate( fieldKeys?: string[], isShowMsg: boolean = true, isClear: boolean = true ):
    Promise&lt;ValidateResult&gt; == 验证表单并获取表单值
  </div>
`const demoProps = { editable: true, fieldLayout: { span: 12, labelStyle: { width: "200px", }, wrapperStyle: { width: "calc(100% - 200px)", }, }, fields: [ { key: "input", label: "input", type: "input", required: true, br: false, allowClear: true, helpText: "请输入", hidden: true, // prefix: <Icon type="mobile" />, // onChange: (...args: any[]) => { // console.log(args) // }, }, { key: "password", label: "password", type: "password", required: true, br: false, allowClear: true, helpText: "请输入", hidden: false, // prefix: <Icon type="mobile" />, }, { key: "password1", label: "password1", type: "password", required: true, br: false, allowClear: true, helpText: "请输入", hidden: false, validator: (value: any, op: { rule: RuleItem; values: { password: any } }) => { return new Promise(resolve => { if (value == op.values.password) { resolve({ key: op.rule.key, valid: true }) } else { resolve({ key: op.rule.key, valid: false, message: "两次输入的密码不一致" }) } }) }, }, { key: "textarea", label: "textarea", type: "textarea", required: true, br: true, allowClear: true, style: { width: "100%" }, }, { key: "switch", label: "switch", type: "switch", required: true, }, { key: "checkbox", label: "checkbox", type: "checkbox", required: true, editable: true, br: false, }, { key: "checkboxGroup", label: "checkboxGroup", type: "checkboxGroup", required: true, editable: true, br: false, optionKey: "checkboxGroup", options: [ { label: "test1", value: "test1" }, { label: "test2", value: "test2" }, ], }, { key: "autoComplete", label: "autoComplete", type: "autoComplete", dataSource: ["11111", "test1111"], required: true, editable: true, br: false, }, { key: "cascader", label: "cascader", type: "cascader", options: [ { label: "test1", value: "test1", children: [{ label: "test2", value: "test2" }] }, { label: "test333", value: "test3", children: [{ label: "test444", value: "test4" }] }, ], required: true, editable: false, br: false, }, { key: "datePicker", label: "datePicker", type: "datePicker", required: true, editable: false, br: false, }, { key: "monthPicker", label: "monthPicker", type: "monthPicker", required: true, editable: true, br: false, }, { key: "weekPicker", label: "weekPicker", type: "weekPicker", required: true, editable: true, br: false, }, { key: "rangePicker", label: "rangePicker", type: "rangePicker", required: true, editable: true, br: false, }, { key: "duration", label: "duration", type: "duration", required: true, editable: true, br: false, }, { key: "timeRange", label: "timeRange", type: "timeRange", required: true, editable: true, br: false, }, { key: "inputNumber", label: "inputNumber", type: "inputNumber", required: true, editable: true, br: false, }, { key: "radioGroup", label: "radioGroup", type: "radioGroup", required: true, editable: false, br: false, options: [ { label: "test1", value: "test1" }, { label: "test2", value: "test2" }, ], }, { key: "select", label: "select", type: "select", required: true, editable: false, br: false, options: [ { label: "test1", value: "test1" }, { label: "test2", value: "test2" }, { label: "test3", value: "test3" }, ], mode: "multiple", // onChange: (v: any, o: {}, op: { props: { data: any } }) => { // console.log(v, op.props) // }, }, { key: "treeSelect", label: "treeSelect", type: "treeSelect", required: true, editable: true, br: false, options: [ { label: "test111111", value: "test1", children: [{ label: "test3", value: "test3" }] }, { label: "test2", value: "test2" }, ], }, { key: "timePicker", label: "timePicker", type: "timePicker", required: true, editable: true, br: false, }, { key: "upload", label: "upload", type: "upload", required: true, editable: true, rules: [], br: true, }, { key: "upload2", label: "upload2", type: "upload", required: true, editable: true, rules: [], uploadType: "file", br: false, }, { key: "array", label: "array", type: "array", required: true, editable: true, span: 24, br: true, fieldLayout: { span: 8, wrapperStyle: { width: "100%" } }, minLength: 2, maxLength: 3, fields: [ { type: "inputGroup", span: 24, br: false, fields: [ { key: "select", label: "select", type: "select", required: true, editable: true, br: false, options: [ { label: "test1", value: "test1" }, { label: "test2", value: "test2" }, ], }, { key: "input1", label: "input1", required: true, br: false, allowClear: true, }, { key: "input2", label: "input2", type: "input2", required: true, br: false, allowClear: true, }, ], }, { key: "input", placeholder: "input", type: "input", required: true, br: false, allowClear: true, style: { width: "100%" }, }, { key: "input2", placeholder: "input2", type: "input", required: true, br: false, allowClear: true, style: { width: "100%" }, }, { key: "switch", placeholder: "switch", type: "switch", required: true, editable: true, br: false, }, { key: "textarea", placeholder: "textarea", type: "textarea", required: true, br: false, allowClear: true, span: 24, style: { width: "100%" }, }, { type: "inputGroup", span: 24, br: true, fields: [ { key: "select", label: "select", type: "select", required: true, editable: true, br: false, options: [ { label: "test1", value: "test1" }, { label: "test2", value: "test2" }, ], }, { key: "input1", label: "input1", type: "input", required: true, br: false, allowClear: true, }, { key: "input2", label: "input2", type: "input2", required: true, br: false, allowClear: true, }, ], }, ], }, { label: "inputGroup1", type: "inputGroup", span: 24, br: true, fields: [ { key: "select", label: "select", type: "select", required: true, editable: true, br: false, options: [ { label: "test1", value: "test1" }, { label: "test2", value: "test2" }, ], }, { key: "input1", label: "input1", type: "input", required: true, br: false, allowClear: true, }, { key: "input2", label: "input2", type: "input2", required: true, br: false, allowClear: true, }, ], }, { label: "inputGroup2", type: "inputGroup", required: true, editable: true, span: 24, br: true, fields: [ { key: "cascader", label: "cascader", type: "cascader", options: [ { label: "test1", value: "test1", children: [{ label: "test2", value: "test2" }], }, ], required: true, editable: true, br: false, }, { key: "datePicker", label: "datePicker", type: "datePicker", required: true, editable: true, br: false, }, { key: "monthPicker", label: "monthPicker", type: "monthPicker", required: true, editable: true, br: false, }, { key: "weekPicker", label: "weekPicker", type: "weekPicker", required: true, editable: true, br: false, }, ], }, { label: "inputGroup3", type: "inputGroup", span: 24, br: true, fields: [ { key: "autoComplete", label: "autoComplete", type: "autoComplete", dataSource: ["11111", "test1111"], required: true, editable: true, br: false, }, { key: "rangePicker", label: "rangePicker", type: "rangePicker", required: true, editable: true, br: false, }, { key: "inputNumber", label: "inputNumber", type: "inputNumber", required: true, editable: true, br: false, }, ], }, ], }`

`<CustomForm {...demoProps}/>`
