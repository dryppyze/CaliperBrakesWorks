const header = document.querySelector("[data-site-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const quickStickyCta = document.querySelector(".quick-sticky-cta");
const stickyPriceButton = quickStickyCta?.querySelector('a[data-track-event="sticky_price_range_clicked"]');
const stickyTextButton = quickStickyCta?.querySelector('a[data-track-event="sticky_text_clicked"]');
const routeToggle = document.querySelector(".route-toggle");
const routeButtons = document.querySelectorAll("[data-route-option]");
const axleButtons = document.querySelectorAll("[data-axle-option]");
const packagePrices = document.querySelectorAll("[data-package-price]");
const mobilePrices = document.querySelectorAll("[data-mobile-price]");
const staticPrices = document.querySelectorAll("[data-static-price]");
const packageBars = document.querySelectorAll(".vehicle-bars");
const routeLabel = document.querySelector("[data-route-label]");
const axleSummary = document.querySelector("[data-axle-summary]");
const axleNoteTitle = document.querySelector("[data-axle-note-title]");
const axleNoteBody = document.querySelector("[data-axle-note-body]");
const routeNote = document.querySelector("[data-route-note]");
const packagesSection = document.querySelector(".packages-section");
const packageGridEnd = document.querySelector(".package-grid-end");
const nextStepCta = document.querySelector(".package-cta");
let routeToggleObserver;
let stickyTextIdleTimer;
let axleMultiplier = 2;

const PRICE_CONFIG = {
  static: {
    "hardware-adjustment": "$35-$90",
    "hardware-adjustment-text": "$35 to $90"
  },
  supply: {
    prices: {
      "minimum-sedan": "$139 to $179",
      "minimum-suv": "$159 to $219",
      "minimum-truck": "$309 to $344",
      "rotor-sedan": "$200 to $324",
      "rotor-suv": "$249 to $489",
      "rotor-truck": "$359 to $399",
      "bundle-sedan": "$275 to $429",
      "bundle-suv": "$339 to $609",
      "bundle-truck": "$479 to $549"
    },
    note:
      "Parts + labour ranges include a supplier parts allowance. Vehicle-specific parts are paid before ordering. Labour is paid after service. Vehicle type, wheel count, supplier pricing, rotor size, rust, seized hardware, and electronic parking brake setup can move the written estimate."
  },
  customer: {
    prices: {
      "minimum-sedan": "$99 to $119",
      "minimum-suv": "$119 to $149",
      "minimum-truck": "$139 to $174",
      "rotor-sedan": "$129 to $159",
      "rotor-suv": "$159 to $189",
      "rotor-truck": "$189 to $229",
      "bundle-sedan": "$214 to $249",
      "bundle-suv": "$249 to $309",
      "bundle-truck": "$309 to $379"
    },
    note:
      "Bring Your Own Parts pricing is labour only. Fitment and compatibility are at your own risk and expense. Wrong, missing, unsafe, or poor-fit parts can pause the job, add labour time, or require rescheduling."
  }
};

const routeLabels = {
  supply: "We supply the parts",
  customer: "Bring Your Own Parts"
};

const BAR_MAX = 1000;

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
  if (quickStickyCta) {
    quickStickyCta.classList.toggle("is-visible", window.scrollY > 520);
  }
  if (stickyTextButton) {
    clearTimeout(stickyTextIdleTimer);
    stickyPriceButton?.classList.remove("is-muted");
    stickyTextButton.classList.remove("is-highlighted");
    if (window.scrollY > 520) {
      stickyTextIdleTimer = window.setTimeout(() => {
        stickyPriceButton?.classList.add("is-muted");
        stickyTextButton.classList.add("is-highlighted");
      }, 7000);
    }
  }
}

function closeNavigation() {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("is-open");
  document.body.classList.remove("nav-open");
}

function trackEvent(name, detail = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, detail);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...detail });
  }
}

