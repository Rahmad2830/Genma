import { $ } from "./selector.js"

$.debounce = (callback, duration) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(...args)
    }, duration)
  }
}

$.clickOutside = (target, callback) => {
  if(typeof target !== "string") {
    console.error(`${target} must be a string of css selector`)
    return
  }
  const el = $(target).get()[0]
  if(!el) return
  const handler = (e) => {
    if(!el.contains(e.target)) {
      callback(e)
    }
  }
  
  $(document).on("click", handler)
  
  return () => $(document).off("click", handler)
}

//escape HTML
const _esc = document.createElement("div")
const escapeHTML = (str) => {
  _esc.textContent = str
  return _esc.innerHTML
}

$.html = (strings, ...values) => {
  let result = ''

  strings.forEach((str, i) => {
    result += str

    const value = values[i]
    if (value !== undefined) {
      result += escapeHTML(value)
    }
  })

  return result
}