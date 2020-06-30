import React from "react"

export const description = (
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
)
