# Google Tag Manager Event Tracking

This document outlines all the events being tracked on your portfolio website using Google Tag Manager.

## Event Categories

### 1. **Downloads** 📥
- **Event**: `cv_download`
- **Category**: Downloads
- **Action**: CV Download
- **Label**: CV-EN or CV-FR (based on language)
- **Value**: 1
- **Trigger**: When user clicks the CV download button

### 2. **Contact Form** 📝
- **Event**: `form_submit`
- **Category**: Contact
- **Action**: Form Submission
- **Label**: Contact Form
- **Value**: 1
- **Trigger**: When contact form is successfully submitted

- **Event**: `form_error`
- **Category**: Contact
- **Action**: Form Error
- **Label**: Contact Form
- **Value**: 0
- **Trigger**: When contact form submission fails

### 3. **User Interaction** 🔄
- **Event**: `language_switch`
- **Category**: User Interaction
- **Action**: Language Toggle
- **Label**: Switch to EN or Switch to FR
- **Value**: 1
- **Trigger**: When user switches language

### 4. **Navigation** 🧭
- **Event**: `navigation_click`
- **Category**: Navigation
- **Action**: Section Navigation
- **Label**: home, about, skills, experience, projects, contact
- **Value**: 1
- **Trigger**: When user clicks navigation links

### 5. **Call-to-Action Buttons** 🎯
- **Event**: `hero_button_click`
- **Category**: CTA
- **Action**: Hero Button
- **Label**: "View My Work" or "Get In Touch"
- **Value**: 1
- **Trigger**: When user clicks hero section buttons

### 6. **Project Links** 🚀
- **Event**: `project_link_click`
- **Category**: Projects
- **Action**: Project Link
- **Label**: "Project Name - App Store" or "Project Name - Source Code"
- **Value**: 1
- **Trigger**: When user clicks project links

### 7. **Social Media** 📱
- **Event**: `social_click`
- **Category**: Social Media
- **Action**: Social Link
- **Label**: LinkedIn, Email, or Phone
- **Value**: 1
- **Trigger**: When user clicks social media links

### 8. **Engagement** 📊
- **Event**: `scroll_depth`
- **Category**: Engagement
- **Action**: Scroll Depth
- **Label**: 25%, 50%, 75%, 100%
- **Value**: Scroll percentage
- **Trigger**: When user scrolls to 25%, 50%, 75%, or 100% of page

### 9. **Performance** ⚡
- **Event**: `page_load`
- **Category**: Performance
- **Action**: Page Load Time
- **Label**: Portfolio Load
- **Value**: Load time in milliseconds
- **Trigger**: When page finishes loading

## GTM Configuration

### DataLayer Events
All events are pushed to the `dataLayer` with the following structure:
```javascript
dataLayer.push({
    'event': 'event_name',
    'event_category': 'category',
    'event_action': 'action',
    'event_label': 'label',
    'value': value
});
```

### Google Analytics 4 Events
Events are also sent to GA4 using the `gtag` function:
```javascript
gtag('event', 'event_name', {
    event_category: 'category',
    event_action: 'action',
    event_label: 'label',
    value: value
});
```

## GTM Triggers to Create

1. **CV Download Trigger**
   - Event: Custom Event
   - Event Name: cv_download

2. **Form Submission Trigger**
   - Event: Custom Event
   - Event Name: form_submit

3. **Form Error Trigger**
   - Event: Custom Event
   - Event Name: form_error

4. **Language Switch Trigger**
   - Event: Custom Event
   - Event Name: language_switch

5. **Navigation Click Trigger**
   - Event: Custom Event
   - Event Name: navigation_click

6. **Hero Button Click Trigger**
   - Event: Custom Event
   - Event Name: hero_button_click

7. **Project Link Click Trigger**
   - Event: Custom Event
   - Event Name: project_link_click

8. **Social Media Click Trigger**
   - Event: Custom Event
   - Event Name: social_click

9. **Scroll Depth Trigger**
   - Event: Custom Event
   - Event Name: scroll_depth

10. **Page Load Trigger**
    - Event: Custom Event
    - Event Name: page_load

## GTM Tags to Create

### Google Analytics 4 Event Tags
Create GA4 Event tags for each event type with:
- **Tag Type**: Google Analytics: GA4 Event
- **Configuration Tag**: Your GA4 Configuration Tag
- **Event Name**: Use the event name from the trigger
- **Event Parameters**: Map the dataLayer variables

### Example GA4 Event Tag Configuration:
- **Event Name**: {{Event}} (from trigger)
- **Parameters**:
  - `event_category`: {{Event Category}}
  - `event_action`: {{Event Action}}
  - `event_label`: {{Event Label}}
  - `value`: {{Event Value}}

## Custom Dimensions (Optional)

Consider creating custom dimensions in GA4 for:
- **Language**: Track which language users prefer
- **Project Interest**: Track which projects get the most clicks
- **User Journey**: Track the sequence of user interactions

## Reports to Create

1. **Download Tracking**: Monitor CV download rates by language
2. **Form Conversion**: Track contact form completion rates
3. **User Engagement**: Monitor scroll depth and time on page
4. **Project Interest**: See which projects get the most attention
5. **Navigation Patterns**: Understand how users navigate your site
6. **Language Preferences**: Track language usage patterns

## Testing

Use GTM Preview mode to test all events:
1. Open GTM Preview mode
2. Navigate to your portfolio
3. Perform various actions (click buttons, fill forms, etc.)
4. Verify events are firing in the GTM debug console
5. Check GA4 Real-time reports to confirm data is being received

## Privacy Considerations

- All tracking is anonymous
- No personal data is collected
- Users can opt-out using browser settings
- Consider adding a cookie consent banner if required by your jurisdiction
