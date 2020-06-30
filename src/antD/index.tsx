import React from "react"
import { BaseForm, registorComponent } from "../baseForm"
import { createField } from "../baseField"
import AutoComplete from "antd/es/auto-complete"
import Checkbox from "antd/es/checkbox"
import Cascader from "./fields/cascader"
import DatePicker from "antd/es/date-picker"
import InputNumber from "antd/es/input-number"
import Switch from "antd/es/switch"
import Radio from "antd/es/radio"
import TimePicker from "antd/es/time-picker"
import AntDInput from "antd/es/input"
import { pick } from "lodash"

import Array from "./fields/array"
import Input from "./fields/input"
import Textarea from "./fields/textarea"
import TreeSelect from "./fields/treeSelect"
import Select, { SelectOption } from "./fields/select"
import Duration from "./fields/duration"
import InputGroup from "./fields/inputGroup"
import TimeRange from "./fields/timeRange"
import GWYCheckbox from "./fields/checkbox"
import "./index.scss"
import { BaseFormProps, FieldProps, FormValidateTrigger, Rules } from "../types"
import moment from "moment"
const { Password } = AntDInput
export * from "./demoProps"
export * from "./description"
export * from "./onDemoRender"
//默认布局配置
const defaultFieldLayout = {
  span: 24,
  labelStyle: {
    width: "200px",
  },
  wrapperStyle: {
    width: "calc(100% - 200px)",
  },
}

class Form extends BaseForm {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: BaseFormProps) {
    super(props)
  }
  static defaultProps = {
    validateTrigger: FormValidateTrigger.onChange,
    validateFirst: false,
    initialValue: {},
    fields: [],
    rules: {} as Rules,
    fieldLayout: defaultFieldLayout,
  }

  formContainerRender = (children: React.ReactNode) => {
    const { className } = this.props
    return <div className={["gwy-form", className].filter(Boolean).join(" ")}>{children}</div>
  }
  formFieldContainerRender = (children: React.ReactNode, field: FieldProps, domKey: string) => {
    const { fieldLayout } = this.props
    const { fieldSet, error } = field
    const layout = {
      ...fieldLayout,
      ...pick(fieldSet, ["span", "fieldStyle", "labelStyle", "wrapperStyle"]),
    }
    let width = "100%"
    if (layout.span) {
      width = `${((100 / 24) * layout.span).toFixed(2)}%`
    }
    return [
      fieldSet.br && <br key={domKey + "-br"} />,
      <div className="gwy-form-field" key={domKey} style={{ width, ...(layout.fieldStyle || {}) }}>
        {!!field.fieldSet.label && (
          <div className="gwy-form-field-label" style={layout.labelStyle}>
            {field.fieldSet.label}
            {field.editable && field.fieldSet.required && <span className="label-required">*</span>}
            :
          </div>
        )}
        <div
          className={["gwy-form-field-component", error && "has-error"].filter(Boolean).join(" ")}
          style={layout.wrapperStyle}>
          {children}
          {error && <div className="error-msg">{error.message}</div>}
          {!!field.fieldSet.helpText && <div className="help-text">{field.fieldSet.helpText}</div>}
        </div>
      </div>,
    ].filter(Boolean)
  }
  validateShowMessageFn = (msg: string) => {
    console.log(msg)
  }
}

