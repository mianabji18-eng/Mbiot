// Menu móvil
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

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll reveal con IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

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

// ---- ANIMACIÓN DE NÚMEROS ----
let animated = false;
function animateNumbers() {
  if (animated) return;
  animated = true;

  const numbers = [
    { el: document.querySelector("#num1"), start: 0, end: 200, suffix: '+' },
    { el: document.querySelector("#num2"), start: 0, end: 15, suffix: 'km' },
    { el: document.querySelector("#num3"), start: 0, end: 99.9, suffix: '%', decimals: 1 }
  ];

  numbers.forEach(num => {
    let startTime;
    function update(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / 2000, 1);
      const current = num.start + (num.end - num.start) * progress;

      if (num.el) {
        const formatted = num.decimals 
          ? current.toFixed(num.decimals) 
          : Math.floor(current);
        num.el.textContent = formatted + (num.suffix || '');
      }

      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// ---- PARTICULAS OPTIMIZADAS ----
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * window.innerWidth + 'px';
  document.body.appendChild(particle);

  particle.animate([
    { transform: 'translateY(0) scale(1)', opacity: 1 },
    { transform: `translateY(-${window.innerHeight + 100}px) scale(0)`, opacity: 0 }
  ], {
    duration: Math.random() * 3000 + 2000,
    easing: 'ease-out'
  }).onfinish = () => particle.remove();
}

// Crear menos partículas
setInterval(createParticle, 1000);

// ---- LOADING ----
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

console.log('Microbit IoT Solutions - Ready for Industry 4.0');
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 1s ease-in-out';
setTimeout(() => document.body.style.opacity = '1', 100);
