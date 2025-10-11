/**
 * RAID Alpine - Main JavaScript
 * Interactive features for the cycling tour website
 */

// ============================================
// NAVIGATION
// ============================================

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// SMOOTH SCROLLING
// ============================================

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// DAY SELECTOR / ITINERARY
// ============================================

const dayButtons = document.querySelectorAll('.day-btn');
const dayContents = document.querySelectorAll('.day-content');

// Initialize - show Day 0 by default
function initializeDaySelector() {
    const firstDay = document.querySelector('[data-day="0"]');
    if (firstDay) {
        showDay(0);
    }
}

// Show specific day content
function showDay(dayNumber) {
    // Hide all day contents
    dayContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all buttons
    dayButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected day content
    const selectedContent = document.querySelector(`.day-content[data-day="${dayNumber}"]`);
    const selectedButton = document.querySelector(`.day-btn[data-day="${dayNumber}"]`);

    if (selectedContent) {
        selectedContent.classList.add('active');
    }

    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // Store in localStorage for persistence
    localStorage.setItem('selectedDay', dayNumber);
}

// Add click handlers to day buttons
dayButtons.forEach(button => {
    button.addEventListener('click', () => {
        const day = button.getAttribute('data-day');
        showDay(day);
    });
});

// Restore previously selected day (if any)
function restoreSelectedDay() {
    const savedDay = localStorage.getItem('selectedDay');
    if (savedDay !== null) {
        showDay(savedDay);
    }
}

// Initialize day selector on page load
initializeDaySelector();

// ============================================
// HERO ANIMATIONS
// ============================================

// Fade in hero content on load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero && window.pageYOffset < hero.offsetHeight) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// ============================================
// INTERSECTION OBSERVER - FADE IN ELEMENTS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Add fade-in class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ============================================
// ROUTE STATISTICS COUNTER
// ============================================

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const finalValue = parseInt(statNumber.textContent.replace(/,/g, ''));
                statNumber.textContent = '0';
                animateValue(statNumber, 0, finalValue, 2000);
                entry.target.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// IMAGE LAZY LOADING
// ============================================

// Add loading="lazy" to all images for better performance
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
});

// ============================================
// ROUTE INFO EXTERNAL LINK
// ============================================

// Add icon to external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hostname.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');

        // Add external link indicator
        if (!link.querySelector('.external-icon')) {
            const icon = document.createElement('span');
            icon.className = 'external-icon';
            icon.innerHTML = ' ↗';
            icon.style.fontSize = '0.8em';
            icon.style.opacity = '0.7';
            link.appendChild(icon);
        }
    }
});

// ============================================
// KEYBOARD NAVIGATION FOR DAY SELECTOR
// ============================================

document.addEventListener('keydown', (e) => {
    const activeDay = document.querySelector('.day-btn.active');
    if (!activeDay) return;

    const currentDay = parseInt(activeDay.getAttribute('data-day'));
    let newDay = currentDay;

    // Arrow keys to navigate days
    if (e.key === 'ArrowLeft') {
        newDay = Math.max(0, currentDay - 1);
    } else if (e.key === 'ArrowRight') {
        newDay = Math.min(7, currentDay + 1);
    }

    if (newDay !== currentDay) {
        showDay(newDay);
        // Scroll day selector into view
        const newButton = document.querySelector(`.day-btn[data-day="${newDay}"]`);
        if (newButton) {
            newButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add aria labels to buttons
dayButtons.forEach(button => {
    const day = button.getAttribute('data-day');
    button.setAttribute('aria-label', `View Day ${day} itinerary`);
    button.setAttribute('role', 'tab');
});

// Add aria labels to day content
dayContents.forEach(content => {
    const day = content.getAttribute('data-day');
    content.setAttribute('aria-label', `Day ${day} itinerary details`);
    content.setAttribute('role', 'tabpanel');
});

// Focus management for mobile menu
navToggle?.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        // Focus first menu item when opening
        setTimeout(() => {
            navLinks[0]?.focus();
        }, 300);
    }
});

// ============================================
// PRINT OPTIMIZATION
// ============================================

// Show all days when printing
window.addEventListener('beforeprint', () => {
    dayContents.forEach(content => {
        content.style.display = 'block';
    });
});

window.addEventListener('afterprint', () => {
    dayContents.forEach((content, index) => {
        if (!content.classList.contains('active')) {
            content.style.display = 'none';
        }
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedHighlight = debounce(highlightNavLink, 100);
window.addEventListener('scroll', debouncedHighlight);

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🚴 RAID Alpine - Lake Geneva to Nice', 'font-size: 20px; font-weight: bold; color: #2c5f7d;');
console.log('%c763km | 17,360m elevation | 6 days of epic cycling', 'font-size: 14px; color: #e63946;');
console.log('%cWebsite built for GitHub Pages', 'font-size: 12px; color: #636e72;');

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('RAID Alpine website initialized');

    // Restore any saved preferences
    restoreSelectedDay();

    // Initial navigation highlight
    highlightNavLink();

    // Log loaded state
    console.log('✓ All features loaded and ready');
});
