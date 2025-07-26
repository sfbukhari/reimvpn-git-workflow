document.addEventListener("DOMContentLoaded", function () {
  // #region AOS
  AOS.init({
    once: true,
    duration: 1500,
  });
  // #endregion
  // #region 1.1 Header section
  // Active page link
  const currentPage = location.pathname.split("/").pop();

  const navLinks = document.querySelectorAll("nav a[href]");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      // Add shared active text color
      link.classList.remove("text-gray-600");
      link.classList.add("text-txtblue");

      // If it's a desktop dropdown link, give it a white background
      const isDesktopDropdownLink =
        link.closest(".dropdown-menu") &&
        window.getComputedStyle(link.closest(".dropdown-menu")).position ===
          "absolute";

      if (isDesktopDropdownLink) {
        link.classList.add("!bg-white", "rounded");
      }
    }
  });

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
  let closeMenu;

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

    closeMenu = () => {
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  //#endregion
  // End of  1.1 Header section

  // #region 1.9. Locations Section
  const s = document.querySelector(".Locations");

  if (s) {
    const buttons = s.querySelectorAll('[role="button"]');

    buttons.forEach((e) => {
      const i = e.querySelector("i.fa-signal"),
        d = e.querySelector("div.w-3");

      e.addEventListener("click", () => {
        buttons.forEach((btn) => {
          const bi = btn.querySelector("i.fa-signal"),
            bd = btn.querySelector("div.w-3");

          bi?.classList.replace("text-txtblue", "text-[#444F7D]");
          bd?.classList.remove("bg-[#2CD340]");
        });

        i?.classList.replace("text-[#444F7D]", "text-txtblue");
        d?.classList.add("bg-[#2CD340]");
      });
    });
  }
  //#endregion
  // End of 1.9. Locations Section

  // #region 1.10. Features Section
  function animateArc() {
    const e = document.getElementById("progressArc"),
      t = document.getElementById("speedValue");
    if (e && t) {
      const r = 502.65,
        n = 62.5,
        o = 62.5,
        a = 2000;
      let i = null;

      const c = (s) => {
        i || (i = s);
        const d = Math.min((s - i) / a, 1);
        t.textContent = (n * d).toFixed(1);
        e.style.strokeDashoffset = r * (1 - (o * d) / 100);
        if (d < 1) requestAnimationFrame(c);
      };
      requestAnimationFrame(c);
    }
  }

  function animateCounters(e) {
    e.querySelectorAll(".speed-value").forEach((t) => {
      const r = parseInt(t.getAttribute("data-target"), 10);
      if (!r) return;
      let n = null;

      const o = (e) => {
        n || (n = e);
        const a = e - n,
          i = Math.min(Math.floor((a / 2000) * r), r);
        t.textContent = i;
        if (i < r) requestAnimationFrame(o);
      };
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
  //#endregion
  // End of 1.10. Features Section

  // #region 1.13 FAQ's Section
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
  //#endregion
  // End of 1.13 FAQ's Section

  // #region < Swiper Sliders >
  // #region 1.8. Services Slider
  if (typeof Swiper !== "undefined") {
    // swiper 1
    new Swiper(".Services-slider .swiper1", {
      loop: true,
      speed: 8000,
      spaceBetween: 30,
      freeMode: { enabled: true, momentum: false },
      autoplay: { delay: 0, disableOnInteraction: false },
      breakpoints: {
        640: {
          slidesPerView: 2.67,
        },
        0: {
          slidesPerView: 1,
        },
      },
    });
    // swiper 2
    new Swiper(".Services-slider .swiper2", {
      loop: true,
      speed: 8000,
      spaceBetween: 30,
      freeMode: { enabled: true, momentum: false },
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2.67,
        },
        0: {
          slidesPerView: 1,
        },
      },
    });
  }

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

  // #endregion End of 1.8. Services Slider

  // #region 1.12. Testimonials Slider
  if (typeof Swiper !== "undefined") {
    new Swiper(".testimonial-swiper", {
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
  }
  // #endregion End of 1.12. Testimonials Slider

  // #region 1.10 Partners Slider
  if (typeof Swiper !== "undefined") {
    new Swiper(".Partners .swiper", {
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
  }
  // #endregion End of 1.10 Partners Slider

  // #endregion < End of Swiper Sliders >

  //#region < Success Modals >
  const sections = [
    { selector: ".Contact", modalId: "#contactModal" },
    { selector: ".Feedback", modalId: "#feedbackModal" },
    { selector: "footer", modalId: "#footerModal" },
  ];

  sections.forEach(({ selector, modalId }) => {
    const section = document.querySelector(selector);
    if (!section) return; // section itself must exist

    const form = section.querySelector("form");
    const modal = section.querySelector(modalId);
    const modalCloseBtn = section.querySelector(".modalCloseBtn");
    const modalDesc = section.querySelector(".modalDesc");
    let modalTimer;

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = form.querySelector(
          'input[name="yourname"], input[name="yourName"]'
        );
        const name = nameInput?.value?.trim();

        // ✅ Only update modalDesc if name was entered
        if (modalDesc && name) {
          modalDesc.textContent = `Thank you, ${name}, for your submission.`;
        }

        form.reset();

        if (modal) {
          modal.classList.remove("invisible", "opacity-0");
          modal.classList.add("opacity-100");

          modalTimer = setTimeout(() => closeModal(modal), 3000);
        }
      });
    }

    if (modalCloseBtn && modal) {
      modalCloseBtn.addEventListener("click", () => closeModal(modal));
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }

    function closeModal(modalEl) {
      modalEl.classList.remove("opacity-100");
      modalEl.classList.add("opacity-0");
      setTimeout(() => modalEl.classList.add("invisible"), 300);
      clearTimeout(modalTimer);
    }
  });

  // #endregion < End of Success Modals >
});
