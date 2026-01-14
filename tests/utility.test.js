import "../dist/genma.min.js"

describe("Genma DOM Helper Library", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app" data-id="1">
        <p class="text">Hello</p>
        <input id="input" value="abc" />
        <button id="btn">Click</button>
      </div>
      <div id="outside"></div>
    `
  })

  /* ===============================
   * Selector & Core
   * =============================== */
  test("$ selector & get()", () => {
    expect($("#app").get().length).toBe(1)
    expect($(".text").get()[0].textContent).toBe("Hello")
  })

  test("first / last / eq", () => {
    document.body.innerHTML += `<span>A</span><span>B</span>`
    expect($("span").first().text()).toBe("A")
    expect($("span").last().text()).toBe("B")
    expect($("span").eq(1).text()).toBe("B")
  })

  /* ===============================
   * Text / HTML / Value
   * =============================== */
  test("text()", () => {
    $(".text").text("Changed")
    expect($(".text").text()).toBe("Changed")
  })

  test("html()", () => {
    $("#app").html("<h1>OK</h1>")
    expect($("#app h1").text()).toBe("OK")
  })

  test("val()", () => {
    expect($("#input").val()).toBe("abc")
    $("#input").val("xyz")
    expect($("#input").val()).toBe("xyz")
  })

  /* ===============================
   * Class & Attribute
   * =============================== */
  test("addClass / removeClass / toggleClass", () => {
    $("#app").addClass("active")
    expect($("#app").hasClass("active")).toBe(true)

    $("#app").removeClass("active")
    expect($("#app").hasClass("active")).toBe(false)

    $("#app").toggleClass("x")
    expect($("#app").hasClass("x")).toBe(true)
  })

  test("attr / removeAttr / data", () => {
    expect($("#app").attr("data-id")).toBe("1")

    $("#app").attr("data-id", "2")
    expect($("#app").data("id")).toBe("2")

    $("#app").removeAttr("data-id")
    expect($("#app").attr("data-id")).toBe(null)
  })

  /* ===============================
   * CSS & Property
   * =============================== */
  test("css()", () => {
    $("#app").css({ color: "red" })
    expect($("#app").get()[0].style.color).toBe("red")
  })

  test("prop()", () => {
    $("#input").prop("disabled", true)
    expect($("#input").prop("disabled")).toBe(true)
  })

  /* ===============================
   * Traversal
   * =============================== */
  test("find / closest", () => {
    expect($("#app").find(".text").text()).toBe("Hello")
    expect($(".text").closest("#app").get()[0].id).toBe("app")
  })

  /* ===============================
   * is()
   * =============================== */
  test("is()", () => {
    $("#input").prop("disabled", true)
    expect($("#input").is(":disabled")).toBe(true)
    expect($("#input").is("#input")).toBe(true)
  })

  /* ===============================
   * DOM Insert
   * =============================== */
  test("append / prepend / before / after", () => {
    $("#app").append("<span id='a'>A</span>")
    $("#app").prepend("<span id='b'>B</span>")

    expect($("#b").get().length).toBe(1)
    expect($("#a").get().length).toBe(1)

    $("#app").before("<div id='before'></div>")
    $("#app").after("<div id='after'></div>")

    expect($("#before").get().length).toBe(1)
    expect($("#after").get().length).toBe(1)
  })

  test("remove()", () => {
    $(".text").remove()
    expect($(".text").get().length).toBe(0)
  })

  /* ===============================
   * renderList
   * =============================== */
  test("renderList()", () => {
    const data = ["A", "B", "C"]
    $("#app").renderList(data, (v) => `<span>${v}</span>`)
    expect($("#app span").get().length).toBe(3)
  })

  /* ===============================
   * Events
   * =============================== */
  test("on / off", () => {
    const fn = vi.fn()
    $("#btn").on("click", fn)
    $("#btn").get()[0].click()
    expect(fn).toHaveBeenCalled()

    $("#btn").off("click", fn)
    $("#btn").get()[0].click()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test("clickOutside()", () => {
    const fn = vi.fn()
    const cleanup = $.clickOutside("#btn", fn)

    document.querySelector("#outside").click()
    expect(fn).toHaveBeenCalled()

    cleanup()
  })

  /* ===============================
   * debounce
   * =============================== */
  test("debounce()", async () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const d = $.debounce(fn, 100)

    d()
    d()
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  /* ===============================
   * $wire
   * =============================== */
  test("$wire get / set / mutate", () => {
    const fn = vi.fn()
    const state = $wire({ count: 1 }, fn)

    state.set({ count: 2 })
    expect(state.get().count).toBe(2)
    expect(fn).toHaveBeenCalled()

    state.mutate(s => s.count++)
    expect(state.get().count).toBe(3)
  })

  /* ===============================
   * $fetch
   * =============================== */
  test("$fetch()", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ok: true }),
        text: () => Promise.resolve("ok"),
      })
    )

    const res = await $fetch("/api")
    expect(res.ok).toBe(true)
  })

  /* ===============================
   * $.html (escape)
   * =============================== */
  test("$.html escapes html", () => {
    const unsafe = "<img src=x onerror=alert(1)>"
    const result = $.html`<div>${unsafe}</div>`

    expect(result).toContain("&lt;img")
    expect(result).not.toContain("<img")
  })
})