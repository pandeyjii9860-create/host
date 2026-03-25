// ==================== PAGE NAVIGATION ====================
function showPage(pageId) {
    // Prevent default link behavior if called from link
    if (event) {
        event.preventDefault();
    }

    // Hide all pages with fade out
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase().includes(pageId.toLowerCase()) || 
            (pageId === 'home' && link.textContent.toLowerCase().includes('home'))) {
            link.classList.add('active');
        }
    });

    // Close mobile menu
    closeMobileMenu();

    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Log page view (for analytics)
    console.log('Navigated to:', pageId);
}

// ==================== MOBILE MENU ====================
const hamburgerElement = document.getElementById('hamburger');
const navMenuElement = document.getElementById('navMenu');

function toggleMobileMenu() {
    if (hamburgerElement) {
        hamburgerElement.classList.toggle('active');
    }
    if (navMenuElement) {
        navMenuElement.classList.toggle('active');
    }
}

function closeMobileMenu() {
    if (hamburgerElement) {
        hamburgerElement.classList.remove('active');
    }
    if (navMenuElement) {
        navMenuElement.classList.remove('active');
    }
}

// Mobile Menu Toggle Event Listener
if (hamburgerElement) {
    hamburgerElement.addEventListener('click', toggleMobileMenu);
}

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        closeMobileMenu();
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenuElement && navMenuElement.contains(event.target);
    const isClickOnHamburger = hamburgerElement && hamburgerElement.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenuElement) {
        closeMobileMenu();
    }
});

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name') || 'User';
        
        // Show success message
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'var(--accent-color)';
        
        // Reset form
        this.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
        
        // Log submission (replace with actual backend call)
        console.log('Form submitted:', {
            name: name,
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        });
    });
}

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const navContainer = document.querySelector('.nav-container');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Update shadow on scroll
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    // Hide/show navbar on scroll (optional)
    if (scrollTop > lastScrollTop && scrollTop > 300) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s ease';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==================== INTERSECTION OBSERVER (LAZY LOADING) ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards and team members
document.querySelectorAll('.service-card, .team-member, .gallery-item, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== ACTIVE NAV LINK ON PAGE LOAD ====================
document.addEventListener('DOMContentLoaded', function() {
    // Set home as active by default
    const homeLink = document.querySelector('.nav-link');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    // Add event listeners to all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get page name from link text
            const pageName = this.textContent.toLowerCase().trim();
            showPage(pageName);
        });
    });

    // Logo click to go home
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.remove('active');
            });
            document.querySelector('.nav-link').classList.add('active');
            showPage('home');
        });
    }
});

// ==================== FORM VALIDATION ====================
function validateForm(form) {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const phone = form.querySelector('input[name="phone"]');
    const subject = form.querySelector('input[name="subject"]');
    const message = form.querySelector('textarea[name="message"]');

    let isValid = true;

    // Check all fields are filled
    [name, email, phone, subject, message].forEach(field => {
        if (field && field.value.trim() === '') {
            field.style.borderColor = '#d32f2f';
            isValid = false;
        } else if (field) {
            field.style.borderColor = '#ddd';
        }
    });

    // Validate email format
    if (email && !isValidEmail(email.value)) {
        email.style.borderColor = '#d32f2f';
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================== COUNTER ANIMATION ====================
let hasAnimated = false;

const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

function animateCounters() {
    document.querySelectorAll('.stat h3').forEach(element => {
        const finalValue = parseInt(element.textContent);
        const increment = finalValue / 50;
        let currentValue = 0;

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                element.textContent = finalValue + '+';
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(currentValue) + '+';
            }
        }, 30);
    });
}

const statsSection = document.querySelector('.company-stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// ==================== SOCIAL MEDIA LINKS ====================
document.querySelectorAll('.social-link, .social-icon').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Add your social media URLs here
        const socialLinks = {
            facebook: 'https://facebook.com',
            instagram: 'https://instagram.com',
            whatsapp: 'https://whatsapp.com'
        };
        
        const icon = this.querySelector('i');
        let url = '#';
        
        if (icon.classList.contains('fa-facebook')) {
            url = socialLinks.facebook;
        } else if (icon.classList.contains('fa-instagram')) {
            url = socialLinks.instagram;
        } else if (icon.classList.contains('fa-whatsapp')) {
            url = socialLinks.whatsapp;
        }
        
        if (url !== '#') {
            window.open(url, '_blank');
        }
    });
});

// ==================== UTILITY FUNCTIONS ====================

// Debounce function for resize events
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== PAGE PERFORMANCE ====================
window.addEventListener('load', function() {
    console.log('Page fully loaded');
    
    // Remove loading class if exists
    document.body.classList.remove('loading');
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(event) {
    console.error('Error occurred:', event.error);
});

// ==================== INITIALIZE ====================
console.log('Dewaki Construction Company Website Loaded');
console.log('Version: 1.0.0');