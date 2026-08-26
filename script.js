// Paksa posisi halaman ke paling atas saat pertama kali dibuka atau di-refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Loading Screen Multibahasa
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loader-bar');
    const greetingEl = document.getElementById('loader-greeting');
    
    const greetings = [
        "Hello!",        // Inggris
        "こんにちは!",   // Jepang
        "你好!",         // Mandarin
        "안녕하세요!",   // Korea
        "Bonjour!",      // Prancis
        "¡Hola!"         // Spanyol
    ];
    let index = 0;

    const greetingInterval = setInterval(() => {
        index = (index + 1) % greetings.length;
        greetingEl.style.opacity = 0;
        greetingEl.style.transform = 'translateY(8px)';
        setTimeout(() => {
            greetingEl.textContent = greetings[index];
            greetingEl.style.opacity = 1;
            greetingEl.style.transform = 'translateY(0)';
        }, 150);
    }, 400);

    setTimeout(() => {
        loaderBar.style.transform = 'translateX(0)';
    }, 150);

    setTimeout(() => {
        clearInterval(greetingInterval);
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 3200);
});

// Custom Cursor Follower
const cursor = document.getElementById('custom-cursor');
window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

const interactiveElements = document.querySelectorAll('a, button, .card, .project-card, .badge-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// Liquid Glass Navbar Dock
const navItems = document.querySelectorAll('.nav-item');
const navDock = document.getElementById('nav-dock');

function updateDockPosition(activeElement) {
    if (!activeElement || !navDock) return;
    const itemLeft = activeElement.offsetLeft;
    const itemWidth = activeElement.offsetWidth;
    
    navDock.style.transform = `translateX(${itemLeft}px)`;
    navDock.style.width = `${itemWidth}px`;
}

window.addEventListener('DOMContentLoaded', () => {
    const activeItem = document.querySelector('.nav-item.active') || navItems[0];
    updateDockPosition(activeItem);
});

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        updateDockPosition(item);
    });
});

// Penanganan perpindahan halaman aktif berdasarkan Scroll
const sections = document.querySelectorAll('section, footer');
window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSectionId = sectionId;
        }
    });

    if (currentSectionId) {
        navItems.forEach(item => {
            if (item.getAttribute('data-target') === currentSectionId) {
                if (!item.classList.contains('active')) {
                    navItems.forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');
                    updateDockPosition(item);
                }
            }
        });
    }
});

window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
        updateDockPosition(activeItem);
    }
});

// Rotasi Badge Card Hero
const rotatingBadges = [
    {
        text: "Linguistics",
        color: "#F472B6",
        glow: "rgba(244, 114, 182, 0.25)",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
    },
    {
        text: "Designer",
        color: "#A78BFA",
        glow: "rgba(167, 139, 250, 0.25)",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`
    }
];
let badgeIndex = 0;
const rotatingBadgeEl = document.getElementById('rotating-badge');

if (rotatingBadgeEl) {
    setInterval(() => {
        rotatingBadgeEl.style.opacity = 0;
        rotatingBadgeEl.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            badgeIndex = (badgeIndex + 1) % rotatingBadges.length;
            rotatingBadgeEl.innerHTML = `
                <div class="icon-box" style="--icon-color: ${rotatingBadges[badgeIndex].color}; --icon-glow: ${rotatingBadges[badgeIndex].glow};">
                    ${rotatingBadges[badgeIndex].svg}
                </div>
                <span>${rotatingBadges[badgeIndex].text}</span>
            `;
            rotatingBadgeEl.style.opacity = 1;
            rotatingBadgeEl.style.transform = 'translateX(0)';
        }, 300);
    }, 3000);
}

// Efek Ketik Hero
const words = ["Frontend Developer", "Fullstack Developer", "UI/UX Enthusiast"];
let i = 0;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typing-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return;
        }
        setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typing-text').innerHTML = word.join("");
        } else {
            i = (i + 1) % words.length;
            setTimeout(typingEffect, 500);
            return;
        }
        setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

setTimeout(typingEffect, 3300);

// Efek Ketik Judul Section Saat Masuk Layar
function triggerTypewriter(element) {
    if (element.classList.contains('typed')) return;
    element.classList.add('typed');
    const textToType = element.getAttribute('data-title');
    let charIndex = 0;
    element.textContent = "";

    function typeChar() {
        if (charIndex < textToType.length) {
            element.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 70);
        }
    }
    typeChar();
}

const observerOptions = {
    root: null,
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const titleEl = entry.target.querySelector('.typewriter-title');
            if (titleEl) {
                triggerTypewriter(titleEl);
            }
        } else {
            entry.target.classList.remove('active');
            const titleEl = entry.target.querySelector('.typewriter-title');
            if (titleEl) {
                titleEl.classList.remove('typed');
                titleEl.textContent = "";
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Fitur Ganti Tema
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = themeToggle.querySelector('.sun-icon');
const moonIcon = themeToggle.querySelector('.moon-icon');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    const rect = themeToggle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const ripple = document.createElement('div');
    ripple.classList.add('theme-ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.backgroundColor = targetTheme === 'dark' ? '#0f172a' : '#ffffff';
    document.body.appendChild(ripple);

    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', targetTheme);
        if (targetTheme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }, 300);

    setTimeout(() => {
        ripple.remove();
    }, 650);
});
