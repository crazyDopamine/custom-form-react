import {
  Rules,
  ValidateResult,
  RuleType,
  ValidateErrors,
  ValidateError,
  RuleItem,
  TypeValidates
} from './validate.type';
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
  keys,
  zipObject
} from 'lodash';
import moment from 'moment';

function requiredValidateFn(v: any) {
  if (isArray(v)) {
    return !isEmpty(v);
  } else {
    return !isNull(v) && !isUndefined(v) && v !== '';
  }
}

function maxValidateFn(v: any, rule: RuleItem) {
  if (isNumber(v) && isNumber(rule.max)) {
    return toNumber(v) <= toNumber(rule.max);
  } else {
    return false;
  }
}

function minValidateFn(v: any, rule: RuleItem) {
  if (isNumber(v) && isNumber(rule.min)) {
    return toNumber(v) >= toNumber(rule.min);
  } else {
    return false;
  }
}

function maxLengthValidateFn(v: any, rule: RuleItem) {
  if (isArray(v) || isString(v)) {
    return v.length <= (rule.maxLength || Number.MAX_SAFE_INTEGER);
  } else {
    return false;
  }
}

function minLengthValidateFn(v: any, rule: RuleItem) {
  if (isArray(v) || isString(v)) {
    return v.length >= (rule.minLength || 0);
  } else {
    return false;
  }
}

const typeValidateFn = {
  [RuleType.string]: (v: any) => isString(v),
  [RuleType.number]: (v: any) => isNumber(v),
  [RuleType.integer]: (v: any) => isInteger(v),
  [RuleType.boolean]: (v: any) => isBoolean(v),
  [RuleType.object]: (v: any) => isObject(v),
  [RuleType.array]: (v: any) => isArray(v),
  [RuleType.date]: (v: any) => moment(v).isValid()
};

const stringValidates: TypeValidates = {
  maxLength: maxLengthValidateFn,
  minLength: minLengthValidateFn
};
const numberValidates: TypeValidates = {
  max: maxValidateFn,
  min: minValidateFn
};
const integerValidates: TypeValidates = {
  max: maxValidateFn,
  min: minValidateFn
};
const arrayValidates: TypeValidates = {
  maxLength: maxLengthValidateFn,
  minLength: minLengthValidateFn
};

const typeValidateMap = new Map<RuleType, TypeValidates>([
  [RuleType.string, stringValidates],
  [RuleType.number, numberValidates],
  [RuleType.integer, integerValidates],
  [RuleType.array, arrayValidates]
]);

export const validateFn = {
  ...typeValidateFn,
  required: requiredValidateFn,
  max: maxValidateFn,
  min: minValidateFn,
  maxLength: maxLengthValidateFn,
  minLength: minLengthValidateFn
};

// function getMessage(error: ValidateError) {}

export function validate(
  value: object,
  rules: Rules
  // options?: validateOption
): Promise<ValidateResult> {
  // const first = options && options.first
  return new Promise<ValidateResult>((resolve) => {
    let errors: ValidateErrors = {};
    let errorList: ValidateError[] = [];
    const ruleItems = values(rules);
    const ps: Promise<ValidateError>[] = [];
    ruleItems.forEach((rule: RuleItem) => {
      const v = get(value, rule.key, undefined);
      const error: ValidateError = {
        key: rule.key,
        valid: true,
        type: false,
        required: false,
        maxLength: false,
        minLength: false,
        max: false,
        min: false,
        validator: false,
        message: ''
      };
      if (rule.required && !validateFn.required(v)) {
        error.required = true;
        error.valid = false;
        error.message = rule.label + '不能为空';
        errors[error.key] = error;
        errorList.push(error);
      } else if (rule.type && rule.type != RuleType.any && !validateFn[rule.type](v)) {
        error.type = true;
        error.valid = false;
        error.message = rule.label + '类型错误';
        errors[error.key] = error;
        errorList.push(error);
      } else if (typeValidateMap.get(rule.type)) {
        const typeValidates = typeValidateMap.get(rule.type);
        keys(typeValidates).forEach((k) => {
          if (typeValidates && !!typeValidates[k] && !typeValidates[k](v, rule)) {
            error[k] = true;
            error.valid = false;
            error.message = rule.label + '错误';
          }
        });
        errors[error.key] = error;
        errorList.push(error);
      } else if (rule.validator) {
        // 异步验证
        ps.push(rule.validator(v, { rule, values: value }));
      }
    });
    if (ps.length) {
      Promise.all(ps).then((results) => {
        const validatorErrors = results.filter((i) => !i.valid);
        errorList = [...errorList, ...validatorErrors];
        errors = {
          ...errors,
          ...zipObject(
            validatorErrors.map((i) => i.key),
            validatorErrors
          )
        };
        resolve({
          value,
          valid: errorList.filter((i) => !i.valid).length <= 0,
          errors,
          errorList,
          rules
        });
      });
    } else {
      resolve({
        value,
        valid: errorList.filter((i) => !i.valid).length <= 0,
        errors,
        errorList,
        rules
      });
    }
  });
}
