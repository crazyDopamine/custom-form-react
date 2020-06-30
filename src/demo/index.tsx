import React from "react"
import * as FormAntD from "../antD"
import ComponentDemo from "./componentDemo"

export const demoComponents = [{ component: FormAntD.default, ...FormAntD }]
export default function () {
  return (
    <div>
      {demoComponents.map((i, index) => (
        <ComponentDemo {...i} key={index} />
      ))}
    </div>
  )
}
