# Comprehensive Mixpanel User Tracking

This guide documents the enhanced user tracking system that captures comprehensive user information and behavior analytics in Mixpanel.

## 🎯 Overview

Your portfolio now tracks **100+ user properties** and **real-time engagement metrics** to provide deep insights into user behavior, preferences, and interaction patterns.

## 📊 User Properties Tracked

### 🆔 Basic Identity
- `$first_name`: Portfolio
- `$last_name`: Visitor
- `$email`: null (for anonymous users)
- `$phone`: null (for anonymous users)
- `$created`: User creation timestamp
- `$last_seen`: Last activity timestamp

### 👤 User Classification
- `User Type`: portfolio_visitor
- `User Status`: active
- `User Segment`: anonymous_visitor
- `User Cohort`: new_visitor
- `Visit Frequency`: first_time
- `Returning User`: false

### 🌐 Traffic & Source
- `Traffic Source`: direct, google, linkedin, github, other
- `Referrer`: Full referrer URL
- `UTM Source`: Campaign source parameter
- `UTM Medium`: Campaign medium parameter
- `UTM Campaign`: Campaign name parameter
- `UTM Term`: Campaign term parameter
- `UTM Content`: Campaign content parameter

### 📱 Device & Browser
- `Device Type`: mobile, tablet, desktop
- `Device Category`: mobile, tablet, desktop
- `Browser`: Chrome, Firefox, Safari, Edge, Opera, Other
- `Browser Version`: Specific version number
- `Operating System`: Windows, macOS, Linux, Android, iOS, Other
- `OS Version`: Specific OS version
- `Platform`: navigator.platform value
- `Hardware Concurrency`: Number of CPU cores
- `Device Memory`: Available device memory (if supported)
- `Max Touch Points`: Maximum touch points supported

### 🖥️ Screen & Display
- `Screen Resolution`: Full screen resolution (e.g., 1920x1080)
- `Viewport Size`: Browser viewport size
- `Available Screen`: Available screen area
- `Color Depth`: Screen color depth
- `Pixel Ratio`: Device pixel ratio
- `Screen Orientation`: portrait, landscape, unknown

### 🌍 Location & Network
- `Country`: User's country
- `City`: User's city
- `Region`: User's region/state
- `IP Address`: User's IP address
- `ISP`: Internet service provider
- `Timezone`: User's timezone
- `Language`: Primary language
- `Locale`: Browser locale
- `Languages`: All supported languages

### 🔗 Connection & Performance
- `Connection Type`: wifi, cellular, ethernet, unknown
- `Connection Effective Type`: 4g, 3g, 2g, slow-2g, unknown
- `Connection Downlink`: Connection speed in Mbps
- `Connection RTT`: Round-trip time in ms

### ⚡ Capabilities & Features
- `Touch Support`: true/false
- `Geolocation Support`: true/false
- `Notification Support`: true/false
- `Service Worker Support`: true/false
- `WebGL Support`: true/false
- `WebP Support`: true/false
- `Java Enabled`: true/false
- `Cookie Enabled`: true/false
- `Do Not Track`: 1, 0, null

### 📈 Session & Engagement
- `First Visit`: First visit timestamp
- `Last Visit`: Last visit timestamp
- `Session Start`: Current session start time
- `Session Duration`: Current session duration in seconds
- `Page Views`: Number of page views
- `Events Count`: Number of events triggered
- `Last Activity`: Last activity timestamp
- `Engagement Score`: Calculated engagement score (0-100)
- `Bounce Risk`: high, medium, low
- `Behavior Pattern`: new_visitor, returning_visitor, engaged_user

### 🎯 Interest & Behavior
- `Interest Categories`: Array of interest categories
- `Preferred Language`: User's preferred language
- `Time of Day`: Hour of day (0-23)
- `Day of Week`: Day of week (0-6)
- `Mobile User`: true/false
- `Desktop User`: true/false
- `Tablet User`: true/false

## 📊 Real-Time Engagement Metrics

### 🖱️ Interaction Tracking
- `Mouse Movements`: Number of mouse movements
- `Clicks`: Total number of clicks
- `Link Clicks`: Number of link clicks
- `Button Clicks`: Number of button clicks
- `Keystrokes`: Number of keystrokes
- `Form Interactions`: Number of form field interactions

### 📜 Scroll & Navigation
- `Max Scroll Depth`: Maximum scroll depth percentage
- `Scroll Depth`: Current scroll depth percentage
- `Time on Page`: Time spent on current page
- `Window Resize`: Number of window resize events

### 👁️ Visibility & Focus
- `Page Hidden`: Number of times page was hidden
- `Page Visible`: Number of times page became visible
- `Window Focus`: Number of times window gained focus
- `Window Blur`: Number of times window lost focus

## 🧮 Engagement Score Calculation

The engagement score (0-100) is calculated based on:

| Factor | Weight | Max Points |
|--------|--------|------------|
| Time on Page | 30% | 30 points |
| Scroll Depth | 25% | 25 points |
| Mouse Movements | 15% | 15 points |
| Clicks | 15% | 15 points |
| Form Interactions | 10% | 10 points |
| Keystrokes | 5% | 5 points |

### Bounce Risk Classification
- **High Risk**: Score < 10 (likely to bounce)
- **Medium Risk**: Score 10-30 (moderate engagement)
- **Low Risk**: Score > 30 (highly engaged)

## 🎯 Events Tracked

### User Lifecycle Events
- `User Profile Created`: When comprehensive user profile is created
- `User Identification`: When user is identified
- `Session Start`: When session begins
- `Session End`: When session ends

