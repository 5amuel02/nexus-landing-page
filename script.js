/* ========================================
   NEXUS — JavaScript Interactions
   Premium Animation Engine
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initScrollProgress();
    initNavbar();
    initMobileMenu();
    initSplitTextAnimation();
    initSubtitleAnimation();
    initScrollAnimations();
    initCounterAnimation();
    initPricingToggle();
    initCursorGlow();
    initSmoothScroll();
    initParticles();
    initMockupTilt();
    initMockupChartAnimation();
    initMarquee();
    initMagneticButtons();
    initRippleEffect();
    initTiltCards();
    initParallax();
});

/* ---------- Page Loader ---------- */
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;

    // Hide loader immediately after a short delay
    setTimeout(() => {
        loader.classList.add('loaded');
    }, 300);
}

/* ---------- Scroll Progress Bar ---------- */
function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    });
}

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const links = document.getElementById('navLinks');

    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        links.classList.toggle('open');
        btn.classList.toggle('active');
    });

    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            btn.classList.remove('active');
        });
    });
}

/* ---------- Split Text Animation (Hero Title) ---------- */
function initSplitTextAnimation() {
    const title = document.querySelector('.hero-title');
    if (!title) return;

    const lines = title.innerHTML.split('<br>');
    let charIndex = 0;
    let html = '';

    lines.forEach((line, lineIdx) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = line;
        const textContent = tempDiv.textContent;

        // Check if line has gradient-text span
        if (line.includes('gradient-text')) {
            const match = line.match(/<span class="gradient-text">(.*?)<\/span>/);
            if (match) {
                const beforeSpan = line.substring(0, line.indexOf('<span'));
                const spanText = match[1];

                // Process text before span
                for (const char of beforeSpan.trim()) {
                    if (char === ' ') {
                        html += '<span class="char-space"></span>';
                    } else {
                        html += `<span class="char" style="animation-delay: ${charIndex * 30}ms">${char}</span>`;
                        charIndex++;
                    }
                }

                html += '<span class="gradient-text">';
                for (const char of spanText) {
                    if (char === ' ') {
                        html += '<span class="char-space"></span>';
                    } else {
                        html += `<span class="char" style="animation-delay: ${charIndex * 30}ms">${char}</span>`;
                        charIndex++;
                    }
                }
                html += '</span>';
            }
        } else {
            const cleanText = tempDiv.textContent;
            for (const char of cleanText) {
                if (char === ' ') {
                    html += '<span class="char-space"></span>';
                } else {
                    html += `<span class="char" style="animation-delay: ${charIndex * 30}ms">${char}</span>`;
                    charIndex++;
                }
            }
        }

        if (lineIdx < lines.length - 1) {
            html += '<br>';
        }
    });

    title.innerHTML = html;
}

/* ---------- Subtitle Word Animation ---------- */
function initSubtitleAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent.trim();
    const words = text.split(/\s+/);
    let html = '';

    words.forEach((word, i) => {
        const delay = 600 + i * 40; // starts after title animation
        html += `<span class="word" style="animation-delay: ${delay}ms">${word}</span> `;
    });

    subtitle.innerHTML = html;
}

/* wordFade animation is handled in CSS */

/* ---------- Scroll Animations (Intersection Observer) ---------- */
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ---------- Counter Animation ---------- */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.round(easedProgress * target);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ---------- Pricing Toggle ---------- */
function initPricingToggle() {
    const toggle = document.getElementById('pricingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');
    const priceValues = document.querySelectorAll('.price-value');

    if (!toggle) return;

    let isYearly = false;

    toggle.addEventListener('click', () => {
        isYearly = !isYearly;
        toggle.classList.toggle('yearly', isYearly);
        monthlyLabel.classList.toggle('active', !isYearly);
        yearlyLabel.classList.toggle('active', isYearly);

        priceValues.forEach(el => {
            const targetValue = isYearly
                ? el.getAttribute('data-yearly')
                : el.getAttribute('data-monthly');

            el.classList.add('changing');
            animatePriceChange(el, parseInt(targetValue));
            setTimeout(() => el.classList.remove('changing'), 300);
        });
    });
}

