export interface OptionEnumOption {
  keyFn?: (o: any) => any
  valueFn?: (o: any) => any
  transform?: (o: any) => any
  lazy?: boolean
}

export interface OptionRequestResponse {
  data: Array<object>
}

export class OptionEnum {
  config: OptionEnumOption
  request: (params?: any) => Promise<OptionRequestResponse>
  valueFn = (o: any) => o.label
  labelFn = (o: any) => o.value
  lazy = false
  transform?: (o: any) => any
  status = 0
  waiting: Array<(value?: object[] | PromiseLike<object[]>) => void> = []
  constructor(request: (params?: any) => Promise<OptionRequestResponse>, config: OptionEnumOption) {
    this.request = request
    this.labelFn = config.keyFn || this.labelFn
    this.valueFn = config.valueFn || this.valueFn
    this.lazy = !!config.lazy
    this.transform = config.transform
    this.config = config
  }

  /**
   * 请求数据
   * @param params 请求参数
   */
  get(params?: any): Promise<object[]> {
    const { request, labelFn, valueFn } = this
    if (this.status == 1) {
      return new Promise(resolve => {
        this.waiting.push(resolve)
      })
    } else {
      return new Promise<object[]>(resolve => {
        this.status = 1
        request(params)
          .then(({ data }) => {
            this.status = 2
            if (this.transform) {
              const dataArr = this.transform(data)
              this.waiting.forEach(waitingResolve => waitingResolve(dataArr))
              this.waiting = []
              resolve(dataArr)
            } else {
              const dataArr = data.map(item => ({
                data: item,
                key: valueFn(item),
                value: valueFn(item),
                label: labelFn(item),
              }))
              // const dataEnum = new Enum(dataArr)
              this.waiting.forEach(waitingResolve => waitingResolve(dataArr))
              this.waiting = []
              resolve(dataArr)
            }
          })
          .catch(() => {
            this.status = 0
          })
      })
    }
  }
}
