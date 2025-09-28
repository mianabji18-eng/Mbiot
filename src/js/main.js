// --- MENÚ MÓVIL ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// --- SCROLL SUAVE ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- SCROLL REVEAL (reiniciable) ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    } else {
      entry.target.classList.remove('revealed'); // vuelve a ocultar
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// --- NAVBAR SCROLL + PARALLAX ---
// ---- OPTIMIZACIÓN SCROLL ----
const nav = document.querySelector('nav');
const parallax = document.querySelector('.hero');
let lastScrollY = 0;
let ticking = false;

function onScroll() {
  // Nav style
  if (lastScrollY > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  // Parallax
  if (parallax) {
    const speed = 0.1;
    parallax.style.transform = `translateY(${lastScrollY * speed}px)`;
  }

  ticking = false;
}

window.addEventListener("scroll", () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(onScroll);
    ticking = true;
  }
});

// --- FADE-IN INICIAL ---
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  console.log('Mbiot IoT Solutions - Ready for Industry 4.0');
});
