import React, { createRef, RefObject } from "react"
import InputNumber from "antd/es/input-number"
import { BaseField } from "../../../baseField"
import { FieldProps, FieldState } from "../../../types"
import moment from "moment"
import { hourFormat } from "../../.."
import { min, floor, pick } from "lodash"
import "./index.scss"

const componentPropsKey = [
  "autoFocus",
  "disabled",
  "formatter",
  "parser",
  "precision",
  "decimalSeparator",
  "size",
  "step",
  "onPressEnter",
]

export default class extends BaseField<FieldProps, FieldState> {
  // @ts-ignore
  component1 = createRef<InputNumber>()
  // @ts-ignore
  component2 = createRef<InputNumber>()
  onHourChange(e: number | string | undefined): void {
    e = (e || 0) <= 0 ? 0 : e
    const { value } = this.state
    const { max } = this.props
    const duration = moment.duration(value, "minutes")
    const newDuration = moment.duration(
      min(
        [(Number(e) || 0) * 60 + duration.minutes(), max].filter(i => i !== null && i !== undefined)
      ),
      "minutes"
    )
    this.setState({ value: newDuration.asMinutes() })
    this.onChange(newDuration.asMinutes())
  }

  onMinuteChange(e: number | string | undefined) {
    e = (e || 0) <= 0 ? 0 : e
    if ((e || 0) >= 60) {
      e = 59
    }
    const { value } = this.state
    const { max } = this.props
    const duration = moment.duration(value, "minutes")
    const newDuration = moment.duration(
      min(
        [floor(duration.asHours()) * 60 + (Number(e) || 0), max].filter(
          i => i !== null && i !== undefined
        )
      ),
      "minutes"
    )
    this.setState({ value: newDuration.asMinutes() })
    this.onChange(newDuration.asMinutes())
  }

  focus() {
    return [
      this.component1 && this.component1.current && this.component1.current.focus(),
      this.component2 && this.component2.current && this.component2.current.focus(),
    ]
  }

  render() {
    const { editable, fieldSet } = this.props
    const { value } = this.state
    const duration = moment.duration(value, "minutes")
    const hours = floor(duration.asHours())
    const minutes = duration.minutes()
    const componentProps = {
      ...pick(fieldSet, componentPropsKey),
    }
    if (editable) {
      return (
        <ul className="time-input-area">
          <li className="time-input-number">
            <InputNumber
              value={hours}
              {...componentProps}
              min={0}
              onChange={this.onHourChange.bind(this)}
              ref={this.component1}
            />
          </li>
          <li>小时</li>
          <li className="time-input-number">
            <InputNumber
              value={minutes}
              {...componentProps}
              max={60}
              min={0}
              onChange={this.onMinuteChange.bind(this)}
              ref={(ins: RefObject<typeof InputNumber>) => (this.component2 = ins)}
            />
          </li>
          <li>分钟</li>
        </ul>
      )
    } else {
      return <span className="un-editable-text">{hourFormat(duration.asMinutes())}</span>
    }
  }
}
