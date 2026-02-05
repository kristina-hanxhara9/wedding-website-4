/* ==========================================================================
   Wedding Invitation Website - JavaScript
   Inspired by MOOSER Hotel scroll effects and animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initParallax();
    initCountdown();
    initFormValidation();
    initSmoothScroll();
    initImageReveal();
});

/* ==========================================================================
   Navigation
   ========================================================================== */
function initNavigation() {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    // Header scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');

            // Animate hamburger to X
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');

            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

/* ==========================================================================
   Scroll Effects (MOOSER-style reveal animations)
   ========================================================================== */
function initScrollEffects() {
    const scrollElements = document.querySelectorAll('[data-scroll]');
    const imageWrappers = document.querySelectorAll('.image-wrapper');
    const detailCards = document.querySelectorAll('.detail-card');
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Intersection Observer for scroll reveal
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add stagger effect for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const index = Array.from(timelineItems).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all scroll elements
    scrollElements.forEach(el => observer.observe(el));
    imageWrappers.forEach(el => observer.observe(el));
    detailCards.forEach(el => observer.observe(el));
    timelineItems.forEach(el => observer.observe(el));

    // Parallax scroll text effect for large titles
    const outlineTexts = document.querySelectorAll('.outline-text');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        outlineTexts.forEach((text, index) => {
            const speed = 0.1 * (index + 1);
            const direction = index % 2 === 0 ? 1 : -1;
            text.style.transform = `translateX(${scrollY * speed * direction}px)`;
        });
    });
}

/* ==========================================================================
   Parallax Effects
   ========================================================================== */
function initParallax() {
    const heroVideo = document.querySelector('.hero-video');
    const heroContent = document.querySelector('.hero-content');
    const locationBg = document.querySelector('.location-image-bg img');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Hero parallax
        if (heroVideo && scrollY < windowHeight) {
            heroVideo.style.transform = `translateY(${scrollY * 0.3}px)`;
            heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrollY / windowHeight);
        }

        // Location section parallax
        if (locationBg) {
            const locationSection = document.querySelector('.section-location');
            const sectionTop = locationSection.offsetTop;
            const sectionHeight = locationSection.offsetHeight;

            if (scrollY > sectionTop - windowHeight && scrollY < sectionTop + sectionHeight) {
                const relativeScroll = scrollY - sectionTop + windowHeight;
                const parallaxOffset = relativeScroll * 0.2;
                locationBg.style.transform = `translateY(${parallaxOffset}px) scale(1.1)`;
            }
        }
    });
}

/* ==========================================================================
   Image Reveal Effects
   ========================================================================== */
function initImageReveal() {
    const images = document.querySelectorAll('.image-wrapper img, .story-image img, .detail-image img');

    images.forEach(img => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'opacity 0.8s ease, transform 1.2s ease';

        // Check if image is already loaded
        if (img.complete) {
            revealImage(img);
        } else {
            img.addEventListener('load', () => revealImage(img));
        }
    });

    function revealImage(img) {
        // Use intersection observer for lazy reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    }, 100);
                    observer.unobserve(img);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(img);
    }
}

/* ==========================================================================
   Countdown Timer
   ========================================================================== */
function initCountdown() {
    const weddingDate = new Date('June 15, 2025 14:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl) return;

    let isFirstRun = true;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            daysEl.textContent = '0';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (isFirstRun) {
            // Set values directly on first load - no animation
            daysEl.textContent = days.toString();
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
            isFirstRun = false;
        } else {
            // Animate subsequent changes
            animateNumber(daysEl, days.toString());
            animateNumber(hoursEl, hours.toString().padStart(2, '0'));
            animateNumber(minutesEl, minutes.toString().padStart(2, '0'));
            animateNumber(secondsEl, seconds.toString().padStart(2, '0'));
        }
    }

    function animateNumber(element, newValue) {
        if (element.textContent !== newValue) {
            element.style.transform = 'translateY(-10px)';
            element.style.opacity = '0';

            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, 150);
        }
    }

    // Add transition styles
    [daysEl, hoursEl, minutesEl, secondsEl].forEach(el => {
        if (el) {
            el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        }
    });

    // Initial update immediately
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
}

/* ==========================================================================
   Form Validation
   ========================================================================== */
function initFormValidation() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    // Float label effect
    const formGroups = form.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        if (input && label) {
            // Check initial state
            if (input.value) {
                label.classList.add('active');
            }

            input.addEventListener('focus', () => {
                label.classList.add('active');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Simple validation
        if (!data.name || !data.email || !data.attendance) {
            showNotification('Ju lutem plotësoni të gjitha fushat e detyrueshme.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Ju lutem shkruani një email të vlefshëm.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'DUKE DËRGUAR...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Faleminderit! Konfirmimi juaj u dërgua me sukses.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Reset labels
            formGroups.forEach(group => {
                const label = group.querySelector('label');
                if (label) label.classList.remove('active');
            });
        }, 1500);
    });
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Styles
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#5C4A3D' : '#c0392b'};
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ==========================================================================
   Smooth Scroll
   ========================================================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            // Custom smooth scroll with easing
            smoothScrollTo(targetPosition, 1000);
        });
    });
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function (easeInOutCubic)
        const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

