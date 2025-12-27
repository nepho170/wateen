// Simplified script that focuses on functionality mentioned in the company files:
// - language toggle (en/ar) (persisted)
// - mobile menu
// - nav scroll active
// - simple counter animation when in view
// - contact form simulated submit

let currentLang = 'en';

// Language toggle: uses data-en and data-ar attributes
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.body.classList.toggle('rtl', currentLang === 'ar');
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    localStorage.setItem('wateen-lang', currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('wateen-lang');
    if (savedLang && savedLang !== currentLang) {
        toggleLanguage();
    }

    initScrollAnimations();
    animateCounters();
});

// Mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenu.classList.remove('active');
    menuBtn.classList.remove('active');
    document.body.style.overflow = '';
}

// Navbar scroll effect and active link
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const match = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (match) match.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// debounce helper
function debounce(func, wait = 10) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
window.addEventListener('scroll', debounce(updateActiveNav, 20));

/* Simple "AOS-like" entrance */
function initScrollAnimations() {
    const animated = document.querySelectorAll('[data-aos]');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-aos-delay')) || 0;
                setTimeout(() => entry.target.classList.add('aos-animate'), delay);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    animated.forEach(el => obs.observe(el));
}

/* Counters (start when in view) */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || 0, 10);
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const duration = 1600;
                    const step = Math.max(1, Math.floor(target / (duration / 16)));
                    const tick = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = current;
                            requestAnimationFrame(tick);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    tick();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        obs.observe(counter);
    });
}

/* Smooth scroll for in-page links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            closeMobileMenu();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

/* Contact form: simulate submission (per original behaviour) */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.btn-submit');
        const original = submitBtn.innerHTML;
        submitBtn.innerHTML = `${currentLang === 'en' ? 'Sending...' : 'جاري الإرسال...'}`;
        submitBtn.disabled = true;
        setTimeout(() => {
            submitBtn.innerHTML = `${currentLang === 'en' ? 'Message Sent!' : 'تم الإرسال!'} ✓`;
            submitBtn.style.background = '';
            contactForm.reset();
            setTimeout(() => { submitBtn.innerHTML = original; submitBtn.disabled = false; }, 2500);
        }, 1200);
    });
}
