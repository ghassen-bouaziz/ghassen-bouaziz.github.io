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
    initUserBehaviorTracking();
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
    
    // Get comprehensive user information
    const userInfo = await getComprehensiveUserInfo();
    
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
        'user_country': userInfo.country,
        'user_city': userInfo.city,
        'user_region': userInfo.region,
        'user_ip': userInfo.ip,
        'user_isp': userInfo.isp,
        'user_connection_type': getConnectionType(),
        'user_color_depth': screen.colorDepth,
        'user_pixel_ratio': window.devicePixelRatio,
        'user_viewport_size': `${window.innerWidth}x${window.innerHeight}`,
        'user_available_screen': `${screen.availWidth}x${screen.availHeight}`,
        'user_orientation': getScreenOrientation(),
        'user_touch_support': 'ontouchstart' in window,
        'user_geolocation_support': 'geolocation' in navigator,
        'user_notification_support': 'Notification' in window,
        'user_service_worker_support': 'serviceWorker' in navigator,
        'user_webgl_support': !!document.createElement('canvas').getContext('webgl'),
        'user_webp_support': getWebPSupport(),
        'user_do_not_track': navigator.doNotTrack,
        'user_cookie_enabled': navigator.cookieEnabled,
        'user_java_enabled': navigator.javaEnabled ? navigator.javaEnabled() : false,
        'user_platform': navigator.platform,
        'user_hardware_concurrency': navigator.hardwareConcurrency,
        'user_max_touch_points': navigator.maxTouchPoints,
        'user_memory': navigator.deviceMemory,
        'user_connection_effective_type': getConnectionEffectiveType(),
        'user_connection_downlink': getConnectionDownlink(),
        'user_connection_rtt': getConnectionRTT(),
        'user_session_start': new Date().toISOString(),
        'user_session_duration': 0,
        'user_page_views': 1,
        'user_events_count': 0,
        'user_last_activity': new Date().toISOString(),
        'user_engagement_score': 0,
        'user_bounce_risk': 'low',
        'user_interest_categories': [],
        'user_behavior_pattern': 'new_visitor'
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
                'custom_parameter_9': 'user_country',
                'custom_parameter_10': 'user_city',
                'custom_parameter_11': 'user_connection_type',
                'custom_parameter_12': 'user_engagement_score'
            }
        });
    }
    
    // Track user identification event
    trackEvent('user_identification', 'User', 'User Identified', `User: ${userId}`, 1);
    
    // Set comprehensive user properties in Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.identify(userId);
        mixpanel.people.set({
            // Basic Identity
            '$first_name': 'Portfolio',
            '$last_name': 'Visitor',
            '$email': null,
            '$phone': null,
            '$created': new Date().toISOString(),
            '$last_seen': new Date().toISOString(),
            
            // User Classification
            'User Type': 'portfolio_visitor',
            'User Status': 'active',
            'User Segment': 'anonymous_visitor',
            'User Cohort': 'new_visitor',
            
            // Traffic & Source
            'Traffic Source': userProperties.user_source,
            'Referrer': document.referrer || 'direct',
            'UTM Source': getUrlParameter('utm_source'),
            'UTM Medium': getUrlParameter('utm_medium'),
            'UTM Campaign': getUrlParameter('utm_campaign'),
            'UTM Term': getUrlParameter('utm_term'),
            'UTM Content': getUrlParameter('utm_content'),
            
            // Device & Browser
            'Device Type': userProperties.user_device,
            'Device Category': getDeviceCategory(),
            'Browser': userProperties.user_browser,
            'Browser Version': getBrowserVersion(),
            'Operating System': userProperties.user_os,
            'OS Version': getOSVersion(),
            'Platform': userProperties.user_platform,
            
            // Screen & Display
            'Screen Resolution': userProperties.user_screen_resolution,
            'Viewport Size': userProperties.user_viewport_size,
            'Available Screen': userProperties.user_available_screen,
            'Color Depth': userProperties.user_color_depth,
            'Pixel Ratio': userProperties.user_pixel_ratio,
            'Screen Orientation': userProperties.user_orientation,
            
            // Location & Network
            'Country': userProperties.user_country,
            'City': userProperties.user_city,
            'Region': userProperties.user_region,
            'IP Address': userProperties.user_ip,
            'ISP': userProperties.user_isp,
            'Timezone': userProperties.user_timezone,
            'Language': userProperties.user_language,
            'Locale': navigator.language,
            'Languages': navigator.languages ? navigator.languages.join(',') : navigator.language,
            
            // Connection & Performance
            'Connection Type': userProperties.user_connection_type,
            'Connection Effective Type': userProperties.user_connection_effective_type,
            'Connection Downlink': userProperties.user_connection_downlink,
            'Connection RTT': userProperties.user_connection_rtt,
            'Hardware Concurrency': userProperties.user_hardware_concurrency,
            'Device Memory': userProperties.user_memory,
            'Max Touch Points': userProperties.user_max_touch_points,
            
            // Capabilities & Features
            'Touch Support': userProperties.user_touch_support,
            'Geolocation Support': userProperties.user_geolocation_support,
            'Notification Support': userProperties.user_notification_support,
            'Service Worker Support': userProperties.user_service_worker_support,
            'WebGL Support': userProperties.user_webgl_support,
            'WebP Support': userProperties.user_webp_support,
            'Java Enabled': userProperties.user_java_enabled,
            'Cookie Enabled': userProperties.user_cookie_enabled,
            'Do Not Track': userProperties.user_do_not_track,
            
            // Session & Engagement
            'First Visit': new Date().toISOString(),
            'Last Visit': new Date().toISOString(),
            'Session Start': userProperties.user_session_start,
            'Session Duration': userProperties.user_session_duration,
            'Page Views': userProperties.user_page_views,
            'Events Count': userProperties.user_events_count,
            'Last Activity': userProperties.user_last_activity,
            'Engagement Score': userProperties.user_engagement_score,
            'Bounce Risk': userProperties.user_bounce_risk,
            'Behavior Pattern': userProperties.user_behavior_pattern,
            
            // Interest & Behavior
            'Interest Categories': userProperties.user_interest_categories,
            'Preferred Language': userProperties.user_language,
            'Time of Day': new Date().getHours(),
            'Day of Week': new Date().getDay(),
            'Visit Frequency': 'first_time',
            'Returning User': false,
            'Mobile User': userProperties.user_device === 'mobile',
            'Desktop User': userProperties.user_device === 'desktop',
            'Tablet User': userProperties.user_device === 'tablet'
        });
        
        // Track comprehensive user profile creation
        mixpanel.track('User Profile Created', {
            'user_id': userId,
            'session_id': sessionId,
            'profile_completeness': '100%',
            'data_points_collected': Object.keys(userProperties).length,
            'timestamp': new Date().toISOString()
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

// Comprehensive user information gathering
async function getComprehensiveUserInfo() {
    try {
        // Try to get comprehensive info from IP geolocation API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return {
            country: data.country_name || data.country_code || 'Unknown',
            city: data.city || 'Unknown',
            region: data.region || data.region_code || 'Unknown',
            ip: data.ip || 'Unknown',
            isp: data.org || 'Unknown',
            timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
            latitude: data.latitude || null,
            longitude: data.longitude || null,
            postal: data.postal || null,
            country_code: data.country_code || null,
            region_code: data.region_code || null
        };
    } catch (error) {
        // Fallback to timezone-based detection
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const countryMap = {
            'America/New_York': { country: 'United States', region: 'New York' },
            'America/Chicago': { country: 'United States', region: 'Illinois' },
            'America/Denver': { country: 'United States', region: 'Colorado' },
            'America/Los_Angeles': { country: 'United States', region: 'California' },
            'Europe/London': { country: 'United Kingdom', region: 'England' },
            'Europe/Paris': { country: 'France', region: 'Île-de-France' },
            'Europe/Berlin': { country: 'Germany', region: 'Berlin' },
            'Europe/Rome': { country: 'Italy', region: 'Lazio' },
            'Europe/Madrid': { country: 'Spain', region: 'Madrid' },
            'Europe/Amsterdam': { country: 'Netherlands', region: 'North Holland' },
            'Europe/Brussels': { country: 'Belgium', region: 'Brussels' },
            'Europe/Zurich': { country: 'Switzerland', region: 'Zurich' },
            'Europe/Vienna': { country: 'Austria', region: 'Vienna' },
            'Europe/Stockholm': { country: 'Sweden', region: 'Stockholm' },
            'Europe/Oslo': { country: 'Norway', region: 'Oslo' },
            'Europe/Copenhagen': { country: 'Denmark', region: 'Copenhagen' },
            'Europe/Helsinki': { country: 'Finland', region: 'Uusimaa' },
            'Europe/Warsaw': { country: 'Poland', region: 'Masovian' },
            'Europe/Prague': { country: 'Czech Republic', region: 'Prague' },
            'Europe/Budapest': { country: 'Hungary', region: 'Budapest' },
            'Europe/Bucharest': { country: 'Romania', region: 'Bucharest' },
            'Europe/Sofia': { country: 'Bulgaria', region: 'Sofia' },
            'Europe/Athens': { country: 'Greece', region: 'Attica' },
            'Europe/Lisbon': { country: 'Portugal', region: 'Lisbon' },
            'Europe/Dublin': { country: 'Ireland', region: 'Dublin' },
            'Asia/Tokyo': { country: 'Japan', region: 'Tokyo' },
            'Asia/Shanghai': { country: 'China', region: 'Shanghai' },
            'Asia/Seoul': { country: 'South Korea', region: 'Seoul' },
            'Asia/Singapore': { country: 'Singapore', region: 'Singapore' },
            'Asia/Hong_Kong': { country: 'Hong Kong', region: 'Hong Kong' },
            'Asia/Taipei': { country: 'Taiwan', region: 'Taipei' },
            'Asia/Bangkok': { country: 'Thailand', region: 'Bangkok' },
            'Asia/Jakarta': { country: 'Indonesia', region: 'Jakarta' },
            'Asia/Kuala_Lumpur': { country: 'Malaysia', region: 'Kuala Lumpur' },
            'Asia/Manila': { country: 'Philippines', region: 'Manila' },
            'Asia/Ho_Chi_Minh': { country: 'Vietnam', region: 'Ho Chi Minh City' },
            'Asia/Kolkata': { country: 'India', region: 'West Bengal' },
            'Asia/Dubai': { country: 'United Arab Emirates', region: 'Dubai' },
            'Asia/Riyadh': { country: 'Saudi Arabia', region: 'Riyadh' },
            'Asia/Tehran': { country: 'Iran', region: 'Tehran' },
            'Asia/Jerusalem': { country: 'Israel', region: 'Jerusalem' },
            'Asia/Istanbul': { country: 'Turkey', region: 'Istanbul' },
            'Africa/Cairo': { country: 'Egypt', region: 'Cairo' },
            'Africa/Johannesburg': { country: 'South Africa', region: 'Gauteng' },
            'Africa/Lagos': { country: 'Nigeria', region: 'Lagos' },
            'Africa/Casablanca': { country: 'Morocco', region: 'Casablanca' },
            'Africa/Tunis': { country: 'Tunisia', region: 'Tunis' },
            'Africa/Algiers': { country: 'Algeria', region: 'Algiers' },
            'Australia/Sydney': { country: 'Australia', region: 'New South Wales' },
            'Australia/Melbourne': { country: 'Australia', region: 'Victoria' },
            'Australia/Perth': { country: 'Australia', region: 'Western Australia' },
            'Pacific/Auckland': { country: 'New Zealand', region: 'Auckland' },
            'America/Toronto': { country: 'Canada', region: 'Ontario' },
            'America/Vancouver': { country: 'Canada', region: 'British Columbia' },
            'America/Montreal': { country: 'Canada', region: 'Quebec' },
            'America/Sao_Paulo': { country: 'Brazil', region: 'São Paulo' },
            'America/Argentina/Buenos_Aires': { country: 'Argentina', region: 'Buenos Aires' },
            'America/Mexico_City': { country: 'Mexico', region: 'Mexico City' },
            'America/Bogota': { country: 'Colombia', region: 'Bogotá' },
            'America/Lima': { country: 'Peru', region: 'Lima' },
            'America/Santiago': { country: 'Chile', region: 'Santiago' },
            'America/Caracas': { country: 'Venezuela', region: 'Caracas' }
        };
        
        const location = countryMap[timezone] || { country: 'Unknown', region: 'Unknown' };
        return {
            country: location.country,
            city: 'Unknown',
            region: location.region,
            ip: 'Unknown',
            isp: 'Unknown',
            timezone: timezone,
            latitude: null,
            longitude: null,
            postal: null,
            country_code: null,
            region_code: null
        };
    }
}

// Enhanced helper functions for comprehensive user tracking
function getConnectionType() {
    if (navigator.connection) {
        return navigator.connection.type || 'unknown';
    }
    return 'unknown';
}

function getConnectionEffectiveType() {
    if (navigator.connection) {
        return navigator.connection.effectiveType || 'unknown';
    }
    return 'unknown';
}

function getConnectionDownlink() {
    if (navigator.connection) {
        return navigator.connection.downlink || 0;
    }
    return 0;
}

function getConnectionRTT() {
    if (navigator.connection) {
        return navigator.connection.rtt || 0;
    }
    return 0;
}

function getScreenOrientation() {
    if (screen.orientation) {
        return screen.orientation.type || 'unknown';
    }
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
}

function getWebPSupport() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name) || null;
}

