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
        debug_mode: true,
        user_id: this.element.getAttribute("data-ga-user-id"),
        page_path: window.location.pathname,
    });
    
    // Start tracking time on page
    this.startTime = Date.now();
    
    // Handle page close/refresh
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }
  
  disconnect() {
    this.sendTimeSpent();
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  }
  
  handleBeforeUnload() {
    this.sendTimeSpent();
  }
  
  sendTimeSpent() {
    if (!this.startTime) return;
    
    const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
    
    // Use sendBeacon for reliable tracking on page close
    if (navigator.sendBeacon) {
      const data = {
        client_id: "YOUR_CLIENT_ID", // GA4 will handle this
        events: [{
          name: "page_time_spent",
          params: {
            event_category: "engagement",
            event_label: window.location.pathname,
            time_seconds: timeSpent
          }
        }]
      };
      // Fallback to gtag if sendBeacon not available
      window.gtag("event", "page_time_spent", {
        page_path: window.location.pathname,
        duration_seconds: timeSpent
      });
    } else {
      window.gtag("event", "page_time_spent", {
        page_path: window.location.pathname,
        duration_seconds: timeSpent
      });
    }
    
    // Prevent duplicate sends
    this.startTime = null;
  }
}