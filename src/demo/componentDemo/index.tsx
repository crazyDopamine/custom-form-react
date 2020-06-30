import React, { ChangeEvent } from "react"
import Input from "antd/es/input"
import Row from "antd/es/row"
import Col from "antd/es/col"
import "./index.scss"
import { formatJSON } from "../../util"

interface Props {
  component: React.FunctionComponent<any> | React.ComponentClass<any, any>
  demoProps?: object
  description?: React.ReactNode
  onDemoRender?: (component: React.RefObject<any>) => React.ReactNode
}

export interface State {
  componentPropsInput: string
  componentProps: object
  jsonError: boolean
}

function jsonStringifyReplacer(k: any, v: any) {
  if (typeof v == "function") {
    return v.toString().replace(/\n/g, "")
  }
  return v
}

function jsonStringifyReciver(k: any, v: any) {
  // if (v.indexOf("function") >= 0) {
  //   console.log(v)
  //   return v.toString()
  // }
  return v
}

export default class ComponentDemo extends React.Component<Props, State> {
  component: React.RefObject<any> = React.createRef()
  constructor(props: Props) {
    super(props)
    console.log(props)
    this.state = {
      componentPropsInput: formatJSON(JSON.stringify(props.demoProps || {}, jsonStringifyReplacer)),
      componentProps: props.demoProps || {},
      jsonError: false,
    }
  }
  onPropsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ componentPropsInput: e.target.value })
  }
  execute = () => {
    let { componentPropsInput, componentProps, jsonError } = this.state
    try {
      componentProps = JSON.parse(componentPropsInput, jsonStringifyReciver)
      jsonError = false
    } catch (e) {
      console.error(e)
      jsonError = true
      this.setState({ jsonError })
      return
    }
    this.setState({
      componentProps,
      jsonError,
      componentPropsInput: formatJSON(JSON.stringify(componentProps, jsonStringifyReplacer)),
    })
  }
  render() {
    const { component, description, onDemoRender } = this.props
    const { componentPropsInput, componentProps, jsonError } = this.state
    return (
      <ul className="component-demo-area">
        <li>
          <Row>
            <Col
              className={["props-input", jsonError && "json-error"].filter(Boolean).join(" ")}
              span={12}>
              <Input.TextArea
                value={componentPropsInput}
                onChange={this.onPropsChange}
                onBlur={this.execute}
                autoSize={{ minRows: 8, maxRows: 20 }}
              />
            </Col>
            <Col className="props-description" span={12}>
              {description}
            </Col>
          </Row>
        </li>
        <li>
          {React.createElement(component, {
            ...componentProps,
            ref: this.component,
          })}
        </li>
        {!!onDemoRender && <li>{onDemoRender.call(this, this.component)}</li>}
      </ul>
    )
  }
}
