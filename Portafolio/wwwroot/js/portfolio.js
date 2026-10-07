/* ============================================================
   JUAN KARLOS PORTFOLIO — portfolio.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. NAVBAR — scroll effect & active link
    ---------------------------------------------------------- */
    const navbar   = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], div[id]');

    const onScroll = () => {
        // Scrolled class
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) current = sec.id;
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === current) link.classList.add('active');
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ----------------------------------------------------------
       2. HAMBURGER — mobile menu
    ---------------------------------------------------------- */
    const hamburger   = document.getElementById('hamburger');
    const navLinksEl  = document.getElementById('navLinks');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinksEl.classList.toggle('open');
    });

    // Close menu on link click
    navLinksEl?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinksEl.classList.remove('open');
        });
    });

    /* ----------------------------------------------------------
       3. SMOOTH SCROLL for anchor links
    ---------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const navHeight = parseInt(getComputedStyle(document.documentElement)
                .getPropertyValue('--nav-h')) || 72;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ----------------------------------------------------------
       4. INTERSECTION OBSERVER — reveal animations
    ---------------------------------------------------------- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.observe').forEach(el => observer.observe(el));

    /* ----------------------------------------------------------
       5. SKILL CARDS — staggered entrance
    ---------------------------------------------------------- */
    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    skillCards.forEach(card => skillObserver.observe(card));

    /* ----------------------------------------------------------
       6. CURSOR — custom orange dot (desktop only)
    ---------------------------------------------------------- */
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed; top: 0; left: 0;
            width: 8px; height: 8px;
            background: #E85002;
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            transition: transform 0.15s ease, opacity 0.2s ease;
            transform: translate(-50%, -50%);
        `;

        const cursorRing = document.createElement('div');
        cursorRing.style.cssText = `
            position: fixed; top: 0; left: 0;
            width: 32px; height: 32px;
            border: 1px solid rgba(232,80,2,0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99998;
            transition: transform 0.35s ease, opacity 0.2s ease, width 0.25s ease, height 0.25s ease;
            transform: translate(-50%, -50%);
        `;

        document.body.appendChild(cursor);
        document.body.appendChild(cursorRing);

        let mx = 0, my = 0;

        document.addEventListener('mousemove', (e) => {
            mx = e.clientX; my = e.clientY;
            cursor.style.left = mx + 'px';
            cursor.style.top  = my + 'px';
            cursorRing.style.left = mx + 'px';
            cursorRing.style.top  = my + 'px';
        });

        // Hover on links/buttons
        document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorRing.style.width = '48px';
                cursorRing.style.height = '48px';
                cursorRing.style.borderColor = 'rgba(232,80,2,0.8)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorRing.style.width = '32px';
                cursorRing.style.height = '32px';
                cursorRing.style.borderColor = 'rgba(232,80,2,0.5)';
            });
        });
    }

    /* ----------------------------------------------------------
       7. COUNTER ANIMATION — hero stats
    ---------------------------------------------------------- */
    const animateCounter = (el, target, suffix = '') => {
        let start = 0;
        const duration = 1500;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const nums = entry.target.querySelectorAll('.stat-number');
                nums.forEach(num => {
                    const text = num.textContent.trim();
                    const match = text.match(/(\d+)/);
                    if (match) {
                        const target = parseInt(match[1]);
                        const suffix = text.replace(match[1], '');
                        const span = num.querySelector('span');
                        num.textContent = '0';
                        if (span) num.appendChild(span);
                        animateCounter(num, target, '');
                    }
                });
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statObserver.observe(heroStats);

    /* ----------------------------------------------------------
       8. PARALLAX — hero title subtle effect
    ---------------------------------------------------------- */
    const heroTitle = document.querySelector('.hero-title');
    window.addEventListener('scroll', () => {
        if (!heroTitle) return;
        const y = window.scrollY * 0.15;
        heroTitle.style.transform = `translateY(${y}px)`;
    }, { passive: true });

});
