/**
 * 提供以下服务
 *
 * - 内容转HTML
 */
import styles from '../styles/index.css'

const URL = Symbol('url')
const NEWLINE = Symbol('newline')
const SPACE = Symbol('sep')
const SPECIAL = Symbol('special')
const TEXT = Symbol('text')
const UNKNOWN = Symbol('unknown')

const RENDER_TYPE_URL = 'RENDER_TYPE_URL'
const RENDER_TYPE_PLAIN = 'RENDER_TYPE_PLAIN'
const RENDER_TYPE_NEWLINE = 'RENDER_TYPE_NEWLINE'
const RENDER_TYPE_SPACE = 'RENDER_TYPE_SPACE'

const symbols = {
    URL,
    NEWLINE,
    SPACE,
    TEXT,
    SPECIAL,
    UNKNOWN
}

// source: https://gist.github.com/dperini/729294
// modified disallowing chinese and other unicode
// 注意: 域名的部分不允许汉字但是查询字符串是允许的
// 注意2: url 的规范是允许在 hostname 的部分使用汉字的
let urlRegExp = new RegExp(
    '^' +
    // protocol identifier
    '(?:(?:https?|ftp|cmp)://)' +
    // user:pass authentication
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    // IP address exclusion
    // private & local networks
    '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
    '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
    '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
    '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
    '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
    // host name
    '(?:(?:[a-z0-9]-*)*[a-z0-9]+)' +
    // domain name
    '(?:\\.(?:[a-z0-9]-*)*[a-z0-9]+)*' +
    // TLD identifier
    '(?:\\.(?:[a-z]{2,}))' +
    // TLD may end with dot
    '\\.?' +
    ')' +
    // port number
    '(?::\\d{2,5})?' +
    // resource path
    '(?:[/?#]\\S*)?'
    , 'i'
)

let urlRegexpAndroid = new RegExp(
    '^(https?|rtsp|cmp)://' +
    '(?:[a-z0-9]-*)*[a-z0-9]+' +
    '(?:\\.(?:[a-z0-9]-*)*[a-z0-9]+)*' +
    '(?:\\.(?:[a-z]{2,}))' +
    '(?::\\d{2,5})?' +
    '(?:/[a-z0-9_.#-]*)*' +
    '(?:\\?[a-z0-9_+=%&${}.~!:#,;-]*)?'
    , 'i')
let _urlRegexp = new RegExp('^((https|http|ftp|rtsp|mms)?:\\/\\/)[^\\s]+', 'i')

const url = {
    label: URL,
    pattern: _urlRegexp
}

// identify http from normal string
const special = {
    label: SPECIAL,
    pattern: /^[-$\\@#\[\]\(\)\{\};<>\/]/
}

const nonspecial_nohttp = {
    label: TEXT,
    pattern: /^[^-$\\@#\[\]\(\)\{\};<>\/ \n\r]+?(?=http:\/\/|https:\/\/)/
}

const nonspecial = {
    label: TEXT,
    pattern: /^[^-$\\@#\[\]\(\)\{\};<>\/ \n\r]+/
}
const sep = {
    label: SPACE,
    pattern: /^[ \t]+/
}
const newline = {
    label: NEWLINE,
    pattern: /^(\r\n|\r|\n)+/
}

const parseOrder = [ url, nonspecial_nohttp, nonspecial, special, sep, newline ]

let renderRules = {}
renderRules[symbols.URL] = urlHandler
renderRules[symbols.NEWLINE] = newlineHandler
renderRules[symbols.SPACE] = spaceHandler

/**
 * 处理url
 * @param text
 * @returns {[*,*]}
 */
function urlHandler(text) {
    return [ RENDER_TYPE_URL, { href: text, text: text, textId: text, target:'_blank' } ]
}

/**
 * 处理换行
 * @param newlines
 * @returns {[*,*]}
 */
function newlineHandler(newlines) {
    return [ RENDER_TYPE_NEWLINE, {} ]
}

/**
 * 处理空格
 * @param sep
 * @returns {[*,*]}
 */
function spaceHandler(sep) {
    return [ RENDER_TYPE_SPACE, { text: sep.replace(/\s/g, '&nbsp;') } ]
}

/**
 * 将文本按照规则解析
 * 目前rules只有解析超链接，暂不支持带中文的超链接
 * @param content，rules
 */
function tokenize(content, rules = parseOrder) {
    let data = []
    if(content) {
        let lines = content.split(/(\r\n|\n)/)
        for (let idx = 0; idx < lines.length; idx++) {
            for (let i = 0; i < lines[idx].length;) {
                let chunk = lines[idx].slice(i)
                let match = rules.some(item => {
                    if (item.pattern.test(chunk)) {
                        let matchObject = chunk.match(item.pattern)
                        i += matchObject[0].length
                        data.push([ item.label, matchObject[0] ])
                        return true
                    }
                })
                if (!match) {
                    data.push([ UNKNOWN, chunk[i] ])
                    i++
                }
            }
        }
    }
    return data
}

/**
 * url truncate + <a href>
 *
 *  注意： 不对特殊字符 <>'" 转义，取到的应该是已经转义过的字串
 */
function parse(str, options = {}) {
    let tokens = tokenize(str)
    let data = []

    tokens.forEach((item, idx) => {
        let [ label, token ] = item
        if (renderRules[label]) {
            data.push(renderRules[label](token))
        }else {
            data.push([ RENDER_TYPE_PLAIN, token ])
        }
    })
    return data
}

function ruleFilter(filter) {
    let rules = []
    let newParseOrder
    filter.map((item) => {
        parseOrder.map((order, i) => {
            if(item == order.label) {
                rules.push(order)
            }
        })
    })

    rules.map((item) => {
        let pos = parseOrder.indexOf(item)
        if(pos > -1) {
            newParseOrder = parseOrder.slice(0, pos).concat(parseOrder.slice(pos+1))
        }
    })

    return newParseOrder
}

function concatPlain(tags = []) {
    let last
    let data = []
    tags.length > 0 ? tags.forEach((item, idx) => {
        let [ type, token ]  = item
        if(idx == 0) {
            last = type
            data.push(item)
        }else {
            if (type == RENDER_TYPE_PLAIN && last == RENDER_TYPE_PLAIN)
            {
                data[data.length-1][1] = data[data.length-1][1] + token
            }else {
                data.push(item)
            }
            last = type
        }
    }) : null
    return data
}

function renderHtml(str) {
    let content = parse(str)
    let newtags = concatPlain(content)
    let response = newtags.map( (item, idx) => {
        let [ type, data ] = item
        let result
        switch (type) {
        case RENDER_TYPE_PLAIN:
            result = data
            break
        case RENDER_TYPE_SPACE:
            result = <span key={idx} dangerouslySetInnerHTML={{ __html: data.text }} />
            break
        case RENDER_TYPE_NEWLINE:
            result = <br key={idx} />
            break
        case RENDER_TYPE_URL:
            result = <a key={idx} className={styles['transform-link']} target={data.target} href={data.href} title={data.textId}>{data.text}</a>
            break
        default:
            result = ''
            break
        }
        return result
    })
    return response
}

export {
    parse,
    renderHtml,
    URL,
    NEWLINE,
    SPACE,
    SPECIAL,
    TEXT,
    UNKNOWN
}
