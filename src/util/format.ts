import moment from 'moment';

/**
 * 判断长度为2的数组数据表示的是年的数据(第一个元素为1月第二个元素为同年12月)
 * @param v 参数值
 * @param format  参数格式
 */
export function isYear(v: moment.MomentInput[], format: moment.MomentFormatSpecification): boolean {
  if (v.length == 2) {
    const start = moment(v[0], format);
    const end = moment(v[1], format);
    return start.year() == end.year() && start.month() == 0 && end.month() == 11;
  } else {
    return false;
  }
}

/**
 * 日期输入转换
 * @param v
 * @param outFormat 输出格式
 */
export function dateInValue(
  v: moment.MomentInput[] | moment.MomentInput,
  outFormat: moment.MomentFormatSpecification
): moment.Moment | moment.Moment[] | undefined {
  if (v && v instanceof Array) {
    return (v as moment.MomentInput[]).map((v) => dateInValue(v, outFormat) as moment.Moment);
  } else if (v && moment(v, outFormat).isValid()) {
    return moment(v, outFormat);
  } else {
    return undefined;
  }
}

const END_FORMAT = new Map<string, moment.unitOfTime.StartOf>([
  ['YYYY', 'year'],
  ['YYYY-MM', 'month'],
  ['YYYY-MM-DD', 'day'],
  ['YYYY-MM-DD HH', 'hour'],
  ['YYYY-MM-DD HH:mm', 'minute'],
  ['YYYY-MM-DD HH:mm:ss', 'second']
]);

/**
 * 日期输出转换
 * @param v 日期
 * @param outFormat 输出格式
 * @param format  有效日期格式
 * @returns {string|string[]|undefined}
 */
export function dateOutValue(
  v: moment.Moment[] | moment.Moment,
  outFormat: string,
  format: string,
  endOf?: boolean
): string | string[] | undefined {
  if (v && v instanceof Array) {
    return (v as moment.Moment[]).map(
      (i, index) => dateOutValue(i, outFormat, format, index == v.length - 1) as string
    );
  } else if (v) {
    let vMoment = moment(v.format(format), format);
    if (endOf && END_FORMAT.get(format)) {
      vMoment = vMoment.endOf(END_FORMAT.get(format) as moment.unitOfTime.StartOf);
    }
    return vMoment.format(outFormat);
  } else {
    return undefined;
  }
}

/**
 * 分钟数格式化成小时分钟
 * @param minutes
 */
export function hourFormat(minutes: number): string {
  if (!minutes) {
    return 0 + '小时';
  }
  let h = moment.duration(minutes, 'minutes').asHours();
  h = h > 0 ? Math.floor(h) : h < 0 ? Math.ceil(h) : h;
  let m = moment.duration(minutes, 'minutes').minutes();
  m = m > 0 ? Math.floor(m) : m < 0 ? -Math.ceil(m) : m;

  return (h ? h + '小时' : '') + (m ? m + '分钟' : '');
}

/**
 * 数字显示+
 * @param num
 */
export function plusOrMinus(num: number) {
  return num >= 0 ? `+${num}` : num;
}

/**
 * 金额格式化
 * @param s
 * @param dot
 */
export function formatMoney(s: number, dot = ',') {
  if (isNaN(s) || s === 0) return '0.00';
  const exp = /-?\d*\.\d{1,2}/;
  const res = String(s).match(exp);
  if (res) s = Number(res[0]);
  else s = Number(`${s}.00`);
  const temp = s.toString().split('.');
  if (temp[1].length < 2) temp[1] = `${temp[1]}0`;
  return `${temp.join('.')}`.replace(/\B(?=(\d{3})+(?!\d))/g, String(dot));
}

export interface FormatJSONOptions {
  newlineAfterColonIfBeforeBraceOrBracket?: boolean;
  spaceAfterColon?: boolean;
}

/**
 * 格式化json字符串
 * @param json
 * @param options
 */
export function formatJSON(json: string, options?: FormatJSONOptions) {
  let reg = null;
  let formatted = '';
  let pad = 0;
  let PADDING = '    ';
  options = options || {};
  options.newlineAfterColonIfBeforeBraceOrBracket =
    options.newlineAfterColonIfBeforeBraceOrBracket === true ? true : false;
  options.spaceAfterColon = options.spaceAfterColon === false ? false : true;
  if (typeof json !== 'string') {
    json = JSON.stringify(json);
  } else {
    json = JSON.parse(json);
    json = JSON.stringify(json);
  }
  reg = /([\{\}])/g;
  json = json.replace(reg, '\r\n$1\r\n');
  reg = /([\[\]])/g;
  json = json.replace(reg, '\r\n$1\r\n');
  reg = /(\,)/g;
  json = json.replace(reg, '$1\r\n');
  reg = /(\r\n\r\n)/g;
  json = json.replace(reg, '\r\n');
  reg = /\r\n\,/g;
  json = json.replace(reg, ',');
  if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
    reg = /\:\r\n\{/g;
    json = json.replace(reg, ':{');
    reg = /\:\r\n\[/g;
    json = json.replace(reg, ':[');
  }
  if (options.spaceAfterColon) {
    reg = /\:/g;
    json = json.replace(reg, ':');
  }
  json.split('\r\n').forEach(function (node, index) {
    let i = 0;
    let indent = 0;
    let padding = '';
    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1;
    } else if (node.match(/\}/) || node.match(/\]/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else {
      indent = 0;
    }
    for (i = 0; i < pad; i++) {
      padding += PADDING;
    }
    if (node != '') {
      formatted += padding + node + '\r\n';
    }
    pad += indent;
  });
  return formatted;
}

/**
 * 格式化成[{key,label,children}]的树
 * @param list
 * @param keyFn
 * @param labelFn
 * @param childrenFn
 * @param keyName
 * @param labelName
 */
export function formatTreeData(
  list: any[],
  keyFn: (i: any) => any = (i) => i.id,
  labelFn: (i: any) => any = (i) => i.name,
  childrenFn: (i: any) => any[] = (i) => i.children,
  keyName = 'key',
  labelName = 'label'
): { key: any; label: any; children: any[] }[] {
  return (list || []).map((i) => {
    const children = childrenFn(i);
    return {
      ...i,
      [keyName]: keyFn(i),
      [labelName]: labelFn(i),
      ...((!!children &&
        !!children.length && {
          children: formatTreeData(childrenFn(i), keyFn, labelFn, childrenFn, keyName, labelName)
        }) ||
        {})
    };
  });
}
