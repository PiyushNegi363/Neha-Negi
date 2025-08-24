// Mobile Navigation Toggle with Touch Support
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Enhanced mobile navigation with touch events
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Add both click and touch events for better mobile support
hamburger.addEventListener('click', toggleMobileNav);
hamburger.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleMobileNav();
});

// Close mobile menu when clicking on a link with touch support
document.querySelectorAll('.nav-link').forEach(n => {
    n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
    n.addEventListener('touchend', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Swipe gesture for mobile navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 100;
    const swipeDistance = touchEndX - touchStartX;
    
    // Swipe right to open menu
    if (swipeDistance > swipeThreshold && !navMenu.classList.contains('active')) {
        toggleMobileNav();
    }
    // Swipe left to close menu
    else if (swipeDistance < -swipeThreshold && navMenu.classList.contains('active')) {
        toggleMobileNav();
    }
}

// Smooth scrolling for navigation links
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

// Navbar background change on scroll (Light Mode)
let ticking = false;
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Enhanced Intersection Observer for scroll animations and lazy loading
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Lazy loading observer for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            img.classList.add('fade-in', 'visible');
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

// Observe all lazy loading images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.classList.add('fade-in');
    imageObserver.observe(img);
});

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .service-item, .project-card, .education-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Add hover effects to cards
document.querySelectorAll('.skill-card, .service-item, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add active state to navigation links
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Highlight active link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Add CSS for active navigation state
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeNavStyle);

// Mouse Cursor Effects (Desktop Only)
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.cursor-follower, .cursor-dot');

// Only initialize cursor effects on non-touch devices
if (!('ontouchstart' in window)) {
    circles.forEach(function (circle) {
        circle.x = 0;
        circle.y = 0;
    });
} else {
    // Hide cursor elements on touch devices
    circles.forEach(circle => {
        circle.style.display = 'none';
    });
}

// Initialize EmailJS
(function() {
    emailjs.init("Op0SYeDwtaKZxPBqC");
})();

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Prepare email parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Neha Negi'
        };
        
        // Send email using EmailJS
        emailjs.send('service_w9jgdlq', 'template_qvn09d8', templateParams)
            .then(function(response) {
                showNotification('Thank you for your message! I will get back to you soon.', 'success');
                contactForm.reset();
            }, function(error) {
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            })
            .finally(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#a8d5ba' : type === 'error' ? '#f4a6cd' : '#c8b5d9'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.type === 'submit') return; // Don't animate submit buttons
        
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Scroll-Triggered Animations
const scrollObserverOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Immediate animation trigger for faster response
            entry.target.classList.add('animate');
            entry.target.classList.add('visible');
            
            // Add staggered delay only for elements with stagger class
            if (entry.target.classList.contains('scroll-animate-stagger')) {
                const delay = index * 100; // Reduced from 150ms to 100ms
                entry.target.style.animationDelay = `${delay}ms`;
            }
        }
    });
}, scrollObserverOptions);

// Observe all scroll-animate elements
document.addEventListener('DOMContentLoaded', () => {
  // Observe elements for scroll animations
document.querySelectorAll('.scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .scroll-animate-stagger, .scroll-animate-rotate').forEach(el => {
    scrollObserver.observe(el);
});

// Performance: Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any layout-dependent values
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transition = 'none';
            setTimeout(() => {
                navbar.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
            }, 100);
        }
    }, 250);
});

// Optimize scroll performance with passive listeners
window.addEventListener('scroll', updateNavbar, { passive: true });

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = ['photo.jpg'];
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    preloadCriticalResources();
    
    // Add touch-friendly hover states for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});
});

// Smooth reveal for section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    title.classList.add('scroll-animate');
    scrollObserver.observe(title);
});

// Add scroll animation to contact form
const contactFormElement = document.querySelector('.contact-form');
if (contactFormElement) {
    contactFormElement.classList.add('scroll-animate-scale');
    scrollObserver.observe(contactFormElement);
}

// Add scroll animation to footer sections
const footerSections = document.querySelectorAll('.footer-section');
footerSections.forEach((section, index) => {
    section.classList.add('scroll-animate-stagger');
    scrollObserver.observe(section);
});

// Debug and error handling
console.log('Portfolio website loaded successfully');

// Check for missing elements and log them
document.addEventListener('DOMContentLoaded', () => {
    const requiredElements = [
        { selector: '.hero-title', name: 'Hero Title' },
        { selector: '.profile-image', name: 'Profile Image' },
        { selector: '#contact', name: 'Contact Section' },
        { selector: '.contact-form', name: 'Contact Form' },
        { selector: '.navbar', name: 'Navigation' }
    ];
    
    requiredElements.forEach(element => {
        const el = document.querySelector(element.selector);
        if (!el) {
            console.warn(`Missing element: ${element.name} (${element.selector})`);
        } else {
            console.log(`✓ ${element.name} found`);
        }
    });
    
    // Check for image loading
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        img.addEventListener('load', () => {
            console.log(`✓ Image ${index + 1} loaded successfully: ${img.src}`);
        });
        
        img.addEventListener('error', () => {
            console.error(`✗ Image ${index + 1} failed to load: ${img.src}`);
        });
    });
    
    // Check for EmailJS initialization
    if (typeof emailjs !== 'undefined') {
        console.log('✓ EmailJS loaded successfully');
    } else {
        console.warn('✗ EmailJS not loaded');
    }
    
    // Check Font Awesome
    const fontAwesomeTest = document.createElement('i');
    fontAwesomeTest.className = 'fas fa-test';
    document.body.appendChild(fontAwesomeTest);
    
    const computedStyle = window.getComputedStyle(fontAwesomeTest);
    if (fontAwesomeTest.style.fontFamily.includes('Font Awesome')) {
        console.log('✓ Font Awesome loaded successfully');
    } else {
        console.warn('✗ Font Awesome may not be loaded properly');
    }
    
    document.body.removeChild(fontAwesomeTest);
});