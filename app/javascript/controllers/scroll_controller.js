import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["position", "percent"]

  connect() {
    this.update()
    window.addEventListener("scroll", this.update.bind(this))
    window.addEventListener("resize", this.update.bind(this))
  }

  disconnect() {
    window.removeEventListener("scroll", this.update.bind(this))
    window.removeEventListener("resize", this.update.bind(this))
  }

  update() {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop

    const docHeight = document.documentElement.scrollHeight
    const winHeight = window.innerHeight
    const scrollable = docHeight - winHeight

    const percent =
      scrollable > 0 ? Math.min(100, Math.round((scrollTop / scrollable) * 100)) : 0

    this.positionTarget.textContent = Math.round(scrollTop)
    this.percentTarget.textContent = percent
  }
}
