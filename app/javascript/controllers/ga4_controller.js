import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["timeSpent"];

  connect() {
    const userId = this.element.getAttribute("data-ga-user-id");
    if (userId && typeof window.gtag === "function") {
      gtag("set", { user_id: userId, debug_mode: true });
    }
  }
}
