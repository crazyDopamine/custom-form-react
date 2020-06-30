import { difference, isArray, isObject } from "lodash"
/**
 * 下载文件方法，这里做了些兼容
 * @param {string} sUrl 文件地址
 * @param {string} fileName 文件名称
 */
export function downloadFile(sUrl: string, fileName: string) {
  const isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1
  const isSafari = navigator.userAgent.toLowerCase().indexOf("safari") > -1
  //iOS devices do not support downloading. We have to inform user about this.
  if (/(iP)/g.test(navigator.userAgent)) {
    alert("Your device does not support files downloading. Please try again in desktop browser.")
    return false
  }
  //If in Chrome or Safari - download via virtual link click
  if (isChrome || isSafari) {
    //Creating new link node.
    let link = document.createElement("a")
    link.target = "_blank"
    link.href = sUrl
    if (link.download !== undefined) {
      //Set HTML5 download attribute. This will prevent file from opening if supported.
      link.download = fileName || sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length)
    }
    //Dispatching click event.
    if (document.createEvent) {
      let e = document.createEvent("MouseEvents")
      e.initEvent("click", true, true)
      link.dispatchEvent(e)
      return true
    }
  }
  // Force file download (whether supported by server).
  if (sUrl.indexOf("?") === -1) {
    sUrl += "?download"
  }
  window.open(sUrl)
  return true
}

export function uuid() {
  let s = []
  let hexDigits = "0123456789abcdef"
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = "4" // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] as any & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = ""
  let uuid = s.join("")
  return uuid
}

export function compareObj(obj1: object, obj2: object, exclude?: string[]) {
  if (obj1 == obj2) return true
  if (
    Object.keys(obj1).length == Object.keys(obj2).length &&
    difference(Object.keys(obj1), Object.keys(obj2)).length == 0
  ) {
    for (let k of Object.keys(obj1)) {
      if ((exclude || []).find(i => i == k)) {
        continue
      }
      // @ts-ignore
      if (obj1[k] == obj2[k]) continue
      // @ts-ignore
      if (isArray(obj1[k]) && isArray(obj2[k]) && difference(obj1[k], obj2[k]).length > 0)
        return false
      // @ts-ignore
      if (isObject(obj1[k]) && isObject(obj2[k]) && obj1[k] != obj2[k]) return false
      if (
        // @ts-ignore
        !(isArray(obj1[k]) && isArray(obj2[k])) &&
        // @ts-ignore
        !(isObject(obj1[k]) && isObject(obj2[k])) &&
        // @ts-ignore
        obj1[k] != obj2[k]
      ) {
        // @ts-ignore
        return false
      }
    }
    return true
  } else return false
}

/**
 * 阻止冒泡
 * @param {*} e
 */
export function stopPropagation(e: any) {
  if (!e) return
  if (e.stopPropagation) {
    e.stopPropagation()
  } // 正常浏览器
  else {
    e.cancelBubble = true
  } // 兼容ie
  e.nativeEvent && e.nativeEvent.stopImmediatePropagation() // react的事件是委托在document上的，如果上面的方法不能阻止冒泡试试这个
}

export * from "./option"
export * from "./format"
