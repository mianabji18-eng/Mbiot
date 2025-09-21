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
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de scroll reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Cambiar estilo del nav al hacer scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 6px rgba(10, 22, 40, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 4px rgba(10, 22, 40, 0.1)';
    }
});

// Animación de números (simulación de métricas)
let animated = false;
function animateNumbers() {
    if (animated) return;
    
    const numbers = [
        { el: null, start: 0, end: 200, suffix: '+' },
        { el: null, start: 0, end: 15, suffix: 'km' },
        { el: null, start: 0, end: 99.9, suffix: '%', decimals: 1 }
    ];
    
    numbers.forEach((num, index) => {
        const duration = 2000;
        const increment = num.end / (duration / 16);
        let current = num.start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= num.end) {
                current = num.end;
                clearInterval(timer);
            }
            
            if (num.el) {
                const formatted = num.decimals 
                    ? current.toFixed(num.decimals) 
                    : Math.floor(current);
                num.el.textContent = formatted + (num.suffix || '');
            }
        }, 16);
    });
    
    animated = true;
}

// Efecto parallax suave
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = 0.1;
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Animación de partículas flotantes
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(74, 144, 226, 0.3)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    const duration = Math.random() * 3000 + 2000;
    particle.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: `translateY(-${window.innerHeight + 100}px) scale(0)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

// Crear partículas periódicamente
setInterval(createParticle, 300);

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('Microbit IoT Solutions - Ready for Industry 4.0');
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 1s ease-in-out';
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);