registorComponent("array", Array)
registorComponent("input", Input)
registorComponent(
  "password",
  createField(Password, {
    getValueFromEvent: e => e.target.value,
    propsMap: (fieldProps: FieldProps) => ({
      ...pick(fieldProps.fieldSet, [
        "addonAfter",
        "addonBefore",
        "defaultValue",
        "disabled",
        "id",
        "maxLength",
        "prefix",
        "size",
        "suffix",
        "onPressEnter",
        "allowClear",
        "placeholder",
        "style",
        "className",
        "onBlur",
      ]),
    }),
    unEditableRender(v: any) {
      return <span>******</span>
    },
  })
)
registorComponent("textarea", Textarea)
registorComponent(
  "switch",
  createField(Switch, {
    valuePropName: "checked",
    propsMap: (fieldProps: FieldProps) => ({
      ...pick(fieldProps.fieldSet, [
        "autoFocus",
        "checkedChildren",
        "defaultChecked",
        "disabled",
        "loading",
        "size",
        "unCheckedChildren",
        "onClick",
        "className",
        "style",
      ]),
    }),
  })
)
registorComponent("checkbox", GWYCheckbox)
registorComponent(
  "checkboxGroup",
  createField(Checkbox.Group, {
    propsMap: (fieldProps: FieldProps) => ({
      ...pick(fieldProps.fieldSet, ["defaultValue", "disabled", "name", "options"]),
      ...((!!fieldProps.options && { options: fieldProps.options }) || {}),
    }),
    unEditableRender(v: any[] | undefined) {
      const options = this.props.options || this.props.fieldSet.options
      const getLabel = (v: any) => {
        const item = options.find((i: SelectOption) => i.value == v)
        if (item) {
          return item.label
        } else {
          return v
        }
      }
      return <span className="un-editable-text">{!!v && v.map(getLabel).join(",")}</span>
    },
  })
)
registorComponent(
  "autoComplete",
  createField(AutoComplete, {
    propsMap: (fieldProps: FieldProps) => ({
      placeholder: fieldProps.fieldSet.label,
      ...pick(fieldProps.fieldSet, [
        "allowClear",
        "autoFocus",
        "backfill",
        "children",
        "dropdownMenuStyle",
        "defaultActiveFirstOption",
        "defaultValue",
        "disabled",
        "filterOption",
        "getPopupContainer",
        "optionLabelProp",
        "placeholder",
        "onBlur",
        "onFocus",
        "onSearch",
        "onSelect",
        "defaultOpen",
        "open",
        "onDropdownVisibleChange",
        "style",
        "className",
      ]),
      ...((!!fieldProps.options && { options: fieldProps.options }) || {}),
    }),
    unEditableRender(v: any) {
      return <span className="un-editable-text">{v}</span>
    },
  })
)
registorComponent("cascader", Cascader)
registorComponent(
  "datePicker",
  createField(DatePicker, {
    propsMap: (fieldProps: FieldProps) => ({
      placeholder: fieldProps.fieldSet.label,
      ...pick(fieldProps.fieldSet, [
        "allowClear",
        "autoFocus",
        "className",
        "dateRender",
        "disabled",
        "disabledDate",
        "dropdownClassName",
        "getCalendarContainer",
        "locale",
        "mode",
        "open",
        "optionLabelProp",
        "placeholder",
        "popupStyle",
        "size",
        "suffixIcon",
        "style",
        "onOpenChange",
        "onPanelChange",
        "defaultValue",
        "defaultPickerValue",
        "disabledTime",
        "format",
        "renderExtraFooter",
        "showTime",
        "showToday",
        "onOk",
      ]),
    }),
    inValue: (v: number) => (v && moment(v, "x")) || undefined,
    outValue: (v: moment.Moment) => (v && v.format("x")) || undefined,
    unEditableRender(v: moment.Moment | undefined) {
      const { format } = this.props.fieldSet
      return <span className="un-editable-text">{!!v && v.format(format || "YYYY-MM-DD")}</span>
    },
  })
)
registorComponent(
  "monthPicker",
  createField(DatePicker.MonthPicker, {
    propsMap: (fieldProps: FieldProps) => ({
      ...pick(fieldProps.fieldSet, [
        "allowClear",
        "autoFocus",
        "className",
        "dateRender",
        "disabled",
        "disabledDate",
        "dropdownClassName",
        "getCalendarContainer",
        "locale",
        "mode",
        "open",
        "optionLabelProp",
        "placeholder",
        "popupStyle",
        "size",
        "suffixIcon",
        "style",
        "onOpenChange",
        "onPanelChange",
        "defaultValue",
        "defaultPickerValue",
        "format",
        "monthCellContentRender",
        "renderExtraFooter",
      ]),
      placeholder: fieldProps.fieldSet.label,
    }),
    inValue: (v: number) => (v && moment(v, "x")) || undefined,
    outValue: (v: moment.Moment) => (v && v.format("x")) || undefined,
    unEditableRender(v: moment.Moment | undefined) {
      const { format } = this.props.fieldSet
      return <span className="un-editable-text">{!!v && v.format(format || "YYYY-MM")}</span>
    },
  })
)
registorComponent(
  "weekPicker",
  createField(DatePicker.WeekPicker, {
    propsMap: (fieldProps: FieldProps) => ({
      ...pick(fieldProps.fieldSet, [
        "allowClear",
        "autoFocus",
        "className",
        "dateRender",
        "disabled",
        "disabledDate",
        "dropdownClassName",
        "getCalendarContainer",
        "locale",
        "mode",
        "open",
        "optionLabelProp",
        "placeholder",
        "popupStyle",
        "size",
        "suffixIcon",
        "style",
        "onOpenChange",
        "onPanelChange",
        "defaultValue",
        "defaultPickerValue",
        "format",
        "renderExtraFooter",
      ]),
      placeholder: fieldProps.fieldSet.label,
    }),
    inValue: (v: number) => (v && moment(v, "x")) || undefined,
    outValue: (v: moment.Moment) => (v && v.format("x")) || undefined,
    unEditableRender(v: moment.Moment | undefined) {
      const { format } = this.props.fieldSet
      return <span className="un-editable-text">{!!v && v.format(format || "YYYY-wo")}</span>
    },
  })
)
registorComponent(
  "rangePicker",
  createField(DatePicker.RangePicker, {
    propsMap: (fieldProps: FieldProps) => ({
      placeholder: ["开始时间", "结束时间"],
      ...pick(fieldProps.fieldSet, [
        "allowClear",
        "autoFocus",
        "className",
        "dateRender",
        "disabled",
        "disabledDate",
        "dropdownClassName",
        "getCalendarContainer",
        "locale",
        "mode",
        "open",
        "optionLabelProp",
        "placeholder",
        "popupStyle",
        "size",
        "suffixIcon",
        "style",
        "onOpenChange",
        "onPanelChange",
        "defaultValue",
        "defaultPickerValue",
        "disabledTime",
        "format",
        "ranges",
        "separator",
        "showTime",
        "renderExtraFooter",
        "onCalendarChange",
        "onOk",
      ]),
    }),
    inValue: (v: number[]) => (v && v.map(i => (i && moment(i, "x")) || undefined)) || undefined,
    outValue: (v: moment.Moment[]) =>
      (v && v.map(i => (i && i.format("x")) || undefined)) || undefined,
    unEditableRender(v: moment.Moment[] | undefined) {
      const { format } = this.props.fieldSet
      return (
        <span className="un-editable-text">
          {!!v && v[0] && moment(v[0], "x").format(format || "YYYY-MM-DD")}
          {!!v && (v[0] || v[1]) && "~"}
          {!!v && v[1] && moment(v[1], "x").format(format || "YYYY-MM-DD")}
        </span>
      )
    },
  })
)
registorComponent("duration", Duration)
registorComponent(
  "inputNumber",
  createField(InputNumber, {
    propsMap: (fieldProps: FieldProps) => ({
      placeholder: fieldProps.fieldSet.label,
      ...pick(fieldProps.fieldSet, [
        "autoFocus",
        "defaultValue",
        "disabled",
        "formatter",
        "max",
        "min",
        "parser",
        "precision",
        "decimalSeparator",
        "size",
        "step",
        "onPressEnter",
        "style",
        "className",
        "placeholder",
      ]),
    }),
    unEditableRender(v: any) {
      return <span>{v}</span>
    },
  })
)

