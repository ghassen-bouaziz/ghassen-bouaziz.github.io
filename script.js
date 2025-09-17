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
    initUserIdentity();
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
            
            // Track lead conversion
            const userId = getUserId();
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'user_type': 'lead',
                    'lead_email': data.email,
                    'lead_name': data.name,
                    'lead_subject': data.subject
                });
            }
            
            // Track lead conversion event
            trackEvent('lead_conversion', 'Conversion', 'Lead Generated', `Lead: ${data.email}`, 1);
            
            // Update user as lead in Mixpanel
            if (typeof mixpanel !== 'undefined') {
                mixpanel.people.set({
                    'User Type': 'lead',
                    'Lead Email': data.email,
                    'Lead Name': data.name,
                    'Lead Subject': data.subject,
                    'Lead Generated': new Date().toISOString()
                });
                
                // Track lead conversion with detailed properties
                mixpanel.track('Lead Conversion', {
                    'lead_email': data.email,
                    'lead_name': data.name,
                    'lead_subject': data.subject,
                    'conversion_value': 1,
                    'timestamp': new Date().toISOString()
                });
            }
            
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
    
    // Track in Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track(eventName, {
            category: eventCategory,
            action: eventAction,
            label: eventLabel,
            value: eventValue,
            timestamp: new Date().toISOString()
        });
    }
}

// User Identity Tracking
async function initUserIdentity() {
    // Generate or retrieve user ID
    let userId = getUserId();
    let sessionId = getSessionId();
    
    // Get country information
    const country = await getCountry();
    
    // Set user properties
    const userProperties = {
        'user_type': 'portfolio_visitor',
        'user_source': getTrafficSource(),
        'user_device': getDeviceType(),
        'user_language': currentLanguage || 'en',
        'user_timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        'user_screen_resolution': `${screen.width}x${screen.height}`,
        'user_browser': getBrowserInfo(),
        'user_os': getOperatingSystem(),
        'user_country': country
    };
    
    // Set user ID in dataLayer
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'user_id': userId,
            'user_type': 'anonymous',
            'user_session': sessionId,
            'user_properties': userProperties
        });
    }
    
    // Set user ID in GA4
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            'user_id': userId,
            'custom_map': {
                'custom_parameter_1': 'user_type',
                'custom_parameter_2': 'user_source',
                'custom_parameter_3': 'user_device',
                'custom_parameter_4': 'user_language',
                'custom_parameter_5': 'user_timezone',
                'custom_parameter_6': 'user_screen_resolution',
                'custom_parameter_7': 'user_browser',
                'custom_parameter_8': 'user_os',
                'custom_parameter_9': 'user_country'
            }
        });
    }
    
    // Track user identification event
    trackEvent('user_identification', 'User', 'User Identified', `User: ${userId}`, 1);
    
    // Set user properties in Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.identify(userId);
        mixpanel.people.set({
            '$first_name': 'Portfolio',
            '$last_name': 'Visitor',
            'User Type': 'portfolio_visitor',
            'Traffic Source': userProperties.user_source,
            'Device Type': userProperties.user_device,
            'Language': userProperties.user_language,
            'Timezone': userProperties.user_timezone,
            'Screen Resolution': userProperties.user_screen_resolution,
            'Browser': userProperties.user_browser,
            'Operating System': userProperties.user_os,
            'Country': userProperties.user_country,
            'First Visit': new Date().toISOString()
        });
    }
}

function getUserId() {
    // Check if user ID exists in localStorage
    let userId = localStorage.getItem('portfolio_user_id');
    
    if (!userId) {
        // Generate new user ID
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('portfolio_user_id', userId);
    }
    
    return userId;
}

function getSessionId() {
    // Check if session ID exists in sessionStorage
    let sessionId = sessionStorage.getItem('portfolio_session_id');
    
    if (!sessionId) {
        // Generate new session ID
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('portfolio_session_id', sessionId);
    }
    
    return sessionId;
}