/* ==========================================================================
   Cursor Effect (Optional - for desktop)
   ========================================================================== */
function initCustomCursor() {
    if (window.innerWidth < 1024) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
    document.body.appendChild(cursor);

    const dot = cursor.querySelector('.cursor-dot');
    const outline = cursor.querySelector('.cursor-outline');

    // Styles
    cursor.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
    `;

    dot.style.cssText = `
        width: 8px;
        height: 8px;
        background-color: #C9A86C;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    `;

    outline.style.cssText = `
        width: 40px;
        height: 40px;
        border: 1px solid rgba(201, 168, 108, 0.5);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: transform 0.15s ease, border-color 0.3s ease;
    `;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Smooth outline follow
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        outline.style.left = outlineX + 'px';
        outline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn-outline, .btn-rsvp, .btn-submit');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            outline.style.borderColor = 'rgba(201, 168, 108, 1)';
            dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });

        el.addEventListener('mouseleave', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1)';
            outline.style.borderColor = 'rgba(201, 168, 108, 0.5)';
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

/* ==========================================================================
   Loading Animation
   ========================================================================== */
function initLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-names">K & A</div>
            <div class="loader-bar"><div class="loader-progress"></div></div>
        </div>
    `;

    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #5C4A3D;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;

    document.body.appendChild(loader);
    document.body.style.overflow = 'hidden';

    // Animate loader
    const progress = loader.querySelector('.loader-progress');
    progress.style.cssText = `
        width: 0%;
        height: 2px;
        background-color: #C9A86C;
        transition: width 0.3s ease;
    `;

    const loaderBar = loader.querySelector('.loader-bar');
    loaderBar.style.cssText = `
        width: 100px;
        height: 2px;
        background-color: rgba(255,255,255,0.2);
        margin-top: 1rem;
    `;

    const loaderNames = loader.querySelector('.loader-names');
    loaderNames.style.cssText = `
        font-family: 'Cormorant Garamond', serif;
        font-size: 2rem;
        color: white;
        letter-spacing: 0.2em;
    `;

    let loadProgress = 0;
    const interval = setInterval(() => {
        loadProgress += Math.random() * 20;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(interval);

            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                document.body.style.overflow = '';

                setTimeout(() => loader.remove(), 500);
            }, 300);
        }
        progress.style.width = loadProgress + '%';
    }, 100);
}

// Initialize loader on page load
// Uncomment to enable: initLoader();

/* ==========================================================================
   Text Reveal Animation (MOOSER style)
   ========================================================================== */
function initTextReveal() {
    const titles = document.querySelectorAll('.hero-title, .section-title-large, .location-title, .rsvp-title');

    titles.forEach(title => {
        const text = title.innerHTML;
        const words = text.split(' ');

        title.innerHTML = words.map(word =>
            `<span class="word-wrapper"><span class="word">${word}</span></span>`
        ).join(' ');

        const wordSpans = title.querySelectorAll('.word');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wordSpans.forEach((word, index) => {
                        word.style.transitionDelay = `${index * 0.1}s`;
                        word.classList.add('revealed');
                    });
                    observer.unobserve(title);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(title);
    });
}

/* ==========================================================================
   Horizontal Scroll Section (like MOOSER features)
   ========================================================================== */
function initHorizontalScroll() {
    const horizontalSection = document.querySelector('.horizontal-scroll-section');
    if (!horizontalSection) return;

    const scrollContainer = horizontalSection.querySelector('.horizontal-scroll-container');
    const scrollContent = horizontalSection.querySelector('.horizontal-scroll-content');

    if (!scrollContainer || !scrollContent) return;

    const contentWidth = scrollContent.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = contentWidth - viewportWidth;

    window.addEventListener('scroll', () => {
        const rect = horizontalSection.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = horizontalSection.offsetHeight;

        if (sectionTop <= 0 && sectionTop >= -sectionHeight + viewportWidth) {
            const progress = Math.abs(sectionTop) / (sectionHeight - viewportWidth);
            const translateX = progress * scrollDistance;
            scrollContent.style.transform = `translateX(-${translateX}px)`;
        }
    });
}

/* ==========================================================================
   Initialize Additional Effects
   ========================================================================== */

// Uncomment features as needed:
// initCustomCursor();
// initTextReveal();
// initHorizontalScroll();
