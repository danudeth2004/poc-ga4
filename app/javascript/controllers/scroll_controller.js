import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["position", "percent", "stop", "direction", "timeSpent", "stops"];

  connect() {
    this.lastScrollTop = window.pageYOffset || 0;
    this.stopped = false;
    this.stopTimer = null;
    this.stops = [];

    this.startTime = Date.now();
    this.sentStats = false;

    this.update();
    this.stopTarget.textContent = "false";
    this.directionTarget.textContent = "-";

    window.addEventListener("scroll", this.onScroll);

    this.updateInterval = setInterval(() => {
      this.updateTimeSpent();
    }, 1000);

    window.addEventListener("beforeunload", this.sendReadingStats);
  }

  disconnect() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("beforeunload", this.sendReadingStats);
    clearTimeout(this.stopTimer);
    clearInterval(this.updateInterval);
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

    if (percent >= 50) {
      this.Send();
    }
  }

  setStopped(value) {
    if (this.stopped === value) return;
    this.stopped = value;
    this.stopTarget.textContent = value ? "true" : "false";

    if (value === true) {
      this.recordStop();
    }
  }

  recordStop() {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollable = docHeight - winHeight;

    const percent =
      scrollable > 0
        ? Math.round((scrollTop / scrollable) * 100)
        : 0;

    const seconds = Math.round((Date.now() - this.startTime) / 1000);

    this.stops.push({
      percent,
      time: seconds,
    });

    this.renderStops();
  }

  renderStops() {
    if (this.stops.length === 0) {
      this.stopsTarget.textContent = "No stops yet";
      return;
    }

    this.stopsTarget.innerHTML = this.stops
      .map(
        (stop, index) => `
          <div>
            ${index + 1}: ${stop.percent}% at ${stop.time}s
          </div>
        `
      )
      .join("");
  }

  updateTimeSpent() {
    if (!this.startTime) return;

    const seconds = Math.round((Date.now() - this.startTime) / 1000);
    this.timeSpentTarget.textContent = seconds;

    if (seconds >= 10) {
      this.Send();
    }
  }

  Send() {
    if (this.sentStats) return;
    this.sendReadingStats();
  }

  sendReadingStats = () => {
    if (!this.startTime || this.sentStats) return;
    if (typeof window.gtag !== "function") return;

    const seconds = Math.round((Date.now() - this.startTime) / 1000);

    this.sentStats = true;

    gtag("event", "reading_stats", {
      word_count: Number(this.element.dataset.scrollWordCount),
      duration_seconds: seconds,
    });
  };
}
