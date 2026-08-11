const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 450);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

menuButton.addEventListener("click", () => {
  const opened = mainNav.classList.toggle("mobile-open");
  menuButton.innerHTML = opened
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("mobile-open");
    menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

const navLinks = document.querySelectorAll("nav a");
const sections = [...navLinks]
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + entry.target.id
        );
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => navObserver.observe(section));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const glow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", (event) => {
  glow.style.left = event.clientX + "px";
  glow.style.top = event.clientY + "px";
}, { passive: true });
