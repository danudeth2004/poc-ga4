import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    const measurementId = "G-2PRQ2Z5LXL";
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
    gtag("js", new Date());
    gtag("config", measurementId, {
        
    });
  }
}