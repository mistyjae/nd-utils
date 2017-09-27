/**
 * 判断浏览器是否是safari
 * @returns {boolean}
 */
export function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

/**
 * 判断浏览器是否是ie浏览器
 * @returns {boolean}
 */
export function isIE() {
    if (!!window.ActiveXObject || 'ActiveXObject' in window)
        return true
    else
        return false
}

/**
 * 判断低于ie某版本
 * @param version
 * @returns {boolean}
 */
export function itIE(version) {
    let info = browserChecker()
    if(info.name == 'ie') {
        let _version = parseInt(info.version.slice(0, info.version.indexOf('.')))
        return _version < version ? true : false
    }else {
        return false
    }
}

/**
 * 检测浏览器类型和版本
 * @returns {{}}
 */
export function browserChecker() {
    let Sys = {}
    let info = {}
    let ua = navigator.userAgent.toLowerCase()
    let s
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0

    if (Sys.ie) {
        info.name = 'ie'
        info.version = Sys.ie
    }
    if (Sys.firefox) {
        info.name = 'firefox'
        info.version = Sys.firefox
    }
    if (Sys.chrome) {
        info.name = 'chrome'
        info.version = Sys.chrome
    }
    if (Sys.opera) {
        info.name = 'opera'
        info.version = Sys.opera
    }
    if (Sys.safari) {
        info.name = 'safari'
        info.version = Sys.safari
    }
    return info
}

