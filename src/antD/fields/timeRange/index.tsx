import React, { createRef } from "react"
import { TimePicker } from "antd"
import { BaseField } from "../../../baseField"
import { FieldProps, FieldSet, FieldState } from "../../../types"
import moment from "moment"
import { pick } from "lodash"
import "./index.scss"

const componentPropsKey = [
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
]

export default class extends BaseField<FieldProps, FieldState> {
  // @ts-ignore
  component1 = createRef<TimePicker>()
  // @ts-ignore
  component2 = createRef<TimePicker>()
  constructor(props: FieldProps) {
    super(props)
    this.onStartChange = this.onStartChange.bind(this)
    this.onEndChange = this.onEndChange.bind(this)
  }
  onStartChange(e: moment.Moment | null, dateString: string): void {
    const { value } = this.state
    const { onChange } = this.props
    let v = e && e.format("x")
    if (!!value && value[1] && v && v > value[1]) {
      v = value[1]
    }
    let newValue: any[] | undefined = [v, (!!value && value[1]) || undefined]
    if (!newValue[0] && !newValue[1]) {
      newValue = undefined
    }
    this.setState({ value: newValue })
    if (onChange) {
      onChange(newValue)
    }
  }

  onEndChange(e: moment.Moment | null, dateString: string) {
    const { value } = this.state
    const { onChange } = this.props
    let v = e && e.format("x")
    if (!!value && value[0] && v && v < value[0]) {
      v = value[0]
    }
    let newValue: any[] | undefined = [(!!value && value[0]) || undefined, v]
    if (!newValue[0] && !newValue[1]) {
      newValue = undefined
    }
    this.setState({ value: newValue })
    if (onChange) {
      onChange(newValue)
    }
  }

  focus() {
    return [
      this.component1 && this.component1.current && this.component1.current.focus(),
      this.component2 && this.component2.current && this.component2.current.focus(),
    ]
  }

  getStartComponentProps(): FieldSet {
    const { fieldSet } = this.props
    return {
      placeholder: "开始时间",
      format: fieldSet.format,
      ...pick(fieldSet.startPicker || {}, componentPropsKey),
    }
  }

  getEndComponentProps(): FieldSet {
    const { fieldSet } = this.props
    return {
      placeholder: "结束时间",
      format: fieldSet.format,
      ...pick(fieldSet.endPicker || {}, componentPropsKey),
    }
  }

  // disabledHourTime(index: 0 | 1) {
  //   const { value } = this.state
  //   if (!!value && value[index]) {
  //     let hours = fill(new Array(24), "").map((i, index) => index)
  //     if (index == 0) {
  //       const hasLitter =
  //         moment(value[index], "x").diff(moment(value[index], "x").endOf("hour")) < -1000
  //       const startHour = Number(moment(value[index], "x").format("H"))
  //       hours = hours.filter(i => {
  //         return hasLitter ? i < startHour : i <= startHour
  //       })
  //     } else if (index == 1) {
  //       const hasLitter =
  //         moment(value[index], "x").diff(moment(value[index], "x").startOf("hour")) > 0
  //       const endHour = Number(moment(value[index], "x").format("H"))
  //       hours = hours.filter(i => {
  //         return hasLitter ? i > endHour : i >= endHour
  //       })
  //     }
  //     return hours
  //   } else {
  //     return []
  //   }
  // }

  render() {
    const { editable, fieldSet, value } = this.props
    if (editable) {
      return (
        <ul className="time-range-area">
          <li className="time-range-start">
            <TimePicker
              value={(value && value[0] && moment(value[0], "x")) || null}
              {...this.getStartComponentProps()}
              onChange={this.onStartChange}
              ref={ins => (this.component1 = ins)}
              // disabledHours={this.disabledHourTime.bind(this, 1)}
            />
          </li>
          <li className="time-range-split">~</li>
          <li className="time-range-end">
            <TimePicker
              value={(value && value[1] && moment(value[1], "x")) || undefined}
              {...this.getEndComponentProps()}
              onChange={this.onEndChange}
              ref={ins => (this.component2 = ins)}
              // disabledHours={this.disabledHourTime.bind(this, 0)}
            />
          </li>
        </ul>
      )
    } else {
      return (
        <span className="un-editable-text">
          {(value || [])
            .map((i: any) => !!i && moment(i, "x").format(fieldSet.format || "HH:mm:ss"))
            .join("~")}
        </span>
      )
    }
  }
}
