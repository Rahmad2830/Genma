export const $ = (target) => {
  let node
  
  if (typeof target === "string") {
    node = document.querySelectorAll(target)
  } else if (
    target instanceof Element ||
    target === document ||
    target === window
  ) {
    node = [target]
  } else if (target instanceof NodeList || Array.isArray(target)) {
    node = target
  } else {
    node = []
  }
  
  if(!node.length) {
    console.warn(`Element ${target} not found`)
  }
  
  const methods = {
    on(event, callback) {
      node.forEach(el => el.addEventListener(event, callback))
      return methods
    },
    text(value) {
      if(value === undefined) {
        return node[0].textContent
      }
      node.forEach(el => el.textContent = value)
      return methods
    },
    html(value) {
      if(value === undefined) {
        return node[0].innerHTML
      }
      node.forEach(el => el.innerHTML = value)
      return methods
    },
    addClass(val) {
      node.forEach(el => el.classList.add(val))
      return methods
    },
    removeClass(val) {
      node.forEach(el => el.classList.remove(val))
      return methods
    },
    toggleClass(val, cond) {
      node.forEach(el => el.classList.toggle(val, cond))
      return methods
    },
    val(value) {
      if(value === undefined) {
        return node[0].value
      }
      node.forEach(el => el.value = value)
      return methods
    },
    attr(name, value) {
      if(value === undefined) {
        return node[0].getAttribute(name)
      }
      node.forEach(el => el.setAttribute(name, value))
      return methods
    },
    removeAttr(name) {
      node.forEach(el => el.removeAttribute(name))
      return methods
    },
    each(callback) {
      node.forEach((el, i) => {
        callback(el, i)
      })
      return methods
    },
    first() {
      return $(node[0])
    },
    last() {
      return $(node[node.length - 1])
    },
    eq(index) {
      return $(node[index])
    },
    off(event, callback) {
      node.forEach(el => el.removeEventListener(event, callback))
      return methods
    },
    hasClass(value) {
      return node[0].classList.contains(value)
    },
    css(obj = {}) {
      if(typeof obj !== "object") {
        console.warn(".css() value must be an object css")
        return methods
      }
      node.forEach(el => Object.assign(el.style, obj))
      return methods
    },
    get() {
      return node
    },
    prop(type, value) {
      if(value === undefined) {
        return node[0][type]
      }
      node.forEach(el => {
        if(type in el) {
          el[type] = value
        } else {
          console.warn(`Property name ${type} does not exist`)
        }
      })
      return methods
    },
    find(selector) {
      let found = []
      node.forEach(el => {
        found.push(...el.querySelectorAll(selector))
      })
      return $(found)
    },
    closest(selector) {
      let found = []
      node.forEach(el => {
        const match = el.closest(selector)
        if(match) found.push(match)
      })
      return $(found)
    },
    is(test) {
      const el = node[0]
      if (!el) return false
    
      if (typeof test === "function") {
        return !!test(el)
      }
    
      switch (test) {
        case ":disabled":
          return el.disabled === true
        case ":enabled":
          return el.disabled === false
        case ":checked":
          return el.checked === true
        case ":visible":
          return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
        case ":hidden":
          return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
        case ":empty":
          return el.innerHTML.trim() === ""
        case ":focus":
          return document.activeElement === el
        default:
          return el.matches(test)
      }
    },
    data(key, value) {
      if(value === undefined) {
         return node[0].dataset[key]
      }
      node.forEach(el => el.dataset[key] = value)
      return methods
    }
  }
  
  return methods
}