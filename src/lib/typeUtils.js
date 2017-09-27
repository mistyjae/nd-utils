/**
 * Created by lzp on 2017/5/4.
 */

const typeUtils = (() => {
    let result = {}
    let toString = Object.prototype.toString
    let types = [ 'Number', 'String', 'Boolean', 'Function', 'Array', 'RegExp', 'Date', 'Object', 'Undefined', 'Null', 'Promise', 'Symbol' ]

    for( let type of types ) {
        result[ `is${type}` ] = (checkValue) => toString.call(checkValue) === `[object ${type}]`
    }
    return result
})()

export function boolean(key, bool) {
    return (typeof key === 'boolean' ? key : bool)
}

export function number(value, defaultValue) {
    return (typeof value === 'number' ? value : defaultValue)
}

export function isEmptyObject(e) {
    if(!e) {
        return !0
    }
    let t
    for (t in e) {
        return !1
    }
    return !0
}

export default typeUtils