registorComponent(
  "radioGroup",
  createField(Radio.Group, {
    getValueFromEvent: e => e.target.value,
    propsMap: (fieldProps: FieldProps) => ({
      placeholder: fieldProps.fieldSet.label,
      ...pick(fieldProps.fieldSet, [
        "defaultValue",
        "disabled",
        "name",
        "options",
        "size",
        "buttonStyle",
        "style",
        "className",
      ]),
      ...((!!fieldProps.options && { options: fieldProps.options }) || {}),
    }),
    unEditableRender(v: any) {
      const options = this.props.options || this.props.fieldSet.options || []
      const op = options.find((i: { label: string; value: any }) => i.value == v)
      return <div style={{ marginTop: "4px" }}>{op && op.label}</div>
    },
  })
)

registorComponent("treeSelect", TreeSelect)
registorComponent("select", Select)

registorComponent(
  "timePicker",
  createField(TimePicker, {
    propsMap: (fieldProps: FieldProps) => ({
      placeholder: fieldProps.fieldSet.label,
      ...pick(fieldProps.fieldSet, [
        "addon",
        "allowClear",
        "autoFocus",
        "className",
        "clearText",
        "defaultOpenValue",
        "defaultValue",
        "disabled",
        "disabledHours",
        "disabledMinutes",
        "disabledSeconds",
        "format",
        "getPopupContainer",
        "hideDisabledOptions",
        "hourStep",
        "inputReadOnly",
        "minuteStep",
        "open",
        "placeholder",
        "popupClassName",
        "popupStyle",
        "secondStep",
        "suffixIcon",
        "clearIcon",
        "use12Hours",
        "onOpenChange",
        "style",
      ]),
    }),
  })
)

registorComponent("inputGroup", InputGroup)
registorComponent("timeRange", TimeRange)

export default Form