function animatePriceChange(element, target) {
    const current = parseInt(element.textContent);
    const diff = target - current;
    const steps = 20;
    const stepDuration = 300 / steps;
    let step = 0;

    function update() {
        step++;
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(current + diff * eased);
        element.textContent = value;

        if (step < steps) {
            setTimeout(update, stepDuration);
        }
    }

    update();
}

/* ---------- Cursor Glow Effect ---------- */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    function updateGlow() {
        glowX += (mouseX - glowX) * 0.06;
        glowY += (mouseY - glowY) * 0.06;

        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        requestAnimationFrame(updateGlow);
    }

    updateGlow();
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ---------- Particle System ---------- */
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        const hero = canvas.parentElement;
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.pulseSpeed = Math.random() * 0.02 + 0.005;
            this.pulseOffset = Math.random() * Math.PI * 2;
        }

        update(time) {
            this.x += this.speedX;
            this.y += this.speedY;

            // Pulse opacity
            this.currentOpacity = this.opacity + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.15;

            // Wrap around
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(162, 155, 254, ${this.currentOpacity})`;
            ctx.fill();
        }
    }

    // Create particles
    const numParticles = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }

    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    const opacity = (1 - dist / 120) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(108, 92, 231, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update(time);
            p.draw();
        });

        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    animate(0);
}

/* ---------- Mockup 3D Tilt ---------- */
function initMockupTilt() {
    const mockup = document.querySelector('.mockup-wrapper');
    const heroMockup = document.querySelector('.hero-mockup');
    if (!mockup || !heroMockup || window.innerWidth < 768) return;

    heroMockup.addEventListener('mousemove', (e) => {
        const rect = heroMockup.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rotateX = y * -8;
        const rotateY = x * 8;

        mockup.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroMockup.addEventListener('mouseleave', () => {
        mockup.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
    });
}

/* ---------- Mockup Chart + Table Animation ---------- */
function initMockupChartAnimation() {
    const charts = document.querySelectorAll('.mockup-card-chart');
    const rows = document.querySelectorAll('.mockup-table-row');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate charts
                charts.forEach((chart, i) => {
                    setTimeout(() => chart.classList.add('animate'), i * 200);
                });

                // Animate table rows
                rows.forEach((row, i) => {
                    setTimeout(() => row.classList.add('animate'), 600 + i * 150);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const mockup = document.querySelector('.mockup-frame');
    if (mockup) observer.observe(mockup);
}

/* ---------- Infinite Marquee ---------- */
function initMarquee() {
    const grid = document.querySelector('.logo-cloud-grid');
    if (!grid) return;

    // Duplicate items for seamless loop
    const items = grid.innerHTML;
    grid.innerHTML = items + items;
}

/* ---------- Magnetic Buttons ---------- */
function initMagneticButtons() {
    if (window.innerWidth < 768) return;

    const buttons = document.querySelectorAll('.btn-primary, .btn-white');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* ---------- Ripple Effect ---------- */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/* ---------- 3D Tilt Cards ---------- */
function initTiltCards() {
    if (window.innerWidth < 768) return;

    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const rotateX = y * -6;
            const rotateY = x * 6;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ---------- Parallax Scrolling ---------- */
function initParallax() {
    const orbs = document.querySelectorAll('.hero-orb');
    const mockup = document.querySelector('.hero-mockup');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Parallax orbs at different speeds
        orbs.forEach((orb, i) => {
            const speed = 0.15 + i * 0.05;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });

        // Mockup parallax
        if (mockup) {
            mockup.style.transform = `translateY(${scrollY * 0.08}px)`;
        }

        // Hero content subtle fade on scroll
        if (heroContent && scrollY < window.innerHeight) {
            const opacity = 1 - scrollY / (window.innerHeight * 0.7);
            const translateY = scrollY * 0.3;
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
    });
}
