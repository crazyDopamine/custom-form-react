import React from "react"
import Form from "./index"
// let id: any = null
// let n = 0

export function onDemoRender(component: React.RefObject<Form>) {
  // if (!id) {
  //   id = setInterval(() => {
  //     n = n + 1
  //     // @ts-ignore
  //     const props = this.state.componentProps
  //     props.fields[0].prefix = n
  //     props.fields = [...props.fields]
  //     // @ts-ignore
  //     this.setState({ componentProps: { ...this.state.componentProps } })
  //     console.log(n)
  //   }, 1000)
  // }
  function setValue() {
    if (component && component.current)
      component.current.setValue({
        input: "test",
        treeSelect: "test1",
        cascader: ["test3", "test4"],
        radioGroup: "test2",
        select: ["test2", "test3"],
        timeRange: [new Date().getTime(), new Date().getTime() + 10000],
        datePicker: new Date().getTime(),
        duration: 100,
      })
  }
  function getValue() {
    console.log(component && component.current && component.current.getValue())
  }
  function reset() {
    if (component && component.current) component.current.reset(["input"])
  }
  function validate() {
    if (component && component.current) component.current.validate().then(r => console.log(r))
  }
  function refreshOptions() {
    if (component && component.current)
      component.current.setOption("checkboxGroup", [
        { value: "xxx1", label: "xxx1" },
        { value: "xxx2", label: "xxx2" },
      ])
  }
  return (
    <div style={{ textAlign: "center" }}>
      <a onClick={setValue} style={{ marginRight: "20px" }}>
        获取值setValue
      </a>
      <a onClick={getValue} style={{ marginRight: "20px" }}>
        获取值getValue
      </a>
      <a onClick={reset} style={{ marginRight: "20px" }}>
        重设表单值reset
      </a>
      <a onClick={refreshOptions} style={{ marginRight: "20px" }}>
        设置options
      </a>
      <a onClick={validate}>校验validate</a>
    </div>
  )
}