function getTrafficSource() {
    const referrer = document.referrer;
    if (!referrer) return 'direct';
    if (referrer.includes('google')) return 'google';
    if (referrer.includes('linkedin')) return 'linkedin';
    if (referrer.includes('github')) return 'github';
    return 'other';
}

function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
}

function getOperatingSystem() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Other';
}

async function getCountry() {
    try {
        // Try to get country from IP geolocation API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country_name || data.country_code || 'Unknown';
    } catch (error) {
        // Fallback to timezone-based country detection
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const countryMap = {
            'America/New_York': 'United States',
            'America/Chicago': 'United States',
            'America/Denver': 'United States',
            'America/Los_Angeles': 'United States',
            'Europe/London': 'United Kingdom',
            'Europe/Paris': 'France',
            'Europe/Berlin': 'Germany',
            'Europe/Rome': 'Italy',
            'Europe/Madrid': 'Spain',
            'Europe/Amsterdam': 'Netherlands',
            'Europe/Brussels': 'Belgium',
            'Europe/Zurich': 'Switzerland',
            'Europe/Vienna': 'Austria',
            'Europe/Stockholm': 'Sweden',
            'Europe/Oslo': 'Norway',
            'Europe/Copenhagen': 'Denmark',
            'Europe/Helsinki': 'Finland',
            'Europe/Warsaw': 'Poland',
            'Europe/Prague': 'Czech Republic',
            'Europe/Budapest': 'Hungary',
            'Europe/Bucharest': 'Romania',
            'Europe/Sofia': 'Bulgaria',
            'Europe/Athens': 'Greece',
            'Europe/Lisbon': 'Portugal',
            'Europe/Dublin': 'Ireland',
            'Asia/Tokyo': 'Japan',
            'Asia/Shanghai': 'China',
            'Asia/Seoul': 'South Korea',
            'Asia/Singapore': 'Singapore',
            'Asia/Hong_Kong': 'Hong Kong',
            'Asia/Taipei': 'Taiwan',
            'Asia/Bangkok': 'Thailand',
            'Asia/Jakarta': 'Indonesia',
            'Asia/Kuala_Lumpur': 'Malaysia',
            'Asia/Manila': 'Philippines',
            'Asia/Ho_Chi_Minh': 'Vietnam',
            'Asia/Kolkata': 'India',
            'Asia/Dubai': 'United Arab Emirates',
            'Asia/Riyadh': 'Saudi Arabia',
            'Asia/Tehran': 'Iran',
            'Asia/Jerusalem': 'Israel',
            'Asia/Istanbul': 'Turkey',
            'Africa/Cairo': 'Egypt',
            'Africa/Johannesburg': 'South Africa',
            'Africa/Lagos': 'Nigeria',
            'Africa/Casablanca': 'Morocco',
            'Africa/Tunis': 'Tunisia',
            'Africa/Algiers': 'Algeria',
            'Australia/Sydney': 'Australia',
            'Australia/Melbourne': 'Australia',
            'Australia/Perth': 'Australia',
            'Pacific/Auckland': 'New Zealand',
            'America/Toronto': 'Canada',
            'America/Vancouver': 'Canada',
            'America/Montreal': 'Canada',
            'America/Sao_Paulo': 'Brazil',
            'America/Argentina/Buenos_Aires': 'Argentina',
            'America/Mexico_City': 'Mexico',
            'America/Bogota': 'Colombia',
            'America/Lima': 'Peru',
            'America/Santiago': 'Chile',
            'America/Caracas': 'Venezuela'
        };
        
        return countryMap[timezone] || 'Unknown';
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
        
        // Track page view in Mixpanel
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track('Page View', {
                'page_title': document.title,
                'page_url': window.location.href,
                'load_time': loadTime,
                'timestamp': new Date().toISOString()
            });
        }
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