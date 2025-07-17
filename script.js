// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number');
const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
const sections = document.querySelectorAll('section');

// Navbar scroll effect with smooth transition
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = 'none';
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Function to update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = ['home', 'services', 'reviews', 'about'];
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (section && navLink) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

// Mobile navigation toggle with improved UX
navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Intersection Observer para animaciones mejoradas
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Añadir clases de animación basadas en el tipo de elemento
            if (element.classList.contains('fade-in-up')) {
                element.style.animationPlayState = 'running';
            }
            
            if (element.classList.contains('fade-in-scale')) {
                element.style.animationPlayState = 'running';
            }
            
            if (element.classList.contains('animated-text')) {
                element.classList.add('typewriter');
            }
            
            if (element.classList.contains('animated-text-hero')) {
                element.style.animationPlayState = 'running';
            }
            
            // Animaciones escalonadas para elementos hijos
            const delayedElements = element.querySelectorAll('[class*="delay-"]');
            delayedElements.forEach((delayedEl, index) => {
                setTimeout(() => {
                    delayedEl.style.animationPlayState = 'running';
                }, index * 100);
            });
            
            animationObserver.unobserve(element);
        }
    });
}, observerOptions);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when they come into view
            if (entry.target.classList.contains('hero-stats')) {
                statNumbers.forEach((stat, index) => {
                    const targets = [500, 98, 24]; // Values for each stat
                    setTimeout(() => {
                        animateCounter(stat, targets[index]);
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observar elementos con animaciones
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-scale, .animated-text, .animated-text-hero');
    
    animatedElements.forEach(element => {
        // Pausar animaciones inicialmente
        element.style.animationPlayState = 'paused';
        animationObserver.observe(element);
    });
}

// Función para inicializar animaciones de texto typewriter
function initTypewriterAnimations() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Remover el cursor parpadeante después de completar
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    });
}

// Función para manejar efectos de hover en las tarjetas de plantillas
function initTemplateCardEffects() {
    const templateCards = document.querySelectorAll('.template-card');
    
    templateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Función para manejar los botones de plantillas
function initTemplateButtons() {
    const templateButtons = document.querySelectorAll('.template-btn');
    
    templateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Redirigir a Patreon después del efecto
            setTimeout(() => {
                window.open('https://www.patreon.com/CreateMavenn', '_blank');
            }, 300);
        });
    });
}

// Observe elements for fade-in animation
fadeElements.forEach(element => {
    observer.observe(element);
});

// Observe hero stats for counter animation
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observer.observe(heroStats);
}

// Button ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .service-btn, .patreon-btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-primary, .btn-secondary, .service-btn, .patreon-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Smooth parallax effect for hero section
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.05);
        const yPos = scrolled * speed;
        element.style.transform = `translateY(${yPos}px) scale(${1 - scrolled * 0.0001})`;
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Add notification styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-primary);
        border-radius: 8px;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        z-index: 10000;
        backdrop-filter: blur(20px);
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        box-shadow: var(--shadow-lg);
    }
    
    .notification-success {
        border-color: #10b981;
    }
    
    .notification-error {
        border-color: #ef4444;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-primary);
    }
    
    .notification-success .notification-content i {
        color: #10b981;
    }
    
    .notification-error .notification-content i {
        color: #ef4444;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.2s ease;
    }
    
    .notification-close:hover {
        background: var(--bg-glass);
        color: var(--text-primary);
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(notificationStyle);

// Handle Patreon button clicks
document.querySelectorAll('.patreon-btn, .service-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('¡Redirigiendo a Patreon! Gracias por tu interés en nuestros servicios.', 'success');
        
        // Simulate redirect delay
        setTimeout(() => {
            window.open('https://patreon.com/createmavenn', '_blank');
        }, 1000);
    });
});

// Templates functionality
function initTemplates() {
    // Add ripple effect to template buttons
    const templateBtns = document.querySelectorAll('.template-btn');
    templateBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add hover effects to template cards
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Add hover effects to template categories
    const templateCategories = document.querySelectorAll('.template-category');
    templateCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.color = '#ff6b6b';
            }
        });
        
        category.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '#00d4ff';
            }
        });
    });
}

// Enhanced page load animations and UX improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .section-header');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Initialize smooth card animations
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
        card.style.animation = 'floatSmooth 8s ease-in-out infinite';
        card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Initialize page with loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize new animations and effects
    initAnimations();
    initTemplateCardEffects();
    initTemplateButtons();
    initTemplates();
    
    // Add keyboard navigation support
    addKeyboardNavigation();
    
    // Initialize tooltips for better UX
    initializeTooltips();
    
    // Add focus management for accessibility
    addFocusManagement();
    
    // Inicializar animaciones de typewriter después de un pequeño delay
    setTimeout(initTypewriterAnimations, 500);
});

// Keyboard navigation support
function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Initialize tooltips for interactive elements
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

// Focus management for better accessibility
function addFocusManagement() {
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Tooltip functions
function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Close any notifications
        document.querySelectorAll('.notification').forEach(notification => {
            notification.remove();
        });
    }
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Navbar effect
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
    }
    
    // Smooth parallax effect
    updateParallax();
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded) .hero-content {
        opacity: 0;
        transform: translateY(30px);
    }
    
    body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.8s ease;
    }
`;
document.head.appendChild(loadingStyle);