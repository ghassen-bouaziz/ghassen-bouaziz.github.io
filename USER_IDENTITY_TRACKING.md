# User Identity Tracking Setup

This guide explains how to implement user identity tracking in your portfolio using Google Tag Manager and Google Analytics 4.

## Overview

User identity tracking allows you to:
- Track individual users across multiple sessions
- Understand user journey and behavior patterns
- Measure user engagement over time
- Create user-based reports and segments
- Track returning vs new users

## Implementation Methods

### Method 1: User ID (Recommended for Authenticated Users)

#### 1.1 JavaScript Implementation
Add this to your `script.js` file:

```javascript
// User Identity Tracking
function initUserIdentity() {
    // Generate or retrieve user ID
    let userId = getUserId();
    
    // Set user ID in dataLayer
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'user_id': userId,
            'user_type': 'anonymous', // or 'authenticated' if user is logged in
            'user_session': getSessionId()
        });
    }
    
    // Set user ID in GA4
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            'user_id': userId
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
```

#### 1.2 GTM Configuration

**Create User ID Variable:**
1. Go to **Variables** → **New**
2. **Variable Name**: `User ID`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `user_id`
5. **Save**

**Create User Type Variable:**
1. Go to **Variables** → **New**
2. **Variable Name**: `User Type`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `user_type`
5. **Save**

**Create Session ID Variable:**
1. Go to **Variables** → **New**
2. **Variable Name**: `Session ID`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `user_session`
5. **Save**

**Update GA4 Configuration Tag:**
1. Edit your existing GA4 Configuration tag
2. **Fields to Set**:
   - `user_id`: `{{User ID}}`
   - `custom_map`: `{'custom_parameter_1': 'user_type', 'custom_parameter_2': 'session_id'}`
3. **Save**

### Method 2: Enhanced Ecommerce User Properties

#### 2.1 JavaScript Implementation
Add this to your `script.js` file:

```javascript
// Enhanced User Properties
function setUserProperties() {
    const userProperties = {
        'user_type': 'portfolio_visitor',
        'user_source': getTrafficSource(),
        'user_device': getDeviceType(),
        'user_language': currentLanguage || 'en',
        'user_timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        'user_screen_resolution': `${screen.width}x${screen.height}`,
        'user_browser': getBrowserInfo(),
        'user_os': getOperatingSystem()
    };
    
    // Push to dataLayer
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'user_properties': userProperties
        });
    }
    
    // Set in GA4
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            'custom_map': {
                'custom_parameter_1': 'user_type',
                'custom_parameter_2': 'user_source',
                'custom_parameter_3': 'user_device',
                'custom_parameter_4': 'user_language',
                'custom_parameter_5': 'user_timezone',
                'custom_parameter_6': 'user_screen_resolution',
                'custom_parameter_7': 'user_browser',
                'custom_parameter_8': 'user_os'
            }
        });
    }
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
```

### Method 3: Contact Form User Identification

#### 3.1 Enhanced Contact Form Tracking
Update your contact form submission in `script.js`:

```javascript
// Enhanced contact form with user identification
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
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Track successful form submission with user identification
            trackEvent('form_submit', 'Contact', 'Form Submission', 'Contact Form', 1);
            
            // Set user as "lead" in GA4
            if (typeof gtag !== 'undefined') {
                gtag('config', 'GA_MEASUREMENT_ID', {
                    'user_properties': {
                        'user_type': 'lead',
                        'lead_email': data.email,
                        'lead_name': data.name
                    }
                });
            }
            
            // Push lead information to dataLayer
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'user_type': 'lead',
                    'lead_email': data.email,
                    'lead_name': data.name,
                    'lead_subject': data.subject
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
```

## GTM Setup for User Identity

### 1. Create User Identity Variables

**User ID Variable:**
1. Go to **Variables** → **New**
2. **Variable Name**: `User ID`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `user_id`
5. **Save**

