import { Rules, ValidateResult, RuleType, Errors, Error, RuleItem } from "./validate.type"
import {
  isString,
  isNumber,
  isInteger,
  isBoolean,
  isObject,
  isArray,
  isNull,
  isUndefined,
  isEmpty,
  toNumber,
  values,
  get,
  keys
} from "lodash"
import moment from "moment"

function requiredValidateFn(v) {
  if (isArray(v)) {
    return !isEmpty(v)
  } else {
    return !isNull(v) && !isUndefined(v)
  }
}

function maxValidateFn(v, rule: RuleItem) {
  if (isNumber(v) && isNumber(rule.max)) {
    return toNumber(v) <= toNumber(rule.max)
  } else {
    return false
  }
}

function minValidateFn(v, rule: RuleItem) {
  if (isNumber(v) && isNumber(rule.min)) {
    return toNumber(v) >= toNumber(rule.min)
  } else {
    return false
  }
}

function maxLengthValidateFn(v, rule: RuleItem) {
  if (isArray(v) || isString(v)) {
    return v.length <= (rule.maxLength || Number.MAX_SAFE_INTEGER)
  } else {
    return false
  }
}

function minLengthValidateFn(v, rule: RuleItem) {
  if (isArray(v) || isString(v)) {
    return v.length >= (rule.minLength || 0)
  } else {
    return false
  }
}

const typeValidateFn = {
  [RuleType.string]: v => isString(v),
  [RuleType.number]: v => isNumber(v),
  [RuleType.integer]: v => isInteger(v),
  [RuleType.boolean]: v => isBoolean(v),
  [RuleType.object]: v => isObject(v),
  [RuleType.array]: v => isArray(v),
  [RuleType.date]: v => moment(v).isValid()
}

const typeValidateMap = {
  [RuleType.string]: { maxLength: maxLengthValidateFn, minLength: minLengthValidateFn },
  [RuleType.number]: { max: maxValidateFn, min: minValidateFn },
  [RuleType.integer]: { max: maxValidateFn, min: minValidateFn },
  [RuleType.array]: { maxLength: maxLengthValidateFn, minLength: minLengthValidateFn }
}

export const validateFn = {
  ...typeValidateFn,
  required: requiredValidateFn,
  max: maxValidateFn,
  min: minValidateFn,
  maxLength: maxLengthValidateFn,
  minLength: minLengthValidateFn
}

function getMessage(error: Error) {}

export function validate(
  value: object,
  rules: Rules
  // options?: validateOption
): Promise<ValidateResult> {
  // const first = options && options.first
  return new Promise<ValidateResult>(resolve => {
    const errors: Errors = {}
    const errorList: Error[] = []
    const ruleItems = values(rules)
    const ps: Promise<Error>[] = []
    ruleItems.forEach(rule => {
      const v = get(value, rule.key, undefined)
      const error = {
        key: rule.key,
        valid: true,
        type: false,
        required: false,
        maxLength: false,
        minLength: false,
        max: false,
        min: false,
        validator: false,
        message: ""
      } as Error
      if (rule.required && !validateFn.required(v)) {
        error.required = true
        error.valid = false
        error.message = rule.label + "不能为空"
        errors[error.key] = error
        errorList.push(error)
      } else if (rule.type && rule.type != RuleType.any && !validateFn[rule.type](v)) {
        error.type = true
        error.valid = false
        error.message = rule.label + "类型错误"
        errors[error.key] = error
        errorList.push(error)
      } else if (typeValidateMap[rule.type]) {
        const ks = keys(typeValidateMap[rule.type]).filter(
          k => rule[k] != undefined && rule[k] != null
        )
        ks.forEach(k => {
          if (!typeValidateMap[rule.type][k](v, rule)) {
            error[k] = true
            error.valid = false
            error.message = rule.label + "错误"
          }
        })
        errors[error.key] = error
        errorList.push(error)
      } else if (rule.validator) {
        //异步验证
        ps.push(rule.validator(v, { rule, values: value }))
      }
    })
    if (ps.length) {
      Promise.all(ps).then(results => {
        console.log(results)
        resolve({
          value,
          valid: errorList.filter(i => !i.valid).length <= 0,
          errors,
          errorList,
          rules
        } as ValidateResult)
      })
    } else {
      resolve({
        value,
        valid: errorList.filter(i => !i.valid).length <= 0,
        errors,
        errorList,
        rules
      } as ValidateResult)
    }
  })
}
