import moment from 'moment';
/**
 * 判断长度为2的数组数据表示的是年的数据(第一个元素为1月第二个元素为同年12月)
 * @param v 参数值
 * @param format  参数格式
 */
export declare function isYear(
  v: moment.MomentInput[],
  format: moment.MomentFormatSpecification
): boolean;
/**
 * 日期输入转换
 * @param v
 * @param outFormat 输出格式
 */
export declare function dateInValue(
  v: moment.MomentInput[] | moment.MomentInput,
  outFormat: moment.MomentFormatSpecification
): moment.Moment | moment.Moment[] | undefined;
/**
 * 日期输出转换
 * @param v 日期
 * @param outFormat 输出格式
 * @param format  有效日期格式
 * @returns {string|string[]|undefined}
 */
export declare function dateOutValue(
  v: moment.Moment[] | moment.Moment,
  outFormat: string,
  format: string,
  endOf?: boolean
): string | string[] | undefined;
/**
 * 分钟数格式化成小时分钟
 * @param minutes
 */
export declare function hourFormat(minutes: number): string;
/**
 * 数字显示+
 * @param num
 */
export declare function plusOrMinus(num: number): string | number;
/**
 * 金额格式化
 * @param s
 * @param dot
 */
export declare function formatMoney(s: number, dot?: string): string;
export interface FormatJSONOptions {
  newlineAfterColonIfBeforeBraceOrBracket?: boolean;
  spaceAfterColon?: boolean;
}
/**
 * 格式化json字符串
 * @param json
 * @param options
 */
export declare function formatJSON(json: string, options?: FormatJSONOptions): string;
/**
 * 格式化成[{key,label,children}]的树
 * @param list
 * @param keyFn
 * @param labelFn
 * @param childrenFn
 * @param keyName
 * @param labelName
 */
export declare function formatTreeData(
  list: any[],
  keyFn?: (i: any) => any,
  labelFn?: (i: any) => any,
  childrenFn?: (i: any) => any[],
  keyName?: string,
  labelName?: string
): {
  key: any;
  label: any;
  children: any[];
}[];