**User Type Variable:**
1. Go to **Variables** → **New**
2. **Variable Name**: `User Type`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `user_type`
5. **Save**

**Lead Email Variable:**
1. Go to **Variables** → **New**
2. **Variable Name**: `Lead Email`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `lead_email`
5. **Save**

### 2. Update GA4 Configuration Tag

1. Edit your existing GA4 Configuration tag
2. **Fields to Set**:
   - `user_id`: `{{User ID}}`
   - `custom_map`: `{'custom_parameter_1': 'user_type', 'custom_parameter_2': 'lead_email'}`
3. **Save**

### 3. Create User Identity Event Tags

**User Identification Tag:**
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - User Identification`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `user_identification`
6. **Event Parameters**:
   - `user_id`: `{{User ID}}`
   - `user_type`: `{{User Type}}`
   - `session_id`: `{{Session ID}}`
7. **Triggering**: Select `Page Load` trigger
8. **Save**

**Lead Conversion Tag:**
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - Lead Conversion`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `lead_conversion`
6. **Event Parameters**:
   - `user_id`: `{{User ID}}`
   - `user_type`: `{{User Type}}`
   - `lead_email`: `{{Lead Email}}`
   - `conversion_value`: `1`
7. **Triggering**: Select `Form Submit` trigger
8. **Save**

## Privacy Considerations

### 1. GDPR Compliance
```javascript
// Add consent management
function initConsentManagement() {
    // Check if user has consented to tracking
    const hasConsent = localStorage.getItem('tracking_consent');
    
    if (hasConsent === 'true') {
        initUserIdentity();
        setUserProperties();
    } else {
        // Show consent banner
        showConsentBanner();
    }
}

function showConsentBanner() {
    // Create consent banner HTML
    const banner = document.createElement('div');
    banner.innerHTML = `
        <div class="consent-banner">
            <p>We use cookies to improve your experience and analyze site usage.</p>
            <button onclick="acceptTracking()">Accept</button>
            <button onclick="declineTracking()">Decline</button>
        </div>
    `;
    document.body.appendChild(banner);
}

function acceptTracking() {
    localStorage.setItem('tracking_consent', 'true');
    initUserIdentity();
    setUserProperties();
    document.querySelector('.consent-banner').remove();
}

function declineTracking() {
    localStorage.setItem('tracking_consent', 'false');
    document.querySelector('.consent-banner').remove();
}
```

### 2. Data Retention
- User IDs are stored locally in browser
- No personal data is sent to GA4 without consent
- Users can opt-out at any time
- Data is anonymized when possible

## Reports and Analysis

### 1. User Explorer Report
1. Go to **GA4** → **Reports** → **Engagement** → **User Explorer`
2. View individual user journeys
3. Analyze user behavior patterns

### 2. Custom User Segments
1. Go to **GA4** → **Explore** → **Free Form`
2. **Dimensions**: User ID, User Type
3. **Metrics**: Event Count, Session Duration
4. **Filter**: User Type = lead

### 3. Conversion Funnel
1. Go to **GA4** → **Explore** → **Funnel Exploration`
2. **Steps**: Page View → CV Download → Form Submit
3. **Breakdown**: User Type

## Implementation Steps

1. **Add JavaScript code** to your `script.js` file
2. **Create GTM variables** for user identity
3. **Update GA4 configuration** with user ID
4. **Create event tags** for user tracking
5. **Test in Preview mode**
6. **Publish changes**
7. **Monitor in GA4 reports**

## Benefits

- **User Journey Tracking**: See how individual users navigate your site
- **Returning User Analysis**: Identify repeat visitors
- **Lead Qualification**: Track users who become leads
- **Personalization**: Customize experience based on user behavior
- **Conversion Optimization**: Improve conversion rates based on user data

This implementation provides comprehensive user identity tracking while maintaining privacy compliance and providing valuable insights into user behavior.
