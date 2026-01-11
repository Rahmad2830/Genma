export function $wire(value, onChange) {
  if(onChange) onChange(value)
  
  const get = () => value
  const set = (v) => {
    if(v !== value) {
      value = v
      if(onChange) onChange(value)
      return value
    }
  }
  const mutate = (callback) => {
    const val = structuredClone(value)
    callback(val)
    set(val)
  }
  
  return { get, set, mutate }
}