
document.addEventListener("DOMContentLoaded", function () {
  // 1.1 Header section
  // Dropdown bar
  document.querySelectorAll(".dropdown").forEach((d) => {
    const m = d.querySelector(".dropdown-menu"),
      toggle = d.querySelector("button");

    m.style.maxHeight = "0";
    m.style.transition = "max-height 0.3s ease, visibility 0.3s ease";
    m.style.overflow = "hidden";
    m.style.visibility = "hidden";

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = m.style.maxHeight !== "0px" && m.style.maxHeight !== "";
      if (isOpen) {
        m.style.maxHeight = "0";
        m.style.visibility = "hidden";
      } else {
        m.style.visibility = "visible";
        m.style.maxHeight = m.scrollHeight + "px";
      }
    });

    document.addEventListener("click", (e) => {
      if (!d.contains(e.target)) {
        m.style.maxHeight = "0";
        m.style.visibility = "hidden";
      }
    });
  });

  // Aside navigation
  (() => {
    const t = document.getElementById("navToggle"),
      e = document.getElementById("navClose"),
      n = document.getElementById("mobileMenu"),
      l = document.getElementById("mobileDropdownToggle"),
      o = document.getElementById("mobileDropdown"),
      d = document.getElementById("overlay");

    const openMenu = () => {
      if (n && d) {
        n.classList.remove("-translate-x-full");
        d.classList.remove("hidden");
      }
    };

    const closeMenu = () => {
      if (n && d && o) {
        n.classList.add("-translate-x-full");
        d.classList.add("hidden");
        o.style.maxHeight = null;
      }
    };

    t && t.addEventListener("click", openMenu);
    e && e.addEventListener("click", closeMenu);
    d && d.addEventListener("click", closeMenu);
    l &&
      o &&
      l.addEventListener("click", () => {
        o.style.maxHeight = o.style.maxHeight ? "" : o.scrollHeight + "px";
      });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  })();

  // close when ESC is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  // End of  1.1 Header section

  // 1.8. Services Slider Section
  // swiper 1
  const _swiper1 = new Swiper(".Services-slider .swiper1", {
    loop: true,
    speed: 8000,
    slidesPerView: 2,
    freeMode: { enabled: true, momentum: false },
    autoplay: { delay: 0, disableOnInteraction: false },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });
  // swiper 2
  const _swiper2 = new Swiper(".Services-slider .swiper2", {
    loop: true,
    speed: 8000,
    slidesPerView: 2,
    freeMode: { enabled: true, momentum: false },
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      reverseDirection: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  function checkWordPositions() {
    [
      [".swiper1", 0.26],
      [".swiper2", 0.65],
    ].forEach(([s, p]) => {
      const e = document.querySelector(s);
      if (!e) return;
      const t = window.innerWidth * p;
      e.querySelectorAll(".word").forEach((o) => {
        const r = o.getBoundingClientRect(),
          c = r.left + r.width / 4;
        Math.abs(c - t) < 50
          ? o.classList.add("highlight")
          : o.classList.remove("highlight");
      });
    });
    requestAnimationFrame(checkWordPositions);
  }
  checkWordPositions();
  // End of 1.8. Services Slider Section

  // 1.10. Features Section
  function animateArc() {
    const e = document.getElementById("progressArc"),
      t = document.getElementById("speedValue");
    if (e && t) {
      const r = 502.65,
        n = 62.5,
        o = 62.5,
        a = 2e3;
      let i = null;
      function c(s) {
        i || (i = s);
        const d = Math.min((s - i) / a, 1);
        t.textContent = (n * d).toFixed(1);
        e.style.strokeDashoffset = r * (1 - (o * d) / 100);
        d < 1 && requestAnimationFrame(c);
      }
      requestAnimationFrame(c);
    }
  }
  function animateCounters(e) {
    e.querySelectorAll(".speed-value").forEach((t) => {
      const r = parseInt(t.getAttribute("data-target"), 10);
      if (!r) return;
      let n = null;
      function o(e) {
        n || (n = e);
        const a = e - n,
          i = Math.min(Math.floor((a / 2e3) * r), r);
        t.textContent = i;
        i < r && requestAnimationFrame(o);
      }
      requestAnimationFrame(o);
    });
  }
  const featuresSection = document.querySelector(".Features .items-end");
  featuresSection &&
    new IntersectionObserver(
      (e, t) => {
        e.forEach((e) => {
          e.isIntersecting &&
            (animateArc(),
            animateCounters(featuresSection),
            t.unobserve(featuresSection));
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -50px 0px" }
    ).observe(featuresSection);
  const servicesSection = document.querySelector(".Services-slider");
  servicesSection &&
    new IntersectionObserver(
      (e, t) => {
        e.forEach((e) => {
          e.isIntersecting &&
            (animateCounters(servicesSection), t.unobserve(servicesSection));
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -50px 0px" }
    ).observe(servicesSection);
  // End of 1.10. Features Section

  //1.12. Testimonials Section
  const _swiper3 = new Swiper(".testimonial-swiper", {
    loop: true,
    speed: 500,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });
  // End of 1.12. Testimonials Section

  // 1.13 FAQ's Section
  const buttons = document.querySelectorAll(".Faq #faq-wrapper .faq-toggle");

  buttons.forEach((button, index) => {
    const content = button.querySelector(".accordion-content");
    const icon = button.querySelector("span");

    if (index === 0) {
      content.classList.add("open");
      icon.innerHTML = "\u2212";
    } else {
      content.classList.remove("open");
      icon.innerHTML = "\u002B";
    }

    button.addEventListener("click", () => {
      buttons.forEach((btn) => {
        const c = btn.querySelector(".accordion-content");
        const i = btn.querySelector("span");

        if (btn === button) {
          c.classList.toggle("open");
          i.innerHTML = c.classList.contains("open") ? "\u2212" : "\u002B";
        } else {
          c.classList.remove("open");
          i.innerHTML = "\u002B";
        }
      });
    });
  });
  // End of 1.13 FAQ's Section

  // 2.7. Partners Section
  const _swiper4 = new Swiper(".Partners .swiper", {
    loop: true,
    speed: 2000,
    slidesPerView: "auto",
    spaceBetween: 13,
    freeMode: {
      enabled: true,
      momentum: false,
    },
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  });
  // 2.7. Partners Section
});
