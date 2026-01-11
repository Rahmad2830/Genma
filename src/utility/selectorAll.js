export const $$ = (selector) => {
  const node = document.querySelectorAll(selector)
  
  if(!node.length) {
    console.warn(`Element ${selector} not found`)
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
        callback.call(el, i, el)
      })
      return methods
    }
  }
  
  return methods
}