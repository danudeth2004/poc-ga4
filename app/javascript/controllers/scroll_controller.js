import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["position", "percent", "stop", "direction", "timeSpent"];

  connect() {
    this.lastScrollTop = window.pageYOffset || 0;
    this.stopped = false;
    this.stopTimer = null;

    this.startTime = Date.now();
    this.sentStats = false;

    this.update();
    this.stopTarget.textContent = "false";
    this.directionTarget.textContent = "-";

    window.addEventListener("scroll", this.onScroll);

    this.updateInterval = setInterval(() => {
      this.updateTimeSpentDisplay();
    }, 1000);
  }

  disconnect() {
    window.removeEventListener("scroll", this.onScroll);
    clearTimeout(this.stopTimer);
    clearInterval(this.updateInterval);

    this.sendReadingStats();
  }

  onScroll = () => {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop) {
      this.directionTarget.textContent = "down";
    } else if (currentScroll < this.lastScrollTop) {
      this.directionTarget.textContent = "up";
    }

    this.lastScrollTop = Math.max(currentScroll, 0);

    this.setStopped(false);

    clearTimeout(this.stopTimer);
    this.stopTimer = setTimeout(() => {
      this.setStopped(true);
    }, 5000);

    this.update();
  };

  update() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollable = docHeight - winHeight;

    const percent =
      scrollable > 0
        ? Math.min(100, Math.round((scrollTop / scrollable) * 100))
        : 0;

    this.positionTarget.textContent = Math.round(scrollTop);
    this.percentTarget.textContent = percent;
  }

  setStopped(value) {
    if (this.stopped === value) return;

    this.stopped = value;
    this.stopTarget.textContent = value ? "true" : "false";
  }

  updateTimeSpentDisplay() {
    if (!this.startTime || !this.hasTimeSpentTarget) return;

    const seconds = Math.round((Date.now() - this.startTime) / 1000);
    this.timeSpentTarget.textContent = seconds;
  }

  sendReadingStats() {
    if (!this.startTime || this.sentStats) return;

    const seconds = Math.round((Date.now() - this.startTime) / 1000);
    this.sentStats = true;

    window.gtag("event", "reading_stats", {
      word_count: Number(
        this.element.getAttribute("data-scroll-word-count")
      ),
      duration_seconds: seconds,
    });

    this.startTime = null;
  }
}