function getDeviceCategory() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

function getBrowserVersion() {
    const userAgent = navigator.userAgent;
    const browsers = [
        { name: 'Chrome', regex: /Chrome\/(\d+)/ },
        { name: 'Firefox', regex: /Firefox\/(\d+)/ },
        { name: 'Safari', regex: /Version\/(\d+).*Safari/ },
        { name: 'Edge', regex: /Edg\/(\d+)/ },
        { name: 'Opera', regex: /OPR\/(\d+)/ }
    ];
    
    for (const browser of browsers) {
        const match = userAgent.match(browser.regex);
        if (match) {
            return `${browser.name} ${match[1]}`;
        }
    }
    return 'Unknown';
}

function getOSVersion() {
    const userAgent = navigator.userAgent;
    const osPatterns = [
        { name: 'Windows', regex: /Windows NT (\d+\.\d+)/ },
        { name: 'macOS', regex: /Mac OS X (\d+[._]\d+)/ },
        { name: 'Linux', regex: /Linux/ },
        { name: 'Android', regex: /Android (\d+\.\d+)/ },
        { name: 'iOS', regex: /OS (\d+[._]\d+)/ }
    ];
    
    for (const os of osPatterns) {
        const match = userAgent.match(os.regex);
        if (match) {
            return `${os.name} ${match[1].replace('_', '.')}`;
        }
    }
    return 'Unknown';
}