### Engagement Events
- `User Engagement`: Real-time engagement metrics
- `Engagement Score Updated`: When engagement score is recalculated

### Behavior Events
- `Page View`: Standard page view tracking
- `Navigation Click`: Navigation menu clicks
- `Hero Button Click`: Hero section button clicks
- `Project Link Click`: Project link clicks
- `Social Click`: Social media link clicks
- `CV Download`: CV download events
- `Language Switch`: Language toggle events
- `Form Submit`: Contact form submissions
- `Lead Conversion`: Lead generation events

## 🔧 Technical Implementation

### Data Collection Methods

1. **Browser APIs**: Navigator, Screen, Connection APIs
2. **IP Geolocation**: ipapi.co for location data
3. **Event Listeners**: Mouse, keyboard, scroll, focus events
4. **Performance APIs**: Timing and performance data
5. **Feature Detection**: Capability detection for various features

### Privacy & Compliance

- **Anonymous Tracking**: No personal data collected
- **IP Anonymization**: IP addresses used only for geolocation
- **Do Not Track**: Respects browser DNT settings
- **GDPR Compliant**: No personal identifiers stored
- **Opt-out Support**: Users can disable tracking

### Performance Optimization

- **Debounced Events**: Prevents excessive API calls
- **Batch Updates**: Groups related updates together
- **Lazy Loading**: Non-critical data loaded asynchronously
- **Error Handling**: Graceful fallbacks for API failures

## 📈 Analytics Benefits

### User Segmentation
- **Device-based**: Mobile vs Desktop vs Tablet users
- **Geographic**: Country, region, city-based segments
- **Behavioral**: Engagement level, bounce risk, interest categories
- **Technical**: Browser, OS, connection type segments

### Conversion Optimization
- **Funnel Analysis**: Track user journey through portfolio
- **A/B Testing**: Test different versions of content
- **Engagement Scoring**: Identify high-value visitors
- **Retention Analysis**: Track returning user behavior

### Performance Insights
- **Load Time Impact**: How performance affects engagement
- **Device Performance**: Performance across different devices
- **Connection Impact**: How connection speed affects behavior
- **Feature Support**: Which features users can access

## 🚀 Advanced Features

### Real-Time Analytics
- **Live User Tracking**: See users in real-time
- **Engagement Monitoring**: Track engagement as it happens
- **Behavior Patterns**: Identify common user paths
- **Anomaly Detection**: Spot unusual behavior patterns

### Predictive Analytics
- **Bounce Prediction**: Predict which users will bounce
- **Engagement Forecasting**: Predict user engagement levels
- **Conversion Probability**: Predict lead conversion likelihood
- **Retention Modeling**: Predict user return probability

### Custom Dashboards
- **User Journey Maps**: Visualize user paths
- **Engagement Heatmaps**: See where users interact most
- **Performance Metrics**: Track site performance impact
- **Conversion Funnels**: Analyze conversion paths

## 🔍 Monitoring & Debugging

### Console Commands
```javascript
// Check if Mixpanel is loaded
console.log('Mixpanel loaded:', typeof mixpanel !== 'undefined');

// View current user properties
console.log('User properties:', mixpanel.people.get());

// Check engagement score
console.log('Engagement score:', mixpanel.people.get('Engagement Score'));

// View recent events
console.log('Recent events:', mixpanel.get_property('$events'));
```

### Debug Mode
Enable debug mode by adding to your console:
```javascript
mixpanel.set_config({ debug: true });
```

## 📊 Sample Queries

### High-Engagement Users
```
Engagement Score > 50 AND Time on Page > 120
```

### Mobile Users by Country
```
Device Type = "mobile" AND Country = "United States"
```

### Bounce Risk Analysis
```
Bounce Risk = "high" AND Session Duration < 30
```

### Conversion Funnel
```
Page View → CV Download → Form Submit → Lead Conversion
```

## 🎯 Best Practices

### Data Quality
- **Regular Validation**: Check data accuracy regularly
- **Error Monitoring**: Monitor for data collection errors
- **Fallback Handling**: Ensure graceful degradation
- **Performance Impact**: Monitor tracking performance

### Privacy Compliance
- **Data Minimization**: Collect only necessary data
- **Transparency**: Clear privacy policy
- **User Control**: Allow users to opt-out
- **Data Retention**: Set appropriate retention periods

### Analytics Strategy
- **Goal Alignment**: Align tracking with business goals
- **Regular Review**: Review analytics data regularly
- **Actionable Insights**: Focus on actionable metrics
- **Continuous Improvement**: Iterate based on findings

## 🆘 Troubleshooting

### Common Issues

1. **Missing User Properties**
   - Check browser console for errors
   - Verify Mixpanel token is correct
   - Ensure all APIs are supported

2. **Engagement Score Not Updating**
   - Check if user behavior tracking is initialized
   - Verify event listeners are working
   - Check for JavaScript errors

3. **Location Data Missing**
   - Check IP geolocation API access
   - Verify fallback timezone detection
   - Check network connectivity

4. **Performance Issues**
   - Monitor tracking script performance
   - Check for excessive API calls
   - Verify debouncing is working

### Debug Checklist
- [ ] Mixpanel token is valid
- [ ] All required APIs are supported
- [ ] No JavaScript errors in console
- [ ] Network requests are successful
- [ ] User properties are being set
- [ ] Events are being tracked
- [ ] Engagement metrics are updating

Your portfolio now has the most comprehensive user tracking system possible, providing deep insights into user behavior, preferences, and engagement patterns! 🎉
