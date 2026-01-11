export async function $fetch(url, params = {}) {
  const {
    method = "GET",
    headers = {},
    body,
    type = "json",
    fetchOpt = {}
  } = params
  
  const isJson = body && typeof body === "object" && !(body instanceof FormData)
  
  const hasBody = method !== "GET" && body !== undefined
  
  const options = {
    method,
    headers: {
      ...(isJson ? { "Content-Type": "application/json" } : {}),
      ...headers
    },
    ...fetchOpt
  }
  
  if(hasBody) {
    options.body = isJson ? JSON.stringify(body) : body
  }
  
  try {
    const res = await fetch(url, options)
    if(!res.ok) {
      throw new Error(await res.text())
    }
    
    return type === "text" ? await res.text() : await res.json()
  } catch (err) {
    console.error("Request failed ", err)
    throw err
  }
}

$fetch.inject = (defaults = {}) => {
  return async function(url, params = {}) {
    return $fetch(url, {
      ...defaults,
      ...params,
      headers: {
        ...defaults.headers,
        ...params.headers
      },
      fetchOpt: {
        ...defaults.fetchOpt,
        ...params.fetchOpt
      }
    })
  }
}