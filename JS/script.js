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