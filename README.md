# Genma 🌱  
**A lightweight frontend library for web development, no dependencies, no fuss.**

---

## 🎯 What is Genma?

Genma is a tiny (~1.5KB gzipped) utility library that simplifies common DOM operations with a clean, chainable API. Built entirely in vanilla JS, it’s perfect for progressive enhancement, or when you want ergonomics without the bloat.

### ✨ Problems it solves
- Repetitive `document.querySelector` calls
- Verbose event listener setup/removal
- Manual XSS-safe HTML rendering
- Simple state management without frameworks
- Boilerplate-heavy fetch requests

### 🛠 When to use Genma
- You’re building a **static site**, **landing page**, or **micro-interaction**
- You need **quick DOM manipulation** without a framework
- You want **better DX than raw DOM APIs** but **no build step**
- You’re enhancing server-rendered HTML (e.g., with PHP, Rails, Django, Laravel)

> 💡 **Not for**: Full SPAs, complex state logic, or large-scale apps. Use React/Vue/Svelte instead.

---

## 🚀 Features

| Category | Methods |
|--------|--------|
| **DOM Selection** | `$()` |
| **Events** | `.on()`, `.off()`, `.clickOutside()` |
| **DOM Manipulation** | `.text()`, `.html()`, `.append()`, `.renderList()`, etc. |
| **State** | `$wire()` |
| **HTTP** | `$fetch()` |
| **Safety** | `$.html` (XSS-safe template literals) |

---

## 📦 Installation

### Via CDN (recommended for quick start)
```html
<script src="https://cdn.jsdelivr.net/gh/Rahmad2830/Genma@v1.0.0/dist/genma.min.js"></script>
```

