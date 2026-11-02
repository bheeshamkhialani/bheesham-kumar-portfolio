
/* =========================================
   BHEESHAM KUMAR - PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // 1. FOOTER YEAR
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 2. NAVBAR SCROLL EFFECT
  const nav = document.getElementById("nav");

  function updateNavbar() {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 30);
    }
  }

  window.addEventListener("scroll", updateNavbar);
  updateNavbar();

  // 3. MOBILE NAVIGATION
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  function closeMenu() {
    if (!menu || !burger) return;

    menu.classList.remove("open");
    burger.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  }

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");

      burger.classList.toggle("active", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
      burger.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        !menu.contains(event.target) &&
        !burger.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // 4. DARK / LIGHT THEME
  const themeBtn = document.getElementById("theme");
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }

  function updateThemeButton() {
    if (!themeBtn) return;

    const currentTheme =
      document.documentElement.getAttribute("data-theme");

    themeBtn.textContent =
      currentTheme === "light" ? "Dark" : "Light";
  }

  updateThemeButton();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";

      const newTheme = isLight ? "dark" : "light";

      if (newTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }

      localStorage.setItem("portfolio-theme", newTheme);
      updateThemeButton();
    });
  }

  // 5. TYPING ANIMATION
  const roleElement = document.getElementById("role");

  if (roleElement) {
    const roles = [
      "Full-Stack Developer",
      "React.js Developer",
      "Python Developer",
      "Web Application Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeRole() {
      const currentRole = roles[roleIndex];

      roleElement.textContent = currentRole.substring(
        0,
        charIndex
      );

      if (!deleting) {
        charIndex++;

        if (charIndex > currentRole.length) {
          deleting = true;
          setTimeout(typeRole, 1500);
          return;
        }
      } else {
        charIndex--;

        if (charIndex < 0) {
          charIndex = 0;
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(typeRole, deleting ? 45 : 85);
    }

    typeRole();
  }

  // 6. PROJECT FILTERING
  const filterButtons = document.querySelectorAll(".chip");
  const projects = document.querySelectorAll(".project");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(btn =>
        btn.classList.remove("active")
      );

      button.classList.add("active");

      projects.forEach(project => {
        const category = project.dataset.cat;

        const shouldShow =
          filter === "all" || category === filter;

        project.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  // 7. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // 8. ACTIVE NAVIGATION LINK
  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navLinks = document.querySelectorAll(
    "#menu a[href^='#']"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                `#${entry.target.id}`
              );
            });
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px"
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  // 9. CLOSE MOBILE MENU ON ESCAPE
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

});
