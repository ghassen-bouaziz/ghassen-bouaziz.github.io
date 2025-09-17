// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initContactForm();
    initAnimations();
    initLanguageToggle();
    initCVDownload();
    initEventTracking();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .about-text, .contact-info');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${getTranslation('contact.form.sending')}`;
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Track successful form submission
            trackEvent('form_submit', 'Contact', 'Form Submission', 'Contact Form', 1);
            
            // Show success message
            showNotification(getTranslation('contact.form.success'), 'success');
            contactForm.reset();
            
        } catch (error) {
            // Track form submission error
            trackEvent('form_error', 'Contact', 'Form Error', 'Contact Form', 0);
            
            // Show error message
            showNotification(getTranslation('contact.form.error'), 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
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
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
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
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Animation initialization
function initAnimations() {
    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.ceil(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
}

// Language toggle functionality
function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    
    langToggle.addEventListener('click', () => {
        const newLang = currentLanguage === 'en' ? 'fr' : 'en';
        setLanguage(newLang);
        
        // Track language switch event
        trackEvent('language_switch', 'User Interaction', 'Language Toggle', `Switch to ${newLang.toUpperCase()}`, 1);
    });
}

// CV Download functionality
function initCVDownload() {
    const cvDownload = document.getElementById('cv-download');
    
    cvDownload.addEventListener('click', () => {
        // Download CV based on current language
        const cvFile = currentLanguage === 'en' ? 'files/Bouaziz-Ghassen-EN.pdf' : 'files/Bouaziz-Ghassen-FR.pdf';
        
        // Track CV download event
        trackEvent('cv_download', 'Downloads', 'CV Download', `CV-${currentLanguage.toUpperCase()}`, 1);
        
        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = cvFile;
        link.download = `Bouaziz-Ghassen-CV-${currentLanguage.toUpperCase()}.pdf`;
        link.target = '_blank';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success notification
        showNotification('CV downloaded successfully!', 'success');
    });
}

// Google Tag Manager Event Tracking
function trackEvent(eventName, eventCategory, eventAction, eventLabel, eventValue) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: eventCategory,
            event_action: eventAction,
            event_label: eventLabel,
            value: eventValue
        });
    }
    
    // Also push to dataLayer for GTM
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': eventName,
            'event_category': eventCategory,
            'event_action': eventAction,
            'event_label': eventLabel,
            'value': eventValue
        });
    }
}

// Comprehensive Event Tracking
function initEventTracking() {
    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const sectionName = link.getAttribute('href').substring(1);
            trackEvent('navigation_click', 'Navigation', 'Section Navigation', sectionName, 1);
        });
    });

    // Track hero button clicks
    document.querySelectorAll('.hero-actions .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const buttonText = btn.querySelector('span').textContent;
            trackEvent('hero_button_click', 'CTA', 'Hero Button', buttonText, 1);
        });
    });

    // Track project link clicks
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', () => {
            const projectCard = link.closest('.project-card');
            const projectName = projectCard.querySelector('h3').textContent;
            const linkType = link.textContent.includes('App Store') ? 'App Store' : 'Source Code';
            trackEvent('project_link_click', 'Projects', 'Project Link', `${projectName} - ${linkType}`, 1);
        });
    });

    // Track social media clicks
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.querySelector('i').className.includes('linkedin') ? 'LinkedIn' : 
                           link.querySelector('i').className.includes('envelope') ? 'Email' : 'Phone';
            trackEvent('social_click', 'Social Media', 'Social Link', platform, 1);
        });
    });

    // Track scroll depth (optional - can be resource intensive)
    let maxScrollDepth = 0;
    window.addEventListener('scroll', debounce(() => {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScrollDepth && scrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
            maxScrollDepth = scrollDepth;
            trackEvent('scroll_depth', 'Engagement', 'Scroll Depth', `${scrollDepth}%`, scrollDepth);
        }
    }, 1000));

    // Track page load time
    window.addEventListener('load', () => {
        const loadTime = Math.round(performance.now());
        trackEvent('page_load', 'Performance', 'Page Load Time', 'Portfolio Load', loadTime);
    });
}

// Utility functions
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

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Console welcome message
console.log(`
%c🚀 Welcome to Ghassen Bouaziz's Portfolio!
%cBuilt with modern web technologies and ❤️
%cFeel free to explore the code and reach out if you have any questions!
`, 
'color: #2563eb; font-size: 16px; font-weight: bold;',
'color: #64748b; font-size: 14px;',
'color: #94a3b8; font-size: 12px;'
);