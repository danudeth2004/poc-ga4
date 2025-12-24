import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["position", "percent", "stop"]

  connect() {
    this.stopped = false
    this.stopTarget.textContent = "false"

    this.stopTimer = null

    this.update()
    window.addEventListener("scroll", this.onScroll)
  }

  disconnect() {
    window.removeEventListener("scroll", this.onScroll)
    clearTimeout(this.stopTimer)
  }

  onScroll = () => {
    this.update()

    this.setStopped(false)

    clearTimeout(this.stopTimer)
    this.stopTimer = setTimeout(() => {
      this.setStopped(true)
    }, 5000)
  }

  update() {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop

    const docHeight = document.documentElement.scrollHeight
    const winHeight = window.innerHeight
    const scrollable = docHeight - winHeight

    const percent =
      scrollable > 0
        ? Math.min(100, Math.round((scrollTop / scrollable) * 100))
        : 0

    this.positionTarget.textContent = Math.round(scrollTop)
    this.percentTarget.textContent = percent
  }

  setStopped(value) {
    if (this.stopped === value) return

    this.stopped = value
    this.stopTarget.textContent = value ? "true" : "false"
  }
}
