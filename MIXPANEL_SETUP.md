# Mixpanel Analytics Setup Guide

This guide explains how to set up and configure Mixpanel analytics for your portfolio website.

## Overview

Mixpanel provides advanced event tracking and user behavior analysis with features like:
- **Event Tracking**: Track user interactions and behaviors
- **User Profiles**: Build detailed user profiles with properties
- **Funnel Analysis**: Analyze user conversion funnels
- **Cohort Analysis**: Track user retention and engagement
- **A/B Testing**: Test different versions of your site
- **Real-time Analytics**: Monitor user activity in real-time

## Setup Steps

### 1. Create Mixpanel Account

1. Go to [mixpanel.com](https://mixpanel.com)
2. Sign up for a free account
3. Create a new project for your portfolio
4. Get your **Project Token** from the project settings

### 2. Update Project Token

Replace `YOUR_MIXPANEL_PROJECT_TOKEN` in your `index.html` file:

```html
<!-- In index.html, line 62 -->
mixpanel.init('YOUR_ACTUAL_PROJECT_TOKEN');
```

### 3. Verify Installation

Open your browser's developer console and run:
```javascript
console.log('Mixpanel loaded:', typeof mixpanel !== 'undefined');
```

## Events Being Tracked

### 1. User Identification
- **Event**: `user_identification`
- **Properties**: User ID, country, device, browser, etc.
- **Trigger**: Page load

> **📊 Enhanced Tracking**: Your portfolio now tracks **100+ user properties** including comprehensive device info, location data, engagement metrics, and real-time behavior analytics. See `COMPREHENSIVE_MIXPANEL_USER_TRACKING.md` for complete details.

### 2. Page Views
- **Event**: `Page View`
- **Properties**: Page title, URL, load time
- **Trigger**: Page load complete

### 3. CV Downloads
- **Event**: `cv_download`
- **Properties**: Language (EN/FR), user ID
- **Trigger**: CV download button click

### 4. Contact Form Submissions
- **Event**: `form_submit`
- **Properties**: Form data, user ID
- **Trigger**: Form submission

### 5. Lead Conversions
- **Event**: `Lead Conversion`
- **Properties**: Email, name, subject, conversion value
- **Trigger**: Successful form submission

### 6. Language Switches
- **Event**: `language_switch`
- **Properties**: New language, user ID
- **Trigger**: Language toggle click

### 7. Navigation Clicks
- **Event**: `navigation_click`
- **Properties**: Section name, user ID
- **Trigger**: Navigation link click

### 8. Hero Button Clicks
- **Event**: `hero_button_click`
- **Properties**: Button text, user ID
- **Trigger**: Hero section button click

### 9. Project Link Clicks
- **Event**: `project_link_click`
- **Properties**: Project name, link type, user ID
- **Trigger**: Project link click

### 10. Social Media Clicks
- **Event**: `social_click`
- **Properties**: Platform, user ID
- **Trigger**: Social media link click

### 11. Scroll Depth
- **Event**: `scroll_depth`
- **Properties**: Scroll percentage, user ID
- **Trigger**: 25%, 50%, 75%, 100% scroll

## User Properties

### Default Properties
- **User Type**: `portfolio_visitor` or `lead`
- **Traffic Source**: `google`, `linkedin`, `github`, `direct`, `other`
- **Device Type**: `mobile`, `tablet`, `desktop`
- **Language**: `en` or `fr`
- **Timezone**: User's timezone
- **Screen Resolution**: Device screen size
- **Browser**: `Chrome`, `Firefox`, `Safari`, `Edge`, `Other`
- **Operating System**: `Windows`, `macOS`, `Linux`, `Android`, `iOS`
- **Country**: User's country

### Lead Properties (when user becomes a lead)
- **Lead Email**: User's email address
- **Lead Name**: User's name
- **Lead Subject**: Contact form subject
- **Lead Generated**: Timestamp of lead conversion

## Mixpanel Dashboard Setup

### 1. Create Event Reports

**CV Download Report:**
1. Go to **Insights** → **Events**
2. Select `cv_download` event
3. Group by `label` to see EN vs FR downloads
4. Add filters for date range

**Lead Conversion Report:**
1. Go to **Insights** → **Events**
2. Select `Lead Conversion` event
3. Group by `lead_subject` to see inquiry types
4. Add date filters

**User Engagement Report:**
1. Go to **Insights** → **Events**
2. Select multiple events: `Page View`, `navigation_click`, `scroll_depth`
3. Group by `User Type` to compare visitors vs leads

### 2. Create Funnel Analysis

**Portfolio Conversion Funnel:**
1. Go to **Insights** → **Funnels**
2. **Steps**:
   - `Page View` (Step 1)
   - `navigation_click` (Step 2)
   - `cv_download` (Step 3)
   - `Lead Conversion` (Step 4)
3. **Conversion Window**: 30 days
4. **Group By**: Country, Device Type, Traffic Source

### 3. Create Cohort Analysis

**User Retention:**
1. Go to **Insights** → **Cohorts`
2. **Cohort Event**: `user_identification`
3. **Return Event**: `Page View`
4. **Period**: Weekly
5. **Group By**: Country, Language

### 4. Create User Profiles

**Lead Analysis:**
1. Go to **People** → **Explore`
2. **Filter**: `User Type` = `lead`
3. **Properties**: Lead Email, Lead Name, Country, Device Type
4. **Export**: CSV for further analysis

## Advanced Features

### 1. Custom Events

Add custom events for specific interactions:

```javascript
// Track specific project interest
mixpanel.track('Project Interest', {
    'project_name': 'Ibitibi',
    'interest_type': 'app_store_click',
    'user_country': 'United States'
});
```

### 2. A/B Testing

Test different versions of your portfolio:

```javascript
// A/B test hero section
const heroVersion = Math.random() > 0.5 ? 'A' : 'B';
mixpanel.track('Hero Version Shown', {
    'version': heroVersion,
    'user_id': getUserId()
});
```

### 3. Revenue Tracking

Track portfolio value (if applicable):

```javascript
// Track portfolio value
mixpanel.track('Portfolio Value', {
    'value': 50000,
    'currency': 'USD',
    'user_id': getUserId()
});
```

### 4. Group Analytics

Track user groups (if you have multiple portfolios):

```javascript
// Set user group
mixpanel.set_group('Portfolio Type', 'Mobile Developer');
```

## Reports and Insights

### 1. Key Metrics to Monitor

**Traffic Metrics:**
- Page views per day/week/month
- Unique visitors
- Bounce rate
- Average session duration

**Engagement Metrics:**
- CV download rate
- Contact form completion rate
- Language switch rate
- Scroll depth distribution

**Conversion Metrics:**
- Lead conversion rate
- Lead quality (by subject)
- Geographic conversion rates
- Device conversion rates

### 2. Custom Dashboards

Create custom dashboards for:
- **Daily Overview**: Key metrics for the day
- **Lead Generation**: Conversion funnel and lead quality
- **Geographic Analysis**: Traffic and conversions by country
- **Device Analysis**: Performance across devices
- **Content Performance**: Most engaging sections

### 3. Alerts and Notifications

Set up alerts for:
- **High Lead Volume**: When leads exceed normal levels
- **Low Conversion Rate**: When conversion drops below threshold
- **Geographic Anomalies**: Unusual traffic from new countries
- **Technical Issues**: When page load times increase

## Privacy and Compliance

### 1. GDPR Compliance

- **User Consent**: Respect user privacy preferences
- **Data Minimization**: Only collect necessary data
- **Right to Deletion**: Provide user data deletion
- **Data Portability**: Allow data export

### 2. Data Retention

- **Event Data**: 2 years (default)
- **User Profiles**: 2 years (default)
- **Custom Properties**: 2 years (default)

### 3. Opt-out Functionality

```javascript
// Allow users to opt-out
function optOutTracking() {
    mixpanel.opt_out_tracking();
    localStorage.setItem('tracking_consent', 'false');
}
```

## Troubleshooting

### Common Issues:

1. **Events not appearing**: Check project token and network connectivity
2. **User properties not updating**: Verify user identification
3. **Duplicate events**: Check for multiple Mixpanel initializations
4. **Missing data**: Verify event tracking implementation

### Debug Steps:

1. **Check Console**: Look for Mixpanel errors
2. **Verify Token**: Ensure correct project token
3. **Test Events**: Use Mixpanel's live view
4. **Check Network**: Verify API calls are being made

### Testing:

1. **Live View**: Use Mixpanel's live view to see events in real-time
2. **Event Explorer**: Check event properties and values
3. **User Explorer**: Verify user profiles and properties
4. **Funnel Testing**: Test conversion funnels with sample data

## Best Practices

### 1. Event Naming
- Use consistent naming conventions
- Use descriptive event names
- Include action and object (e.g., `cv_download`)

### 2. Property Naming
- Use snake_case for property names
- Be consistent with property types
- Include relevant context

### 3. User Identification
- Identify users early in their journey
- Update user properties as they engage
- Track user state changes

### 4. Data Quality
- Validate event data before sending
- Use consistent data types
- Handle errors gracefully

## Summary

Mixpanel provides powerful analytics for your portfolio:
- ✅ **Event Tracking**: All user interactions tracked
- ✅ **User Profiles**: Detailed user properties
- ✅ **Funnel Analysis**: Conversion path optimization
- ✅ **Real-time Analytics**: Live user activity monitoring
- ✅ **Custom Reports**: Tailored insights for your needs
- ✅ **Privacy Compliant**: GDPR and privacy compliant

This implementation gives you comprehensive analytics to understand user behavior, optimize conversions, and make data-driven decisions for your portfolio.
