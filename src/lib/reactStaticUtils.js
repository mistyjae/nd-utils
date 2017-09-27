/**
 * Created by xlm on 2017/5/12.
 *
 * 从A组件拷贝static常量到B组件
 * modify yahoo hoist-non-react-statics 修复了ie10下报错
 * https://github.com/mridgway/hoist-non-react-statics/issues
 *
 */

let REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
}

let KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true,
    __proto__: true   //ie10若未加此属性过滤会报错
}

let isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function'

export function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        let keys = Object.getOwnPropertyNames(sourceComponent)
        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent))
        }

        for (let i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]]
                } catch (error) {
                    console.log('copy reactStatics failed', error)
                }
            }
        }
    }

    return targetComponent
}
