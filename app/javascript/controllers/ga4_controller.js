import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    const userId = this.element.getAttribute("data-ga4-user-id");
    if (userId && typeof window.gtag === "function") {
      gtag("set", { user_id: userId });
    }
  }
}