### Or download & host locally
1. Download [`genma.min.js`](https://github.com/Rahmad2830/Genma/archive/refs/tags/v1.0.0.zip)
2. Include in your HTML:
```html
<script src="/path/to/genma.min.js"></script>
```

> ✅ **No bundler needed!** Works directly in browser via `<script>` tag.

---

## ⚡ Quick Start

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/gh/Rahmad2830/Genma@v1.0.0/dist/genma.min.js"></script>
</head>
<body>
  <button id="btn">Click me!</button>
  <div id="counter">0</div>

  <script>
    let count = $wire(0, val => $('#counter').text(val));

    $('#btn').on('click', () => {
      count.set(count.get() + 1);
    });
  </script>
</body>
</html>
```

> 🔥 **Productivity boost**: Chain methods, auto-handle collections, and update UI with minimal code.

---

## 📘 API Reference

### DOM Selection & Traversal
#### `$()`
Select elements like `document.querySelectorAll`, but returns a chainable Genma object.

- **Parameters**: `selector` (string, Element, NodeList, or Array)
- **Returns**: Genma instance
- **Example**:
  ```js
  $('.item')        // all .item
  $('#header')      // element by ID
  $(document)       // document object
  $(this)           // wrap current DOM element (inside event handlers)
  ```
- **Use Example**
  ```js
  $(".btn").on("click", function() {
    //always using function() instead of arrow function for enable $(this) inside selected element
    $(this).css({ color: "green" })
  })
  ```

#### `.first()`, `.last()`, `.eq(index)`
Narrow selection to specific elements.

- **Example**:
  ```js
  //select first element
  $('li').first().addClass('highlight');
  //select last element
  $('li').last().addClass('highlight');
  //select element collection at index 2
  $('li').eq(2).addClass('highlight');
  ```

#### `.find(selector)`, `.closest(selector)`
Traverse descendants or ancestors.

- **Example**:
  ```js
  $('#menu').find('.active').text('Current');
  $('#menu').closest('.active').text('Current');
  ```

#### `.is(selector)`
Check if first element matches a selector or pseudo-class.

- **Example**:
  ```js
  if ($('#modal').is(':visible')) { /* ... */ }
  ```
| Values | Effect |
|--------|--------|
| :disabled | `Checks whether an element (such as a button or input) has the disabled attribute. Returns true if the element is disabled.` |
| :enabled | `The opposite of disabled. Returns true if the element is active and interactable.` |
| :checked | `Specifically for checkboxes or radio buttons. Returns true if the element is currently checked/selected.` |
| :visible | `Checks whether an element is visible on the screen. It checks the width (offsetWidth), height (offsetHeight), or whether the element has an area (rects). If any of these are present, the element is visible.` |
| :hidden | `The opposite of visible. Returns true if the element is hidden (e.g., display: none or size 0x0).` |
| :empty | `Checks the content inside an element. If the result is empty after trimming spaces, the element has no content.` |
| :focus | `Checks whether the element is the active/focused element (e.g. the cursor is blinking on the input).` |

> ⚠️ `.is()` operates only on the **first matched element**.
> If no element is found, it will throw Error.

---

### Event Handling
#### `.on(event, handler)`
Attach event listeners.

- **Parameters**: `event` (string), `handler` (function)
- **Returns**: Genma instance (chainable)
- **Example**:
  ```js
  $('#submit-btn').on('click', handleSubmit);
  ```

#### `.off(event, handler)`
Remove event listeners.

- **Example**:
  ```js
  $('#submit-btn').off('click', handleSubmit);
  ```

#### `$.clickOutside(selector, callback)`
Close dropdowns/modals when clicking outside.

- **Parameters**: `selector` (string), `callback` (function)
- **Returns**: Cleanup function
- **Example**:
  ```js
  const cleanup = $.clickOutside('#dropdown', () => {
    $('#dropdown').removeClass('open');
  });
  // Later: cleanup();
  ```

---

### DOM Manipulation
#### `.text([value])`
Get or set text content.

- **Example**:
  ```js
  $('#title').text('Hello!'); // set
  const current = $('#title').text(); // get
  ```

#### `.html([value])`
⚠️ **Dangerous!** Get or set inner HTML (use `$.html` for safe templates).

- **Example**:
  ```js
  $('#content').html('<p>Unsafe if from user input!</p>');
  ```

#### `.append(htmlString)`, `.prepend()`, etc.
Insert HTML strings (must be string).

- **Example**:
  ```js
  $('#list').append('<li>New item</li>');
  ```

#### `.renderList(array, renderItemFn)`
Re-render a list **imperatively** by replacing its entire contents.

- **Parameters**: `array` (Array), `renderItemFn(item, index) => string`
- **Example**:
  ```js
  const users = [{name: 'Alice'}, {name: 'Bob'}];
  $('#user-list').renderList(users, (user, i) => 
    `<li>${i + 1}. ${user.name}</li>`
  );
  ```

> ⚠️ `renderList` **replaces innerHTML entirely**.
> - Existing DOM nodes are discarded
> - Event listeners inside the list are removed
>
> This is intentional and follows an **imperative rendering model**.

#### `.addClass()`, `.removeClass()`, `.toggleClass()`, `.hasClass()`
Class manipulation.

- **Example**:
  ```js
  $('#menu').toggleClass('open', isOpen);
  ```

#### `.val([value])`, `.attr(name, [value])`, `.data(key, [value])`
Form values, attributes, and dataset.

- **Example**:
  ```js
  const email = $('#email').val();
  $('#avatar').attr('src', user.avatar);
  ```

---

### State Management
#### `$wire(initialValue, onChange?)`
Create reactive state with optional side effects.

- **Parameters**: `initialValue` (any), `onChange(value)` (optional)
- **Returns**: `{ get, set, mutate }`
- **Example**:
  ```js
  const theme = $wire('light', val => {
    document.body.className = val;
  });
  theme.set('dark');
  ```

> 🔄 Use `.mutate(updaterFn)` for object/array updates:
> ```js
> const cart = $wire([], renderCart);
> cart.mutate(items => items.push(newItem));
> ```

> ℹ️ `$wire` is intended for **DOM rendering side-effects only**.
> Avoid long-lived subscriptions, timers, or external observers inside `$wire`
> callbacks, as Genma does not manage cleanup.

---

### HTTP Requests
#### `$fetch(url, options?)`
Simple, promise-based fetch wrapper.

- **Options**: `{ method, headers, body, type: 'json'|'text' }`
- **Returns**: Promise (parsed JSON or text)
- **Example**:
  ```js
  const user = await $fetch('/api/user/123');
  ```

#### `$fetch.inject(defaults)`
Pre-configure defaults (e.g., auth headers).

- **Example**:
  ```js
  const api = $fetch.inject({ headers: { 'Authorization': 'Bearer ...' } });
  const data = await api('/protected-endpoint');
  ```

---

### Utility
#### `$.html(strings, ...values)`
**XSS-safe template literals** — auto-escapes dynamic values.

- **Example**:
  ```js
  const userInput = '<script>alert("xss")</script>';
  $('#output').html($.html`<p>Hello, ${userInput}!</p>`);
  // Renders as: <p>Hello, &lt;script&gt;alert("xss")&lt;/script&gt;!</p>
  ```

#### `$.debounce(fn, delay)`
Debounce function calls.

- **Example**:
  ```js
  const search = $.debounce(query => $fetch(`/search?q=${query}`), 300);
  $('#search').on('input', e => search(e.target.value));
  
  // or
  
  $("#input").on("input", $.debounce((e) => {
      console.log("Search:", e.target.value);
  }, 500));
  ```

---

## 🧪 Real-World Use Cases

### 1. Form Handling
```js
$('#contact-form').on('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  await $fetch('/submit', { method: 'POST', body: formData });
  $('#status').text('Sent!');
});
```

### 2. Toggle UI State
```js
const darkMode = $wire(false, enabled => {
  $('body').toggleClass('dark', enabled);
  localStorage.setItem('dark', enabled);
});

