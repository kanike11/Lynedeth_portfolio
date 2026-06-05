document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');

    // Ignore placeholder links like href="#"
    if (!href || href === '#') return;

    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Apply AOS attributes programmatically (keeps HTML clean)
(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const apply = (selector, aosName, baseDelay = 0, step = 80) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            if (!el.getAttribute('data-aos')) el.setAttribute('data-aos', aosName);
            if (!el.getAttribute('data-aos-delay')) el.setAttribute('data-aos-delay', String(baseDelay + index * step));
        });
    };

    apply('.cards .card', 'zoom-in', 0, 80);
    apply('.tool-grid span', 'fade-up', 0, 50);
    apply('.gallery img', 'zoom-in', 0, 80);
    apply('.experience-box', 'fade-up', 0, 0);
    apply('.stats .stat', 'fade-up', 0, 80);
})();

// Count-up animation for statistics
(() => {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    if (!statNumbers.length) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (el) => {
        const target = Number(el.getAttribute('data-count') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = Number(el.getAttribute('data-duration') || '1200');

        if (!Number.isFinite(target) || target <= 0) {
            el.textContent = `0${suffix}`;
            return;
        }

        if (prefersReducedMotion) {
            el.textContent = `${target}${suffix}`;
            return;
        }

        let startTime = null;
        const step = (timestamp) => {
            if (startTime === null) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);
            el.textContent = `${value}${suffix}`;
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    // Initialize content
    statNumbers.forEach((el) => {
        const suffix = el.getAttribute('data-suffix') || '';
        el.textContent = `0${suffix}`;
    });

    if (!('IntersectionObserver' in window)) {
        statNumbers.forEach(animate);
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animate(entry.target);
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.45 }
    );

    statNumbers.forEach((el) => observer.observe(el));
})();

// Optional premium library init (no-op unless the page includes the required markup)

// AOS: add `data-aos="fade-up"` (etc.) to elements you want animated
if (window.AOS && typeof window.AOS.init === 'function') {
    window.AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-out',
    });
}

// Swiper: requires markup with a `.swiper` root (https://swiperjs.com/get-started)
if (window.Swiper) {
    const swiperRoot = document.querySelector('.swiper');
    if (swiperRoot) {
        // Minimal defaults; customize once you add a Swiper section
        // eslint-disable-next-line no-new
        new window.Swiper('.swiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 16,
        });
    }
}

// Typed.js: add an element like:
// <span class="typed" data-typed='["Virtual Assistant","SEO Writer"]'></span>
if (window.Typed) {
    const typedEl = document.querySelector('[data-typed]');
    if (typedEl) {
        let strings = [];
        try {
            strings = JSON.parse(typedEl.getAttribute('data-typed') || '[]');
        } catch (e) {
            strings = [];
        }

        if (Array.isArray(strings) && strings.length > 0) {
            // eslint-disable-next-line no-new
            new window.Typed(typedEl, {
                strings,
                typeSpeed: 45,
                backSpeed: 25,
                backDelay: 1200,
                loop: true,
                smartBackspace: true,
            });
        }
    }
}