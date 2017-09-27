/**
 * Created by cpoopc on 2016/9/27.
 */
export default {
    getWindowSize() {
        let winWidth, winHeight
        if (window.innerWidth)
            winWidth = window.innerWidth
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth
        if (window.innerHeight)
            winHeight = window.innerHeight
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
        {
            winHeight = document.documentElement.clientHeight
            winWidth = document.documentElement.clientWidth
        }
        return {
            width: winWidth,
            height: winHeight
        }
    },

    getClientHeight() {
        let clientHeight = 0
        if(document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
        }
        else {
            clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
        }
        return clientHeight
    },

    getElementLeft(element, root) {
        let actualLeft = element.offsetLeft
        let current = element.offsetParent

        while (current !== null) {
            if(current.offsetParent == root) {
                break
            }
            actualLeft += current.offsetLeft
            current = current.offsetParent 
        }

        return actualLeft
    },

    getElementViewLeft(element) {
        let actualLeft = this.getElementLeft(element)
        let elementScrollLeft = element.scrollLeft
        let current = element.parentNode
        while(current != null) {
            elementScrollLeft += current.scrollLeft ? current.scrollLeft : 0
            current = current.parentNode
        }
        return actualLeft-elementScrollLeft
    },

    getElementTop(element, root) {
        let actualTop = element.offsetTop
        let current = element.offsetParent

        while (current !== null) {
            if(current.offsetParent == root) {
                break
            }
            actualTop += current.offsetTop
            current = current.offsetParent
        }

        return actualTop
    },

    getElementBottom(element, diffHeight) {
        let top = this.getElementViewTop(element)
        let windowHeight = this.getClientHeight()
        if(windowHeight - top <= diffHeight) {
            return true
        }
        return false
    },

    getElementViewTop(element, root) {
        let actualTop = this.getElementTop(element, root)
        let elementScrollTop = element.scrollTop
        let current = element.parentNode
        while(current != null) {
            if(current.parentNode == root) {
                break
            }
            elementScrollTop += current.scrollTop ? current.scrollTop : 0
            current = current.parentNode
        }
        return actualTop-elementScrollTop
    },

    getStyle(element, attr) {
        return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr]
    }
}