$('#theme-toggle').on('click', () => {
  darkMode.set(!darkMode.get());
});
```

### 3. Render List from API
```js
$fetch('/api/posts').then(posts => {
  $('#post-list').renderList(posts, post => 
    $.html`<article><h2>${post.title}</h2><p>${post.excerpt}</p></article>`
  );
});
```

### 4. Click Outside Modal
```js
const isOpen = $wire(false, (v) => {
  $("#modal").css({ display: v ? "" : "none"})
})

$("#open-modal").on("click", (e) => {
  e.stopPropagation()
  isOpen.set(true)
})

$.clickOutside("#modal", () => {
  isOpen.set(false)
})
```

---

## ✅ Best Practices

- **Use `$.html` for dynamic content** → prevents XSS
- **Chain methods for readability**:
  ```js
  $('#btn')
    .addClass('loading')
    .prop('disabled', true)
    .text('Saving...');
  ```
- **Prefer `$wire` for simple state** → avoid global variables
- **Use `$fetch.inject` for API clients** → DRY headers/auth

---

## ⚠️ Warnings & Anti-Patterns

| ❌ Bad | ✅ Good |
|------|--------|
| `$('#out').html(userInput)` | `$('#out').html($.html`${userInput}`)` |
| Storing complex state in `$wire` | Use `$wire` only for UI state (e.g., toggles, form inputs) |
| Building full SPAs with Genma | Use a framework for routing, components, etc. |
| Over-chaining: `$(...).a().b().c().d().e()` | Break into logical steps for readability |

> 🚫 **Never use `.html()` with untrusted input** — always escape with `$.html`.

---

## 🔍 Comparison

| | Genma | Vanilla JS | jQuery | Alpine.js |
|--|--|--|--|--|
| **Size** | ~2KB | 0KB | ~87KB | ~10KB |
| **Dependencies** | None | None | None | None |
| **State** | `$wire` (simple) | Manual | Manual | Reactive (`x-data`) |
| **Use Case** | Micro-interactions | Everything | Legacy projects | Component-level reactivity |
| **Learning Curve** | Low | Medium | Low | Medium |

> Genma = **jQuery-like ergonomics** + **modern browser APIs** + **intentional constraints.**

---

## ❓ FAQ

**Q: Is this a framework replacement?**  
A: No! It’s a **utility belt** for vanilla JS.

**Q: Is it safe?**  
A: Yes, if you **use `$.html` for dynamic content** and avoid `.html()` with user input.

**Q: Can I use it in production?**  
A: Absolutely! It’s used in production by teams who need lightweight interactivity.

---

## 📜 License

MIT License © Rahmat Nur Hidayat  
Free to use, modify, and distribute.