function setPackageRoute(route) {
  const selectedRoute = PRICE_CONFIG[route] ? route : "supply";
  const selectedData = PRICE_CONFIG[selectedRoute];

  routeButtons.forEach((button) => {
    const isSelected = button.dataset.routeOption === selectedRoute;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  packagePrices.forEach((price) => {
    const key = price.dataset.packagePrice;
    if (selectedData.prices[key]) {
      price.textContent = scaleRange(selectedData.prices[key], axleMultiplier);
    }
  });

  mobilePrices.forEach((price) => {
    const key = price.dataset.mobilePrice;
    if (selectedData.prices[key]) {
      price.textContent = compactRange(scaleRange(selectedData.prices[key], axleMultiplier));
    }
  });

  if (routeLabel) {
    routeLabel.textContent = routeLabels[selectedRoute];
  }

  if (axleSummary) {
    axleSummary.textContent = axleMultiplier === 2 ? "4-wheel pricing" : "2-wheel pricing";
  }

  if (axleNoteTitle && axleNoteBody) {
    if (axleMultiplier === 2) {
      axleNoteTitle.textContent = "4-wheel pricing:";
      axleNoteBody.textContent = "All four wheels are shown together so you can see the full budget. Switch to 2 wheels only if you need one front or rear pair.";
    } else {
      axleNoteTitle.textContent = "2-wheel pricing:";
      axleNoteBody.textContent = "This view shows one front pair or one rear pair. Switch to all 4 wheels to see the combined budget.";
    }
  }

  if (routeNote) {
    routeNote.textContent = selectedData.note;
  }

  updatePackageBars();
}

function setStaticPrices() {
  staticPrices.forEach((price) => {
    const key = price.dataset.staticPrice;
    if (PRICE_CONFIG.static[key]) {
      price.textContent = PRICE_CONFIG.static[key];
    }
  });
}

function compactRange(value) {
  return value.replace(/\s+to\s+/g, "-");
}

function parseRange(value) {
  const match = String(value).match(/\$?([\d,]+)\s+to\s+\$?([\d,]+)/i);
  if (!match) return null;
  return {
    low: Number(match[1].replace(/,/g, "")),
    high: Number(match[2].replace(/,/g, ""))
  };
}

function formatMoney(amount) {
  return `$${Math.round(amount).toLocaleString("en-CA")}`;
}

function formatRange(low, high) {
  return `${formatMoney(low)} to ${formatMoney(high)}`;
}

function scaleRange(value, multiplier) {
  const parsed = parseRange(value);
  if (!parsed) return value;
  return formatRange(parsed.low * multiplier, parsed.high * multiplier);
}

function parseUpperBound(value) {
  const match = String(value).match(/\$?([\d,]+)\s+to\s+\$?([\d,]+)/i);
  if (!match) return 0;
  return Number(match[2].replace(/,/g, ""));
}

function animateFill(fill, targetWidth) {
  const current = Number.parseFloat(fill.dataset.currentWidth || "0");
  fill.style.width = `${current}%`;
  window.requestAnimationFrame(() => {
    fill.style.width = `${targetWidth}%`;
    fill.dataset.currentWidth = String(targetWidth);
  });
}

function updatePackageBars() {
  packageBars.forEach((bar) => {
    const rows = bar.querySelectorAll("div");
    rows.forEach((row) => {
      const amount = row.querySelector("strong");
      const fill = row.querySelector(".bar-fill");
      if (!amount || !fill) return;
      const upperBound = parseUpperBound(amount.textContent);
      const targetWidth = Math.max(8, Math.min(100, (upperBound / BAR_MAX) * 100));
      animateFill(fill, targetWidth);
    });
  });
}

function setupRouteToggleObserver() {
  if (!routeToggle || !packageGridEnd) return;
  if (routeToggleObserver) {
    routeToggleObserver.disconnect();
    routeToggleObserver = undefined;
  }

  if (!window.matchMedia("(min-width: 860px)").matches) {
    routeToggle.classList.remove("is-hidden");
    return;
  }

  routeToggleObserver = new IntersectionObserver(
    ([entry]) => {
      const passedCards = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      routeToggle.classList.toggle("is-hidden", passedCards);
    },
    {
      root: null,
      threshold: 0
    }
  );

  routeToggleObserver.observe(packageGridEnd);
}

setHeaderState();
setStaticPrices();
setPackageRoute("customer");
setupRouteToggleObserver();

window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("resize", setupRouteToggleObserver, { passive: true });

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("is-open", !isExpanded);
    document.body.classList.toggle("nav-open", !isExpanded);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

routeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const route = button.dataset.routeOption || "supply";
    setPackageRoute(route);
    trackEvent("parts_route_selected", { route });
  });
});

axleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const option = button.dataset.axleOption || "full";
    axleMultiplier = option === "pair" ? 1 : 2;
    axleButtons.forEach((el) => {
      const isSelected = el === button;
      el.classList.toggle("is-selected", isSelected);
      el.setAttribute("aria-pressed", String(isSelected));
    });
    setPackageRoute(document.querySelector(".route-option.is-selected")?.dataset.routeOption || "customer");
    trackEvent("axle_view_selected", { view: option });
  });
});

document.querySelectorAll("[data-track-event]").forEach((element) => {
  element.addEventListener("click", () => {
    trackEvent(element.dataset.trackEvent || "site_click");
  });
});
