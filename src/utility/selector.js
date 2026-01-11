export const $ = (target) => {
  const el = typeof target === "string" ? document.querySelector(target) : target
  
  if(!el) {
    console.warn(`Element ${target} is not found`)
    return null
  }
  
  const methods = {
    on(event, callback) {
      el.addEventListener(event, callback)
      return methods
    },
    text(value) {
      if(value === undefined) {
        return el.textContent
      }
      el.textContent = value
      return methods
    },
    html(value) {
      if(value === undefined) {
        return el.innerHTML
      }
      el.innerHTML = value
      return methods
    },
    addClass(val) {
      el.classList.add(val)
      return methods
    },
    removeClass(val) {
      el.classList.remove(val)
      return methods
    },
    toggleClass(val, cond) {
      el.classList.toggle(val, cond)
      return methods
    },
    val(value) {
      if(value === undefined) {
        return el.value
      }
      el.value = value
      return methods
    },
    attr(name, value) {
      if(value === undefined) {
        return el.getAttribute(name)
      }
      el.setAttribute(name, value)
      return methods
    },
    removeAttr(name) {
      el.removeAttribute(name)
      return methods
    }
  }
  
  return methods
}