// Legacy function for backward compatibility
async function getCountry() {
    const userInfo = await getComprehensiveUserInfo();
    return userInfo.country;
}

// User Behavior and Engagement Tracking
function initUserBehaviorTracking() {
    let engagementScore = 0;
    let pageViews = 1;
    let eventsCount = 0;
    let sessionStartTime = Date.now();
    let lastActivityTime = Date.now();
    let scrollDepth = 0;
    let maxScrollDepth = 0;
    let timeOnPage = 0;
    let mouseMovements = 0;
    let clicks = 0;
    let keystrokes = 0;
    let formInteractions = 0;
    
    // Track scroll depth
    let scrollTimeout;
    window.addEventListener('scroll', debounce(() => {
        scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            updateUserEngagement('scroll_depth', scrollDepth);
        }
    }, 100));
    
    // Track mouse movements
    let mouseTimeout;
    document.addEventListener('mousemove', debounce(() => {
        mouseMovements++;
        lastActivityTime = Date.now();
        updateUserEngagement('mouse_movement', mouseMovements);
    }, 1000));
    
    // Track clicks
    document.addEventListener('click', (e) => {
        clicks++;
        lastActivityTime = Date.now();
        updateUserEngagement('click', clicks);
        
        // Track specific click types
        if (e.target.tagName === 'A') {
            updateUserEngagement('link_click', 1);
        } else if (e.target.tagName === 'BUTTON') {
            updateUserEngagement('button_click', 1);
        }
    });
    
    // Track keystrokes
    document.addEventListener('keydown', (e) => {
        keystrokes++;
        lastActivityTime = Date.now();
        updateUserEngagement('keystroke', keystrokes);
    });
    
    // Track form interactions
    document.addEventListener('focus', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            formInteractions++;
            updateUserEngagement('form_interaction', formInteractions);
        }
    });
    
    // Track time on page
    setInterval(() => {
        timeOnPage = Math.round((Date.now() - sessionStartTime) / 1000);
        updateUserEngagement('time_on_page', timeOnPage);
    }, 5000);
    
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            updateUserEngagement('page_hidden', 1);
        } else {
            updateUserEngagement('page_visible', 1);
            lastActivityTime = Date.now();
        }
    });
    
    // Track window focus/blur
    window.addEventListener('focus', () => {
        updateUserEngagement('window_focus', 1);
        lastActivityTime = Date.now();
    });
    
    window.addEventListener('blur', () => {
        updateUserEngagement('window_blur', 1);
    });
    
    // Track resize events
    let resizeTimeout;
    window.addEventListener('resize', debounce(() => {
        updateUserEngagement('window_resize', 1);
    }, 500));
    
    // Update engagement score periodically
    setInterval(calculateEngagementScore, 10000);
    
    function updateUserEngagement(metric, value) {
        if (typeof mixpanel !== 'undefined') {
            mixpanel.people.increment(metric, value);
            mixpanel.track('User Engagement', {
                'metric': metric,
                'value': value,
                'timestamp': new Date().toISOString()
            });
        }
    }
    
    function calculateEngagementScore() {
        // Calculate engagement score based on various factors
        let score = 0;
        
        // Time on page (max 30 points)
        score += Math.min(timeOnPage / 60, 30);
        
        // Scroll depth (max 25 points)
        score += (maxScrollDepth / 100) * 25;
        
        // Mouse movements (max 15 points)
        score += Math.min(mouseMovements / 10, 15);
        
        // Clicks (max 15 points)
        score += Math.min(clicks * 3, 15);
        
        // Form interactions (max 10 points)
        score += Math.min(formInteractions * 5, 10);
        
        // Keystrokes (max 5 points)
        score += Math.min(keystrokes / 20, 5);
        
        engagementScore = Math.round(score);
        
        // Update user properties
        if (typeof mixpanel !== 'undefined') {
            mixpanel.people.set({
                'Engagement Score': engagementScore,
                'Max Scroll Depth': maxScrollDepth,
                'Time on Page': timeOnPage,
                'Mouse Movements': mouseMovements,
                'Clicks': clicks,
                'Form Interactions': formInteractions,
                'Keystrokes': keystrokes,
                'Last Activity': new Date(lastActivityTime).toISOString(),
                'Bounce Risk': engagementScore < 10 ? 'high' : engagementScore < 30 ? 'medium' : 'low'
            });
            
            mixpanel.track('Engagement Score Updated', {
                'engagement_score': engagementScore,
                'max_scroll_depth': maxScrollDepth,
                'time_on_page': timeOnPage,
                'bounce_risk': engagementScore < 10 ? 'high' : engagementScore < 30 ? 'medium' : 'low',
                'timestamp': new Date().toISOString()
            });
        }
    }
    
    // Track page unload
    window.addEventListener('beforeunload', () => {
        const sessionDuration = Math.round((Date.now() - sessionStartTime) / 1000);
        
        if (typeof mixpanel !== 'undefined') {
            mixpanel.people.set({
                'Session Duration': sessionDuration,
                'Last Visit': new Date().toISOString(),
                'Page Views': pageViews,
                'Events Count': eventsCount
            });
            
            mixpanel.track('Session End', {
                'session_duration': sessionDuration,
                'engagement_score': engagementScore,
                'max_scroll_depth': maxScrollDepth,
                'page_views': pageViews,
                'events_count': eventsCount,
                'timestamp': new Date().toISOString()
            });
        }
    });
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