# Country Tracking Implementation

This document explains how country tracking is implemented in your portfolio and how to set it up in Google Tag Manager.

## Overview

Country tracking allows you to:
- Understand your global audience
- Identify which countries generate the most traffic
- Track lead generation by country
- Optimize content for specific regions
- Analyze user behavior by geographic location

## Implementation Details

### 1. Country Detection Methods

#### Primary Method: IP Geolocation API
- **API**: `https://ipapi.co/json/`
- **Data**: Country name and country code
- **Accuracy**: High (based on IP address)
- **Privacy**: No personal data collected

#### Fallback Method: Timezone Mapping
- **Source**: Browser timezone (`Intl.DateTimeFormat().resolvedOptions().timeZone`)
- **Coverage**: 60+ countries and regions
- **Accuracy**: Medium (timezone-based estimation)
- **Privacy**: No external API calls

### 2. Supported Countries

The timezone fallback covers these countries:

**Americas:**
- United States (multiple timezones)
- Canada (multiple timezones)
- Brazil, Argentina, Mexico, Colombia, Peru, Chile, Venezuela

**Europe:**
- United Kingdom, France, Germany, Italy, Spain
- Netherlands, Belgium, Switzerland, Austria
- Sweden, Norway, Denmark, Finland
- Poland, Czech Republic, Hungary, Romania, Bulgaria
- Greece, Portugal, Ireland

**Asia:**
- Japan, China, South Korea, Singapore
- Hong Kong, Taiwan, Thailand, Indonesia
- Malaysia, Philippines, Vietnam, India
- UAE, Saudi Arabia, Iran, Israel, Turkey

**Africa:**
- Egypt, South Africa, Nigeria, Morocco, Tunisia, Algeria

**Oceania:**
- Australia (multiple timezones), New Zealand

### 3. Data Structure

```javascript
// User properties include:
{
    'user_country': 'United States', // or 'France', 'Germany', etc.
    'user_timezone': 'America/New_York',
    'user_language': 'en' // or 'fr'
}
```

## GTM Setup for Country Tracking

### 1. Create User Country Variable

1. Go to **Variables** → **New**
2. **Variable Name**: `User Country`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `user_country`
5. **Save**

### 2. Update GA4 Configuration Tag

1. Edit your existing GA4 Configuration tag
2. **Fields to Set**:
   - `user_id`: `{{User ID}}`
   - `custom_map`: `{'custom_parameter_1': 'user_type', 'custom_parameter_2': 'session_id', 'custom_parameter_9': 'user_country'}`
3. **Save**

### 3. Create Country-Specific Event Tags

**User Identification with Country:**
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - User Identification with Country`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `user_identification`
6. **Event Parameters**:
   - `user_id`: `{{User ID}}`
   - `user_type`: `{{User Type}}`
   - `user_country`: `{{User Country}}`
   - `user_language`: `{{User Language}}`
7. **Triggering**: Select `Page Load` trigger
8. **Save**

## Reports and Analysis

### 1. Country Traffic Report
1. Go to **GA4** → **Reports** → **Demographics** → **Demographics details**
2. **Dimension**: Country
3. **Metrics**: Users, Sessions, Page views
4. **Filter**: Custom events

### 2. Country Conversion Report
1. Go to **GA4** → **Explore** → **Free Form`
2. **Dimensions**: Country, Event Name
3. **Metrics**: Event Count
4. **Filter**: Event Name = lead_conversion

### 3. Country vs Language Analysis
1. Go to **GA4** → **Explore** → **Free Form`
2. **Dimensions**: Country, User Language
3. **Metrics**: Users, Sessions
4. **Breakdown**: Country

### 4. Geographic Funnel Analysis
1. Go to **GA4** → **Explore** → **Funnel Exploration`
2. **Steps**: Page View → CV Download → Form Submit
3. **Breakdown**: Country

## Custom Dimensions in GA4

### 1. Create Custom Dimensions

**Country Dimension:**
1. Go to **GA4** → **Configure** → **Custom Definitions** → **Custom Dimensions**
2. **Dimension Name**: `User Country`
3. **Scope**: User
4. **Description**: `Country where user is located`
5. **Save**

**Language Dimension:**
1. Go to **GA4** → **Configure** → **Custom Definitions** → **Custom Dimensions`
2. **Dimension Name**: `User Language`
3. **Scope**: User
4. **Description**: `User's preferred language`
5. **Save**

### 2. Map Custom Dimensions

In your GA4 Configuration tag:
```javascript
'custom_map': {
    'custom_parameter_1': 'user_type',
    'custom_parameter_2': 'session_id',
    'custom_parameter_9': 'user_country',
    'custom_parameter_10': 'user_language'
}
```

## Privacy and Compliance

### 1. GDPR Compliance
- **No Personal Data**: Only country-level information
- **Anonymous Tracking**: No individual identification
- **User Consent**: Respects user privacy preferences
- **Data Minimization**: Only collects necessary geographic data

### 2. Data Retention
- **Country Data**: Stored in GA4 for analysis
- **No Local Storage**: Country not stored in browser
- **API Limits**: Respects IP geolocation API rate limits
- **Fallback Method**: Uses timezone when API unavailable

## Performance Considerations

### 1. API Optimization
- **Single Request**: Country detected once per session
- **Caching**: Results cached in session
- **Fallback**: Timezone method when API fails
- **Async Loading**: Non-blocking country detection

### 2. Error Handling
- **API Failures**: Graceful fallback to timezone
- **Network Issues**: Continues without country data
- **Invalid Responses**: Defaults to 'Unknown'
- **Rate Limiting**: Respects API limits

## Use Cases

### 1. Content Localization
- **Language Preferences**: Show appropriate language based on country
- **Regional Content**: Display relevant projects for specific regions
- **Timezone Awareness**: Show appropriate contact hours

### 2. Marketing Analysis
- **Geographic ROI**: Track which countries generate most leads
- **Regional Campaigns**: Measure effectiveness by region
- **Market Expansion**: Identify new markets to target

### 3. User Experience
- **Regional Optimization**: Optimize for specific countries
- **Cultural Adaptation**: Adapt content for different cultures
- **Local Regulations**: Ensure compliance with local laws

## Testing

### 1. Country Detection Test
```javascript
// Test in browser console
console.log('Country:', await getCountry());
console.log('Timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
```

### 2. GTM Preview Mode
1. Open GTM Preview mode
2. Check dataLayer for `user_country` variable
3. Verify country data in GA4 real-time reports

### 3. Geographic Testing
- **VPN Testing**: Use VPN to test different countries
- **Timezone Testing**: Change browser timezone
- **API Testing**: Test with and without API access

## Troubleshooting

### Common Issues:
1. **Country shows as 'Unknown'**: Check API access and fallback timezone
2. **Incorrect country**: Verify timezone mapping
3. **API errors**: Check network connectivity and API limits
4. **GTM not receiving data**: Verify dataLayer variable names

### Debug Steps:
1. Check browser console for errors
2. Verify dataLayer in GTM Preview mode
3. Test country detection function
4. Check GA4 real-time reports

## Summary

Country tracking provides valuable insights into your global audience:
- ✅ **Geographic Analytics**: Understand your global reach
- ✅ **Lead Generation**: Track conversions by country
- ✅ **Content Optimization**: Adapt for regional preferences
- ✅ **Privacy Compliant**: No personal data collected
- ✅ **Performance Optimized**: Efficient detection methods
- ✅ **Fallback Support**: Works even when API unavailable

This implementation gives you comprehensive geographic insights while maintaining user privacy and optimal performance.
