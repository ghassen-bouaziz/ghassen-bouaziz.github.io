# Google Tag Manager Setup Guide

This guide will walk you through setting up Google Tag Manager for your portfolio website.

## Prerequisites
- Google Tag Manager account with ID: `GTM-MKMMSLMW`
- Google Analytics 4 property (if you want to send data to GA4)

## Step 1: Create Triggers

### 1.1 CV Download Trigger
1. Go to **Triggers** → **New**
2. **Trigger Name**: `CV Download`
3. **Trigger Type**: `Custom Event`
4. **Event Name**: `cv_download`
5. **Save**

### 1.2 Form Submission Trigger
1. Go to **Triggers** → **New**
2. **Trigger Name**: `Form Submit`
3. **Trigger Type**: `Custom Event`
4. **Event Name**: `form_submit`
5. **Save**

### 1.3 Form Error Trigger
1. Go to **Triggers** → **New**
2. **Trigger Name**: `Form Error`
3. **Trigger Type**: `Custom Event`
4. **Event Name**: `form_error`
5. **Save**

### 1.4 Language Switch Trigger
1. Go to **Triggers** → **New**
2. **Trigger Name**: `Language Switch`
3. **Trigger Type**: `Custom Event`
4. **Event Name**: `language_switch`
5. **Save**

### 1.5 Navigation Click Trigger
1. Go to **Triggers** → **New**
2. **Trigger Name**: `Navigation Click`
3. **Trigger Type**: `Custom Event`
4. **Event Name**: `navigation_click`
5. **Save**

### 1.6 Hero Button Click Trigger
1. Go to **Triggers** → **New**
2. **Trigger Name**: `Hero Button Click`
3. **Trigger Type**: `Custom Event`
4. **Event Name**: `hero_button_click`
5. **Save**

### 1.7 Project Link Click Trigger
1. Go to **Triggers** → **New**
2. **Trigger Name**: `Project Link Click`
3. **Trigger Type**: `Custom Event`
4. **Event Name**: `project_link_click`
5. **Save**

### 1.8 Social Media Click Trigger
1. Go to **Triggers** → **New**
2. **Trigger Name**: `Social Media Click`
3. **Trigger Type**: `Custom Event`
4. **Event Name**: `social_click`
5. **Save**

### 1.9 Scroll Depth Trigger
1. Go to **Triggers** → **New**
2. **Trigger Name**: `Scroll Depth`
3. **Trigger Type**: `Custom Event`
4. **Event Name**: `scroll_depth`
5. **Save**

### 1.10 Page Load Trigger
1. Go to **Triggers** → **New**
2. **Trigger Name**: `Page Load`
3. **Trigger Type**: `Custom Event`
4. **Event Name**: `page_load`
5. **Save**

## Step 2: Create Variables (Optional but Recommended)

### 2.1 User Country Variable
1. Go to **Variables** → **New**
2. **Variable Name**: `User Country`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `user_country`
5. **Save**

### 2.1 Event Category Variable
1. Go to **Variables** → **New**
2. **Variable Name**: `Event Category`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `event_category`
5. **Save**

### 2.2 Event Action Variable
1. Go to **Variables** → **New**
2. **Variable Name**: `Event Action`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `event_action`
5. **Save**

### 2.3 Event Label Variable
1. Go to **Variables** → **New**
2. **Variable Name**: `Event Label`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `event_label`
5. **Save**

### 2.4 Event Value Variable
1. Go to **Variables** → **New**
2. **Variable Name**: `Event Value`
3. **Variable Type**: `Data Layer Variable`
4. **Data Layer Variable Name**: `value`
5. **Save**

## Step 3: Create Google Analytics 4 Configuration Tag

### 3.1 GA4 Configuration Tag
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 Configuration`
3. **Tag Type**: `Google Analytics: GA4 Configuration`
4. **Measurement ID**: Enter your GA4 Measurement ID (e.g., `G-XXXXXXXXXX`)
5. **Save**

## Step 4: Create Event Tags

### 4.1 CV Download Event Tag
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - CV Download`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `cv_download`
6. **Event Parameters**:
   - `event_category`: `{{Event Category}}`
   - `event_action`: `{{Event Action}}`
   - `event_label`: `{{Event Label}}`
   - `value`: `{{Event Value}}`
7. **Triggering**: Select `CV Download` trigger
8. **Save**

### 4.2 Form Submit Event Tag
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - Form Submit`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `form_submit`
6. **Event Parameters**:
   - `event_category`: `{{Event Category}}`
   - `event_action`: `{{Event Action}}`
   - `event_label`: `{{Event Label}}`
   - `value`: `{{Event Value}}`
7. **Triggering**: Select `Form Submit` trigger
8. **Save**

### 4.3 Form Error Event Tag
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - Form Error`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `form_error`
6. **Event Parameters**:
   - `event_category`: `{{Event Category}}`
   - `event_action`: `{{Event Action}}`
   - `event_label`: `{{Event Label}}`
   - `value`: `{{Event Value}}`
7. **Triggering**: Select `Form Error` trigger
8. **Save**

### 4.4 Language Switch Event Tag
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - Language Switch`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `language_switch`
6. **Event Parameters**:
   - `event_category`: `{{Event Category}}`
   - `event_action`: `{{Event Action}}`
   - `event_label`: `{{Event Label}}`
   - `value`: `{{Event Value}}`
7. **Triggering**: Select `Language Switch` trigger
8. **Save**

### 4.5 Navigation Click Event Tag
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - Navigation Click`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `navigation_click`
6. **Event Parameters**:
   - `event_category`: `{{Event Category}}`
   - `event_action`: `{{Event Action}}`
   - `event_label`: `{{Event Label}}`
   - `value`: `{{Event Value}}`
7. **Triggering**: Select `Navigation Click` trigger
8. **Save**

### 4.6 Hero Button Click Event Tag
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - Hero Button Click`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `hero_button_click`
6. **Event Parameters**:
   - `event_category`: `{{Event Category}}`
   - `event_action`: `{{Event Action}}`
   - `event_label`: `{{Event Label}}`
   - `value`: `{{Event Value}}`
7. **Triggering**: Select `Hero Button Click` trigger
8. **Save**

### 4.7 Project Link Click Event Tag
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - Project Link Click`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `project_link_click`
6. **Event Parameters**:
   - `event_category`: `{{Event Category}}`
   - `event_action`: `{{Event Action}}`
   - `event_label`: `{{Event Label}}`
   - `value`: `{{Event Value}}`
7. **Triggering**: Select `Project Link Click` trigger
8. **Save**

### 4.8 Social Media Click Event Tag
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - Social Media Click`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `social_click`
6. **Event Parameters**:
   - `event_category`: `{{Event Category}}`
   - `event_action`: `{{Event Action}}`
   - `event_label`: `{{Event Label}}`
   - `value`: `{{Event Value}}`
7. **Triggering**: Select `Social Media Click` trigger
8. **Save**

### 4.9 Scroll Depth Event Tag
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - Scroll Depth`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `scroll_depth`
6. **Event Parameters**:
   - `event_category`: `{{Event Category}}`
   - `event_action`: `{{Event Action}}`
   - `event_label`: `{{Event Label}}`
   - `value`: `{{Event Value}}`
7. **Triggering**: Select `Scroll Depth` trigger
8. **Save**

### 4.10 Page Load Event Tag
1. Go to **Tags** → **New**
2. **Tag Name**: `GA4 - Page Load`
3. **Tag Type**: `Google Analytics: GA4 Event`
4. **Configuration Tag**: Select your GA4 Configuration tag
5. **Event Name**: `page_load`
6. **Event Parameters**:
   - `event_category`: `{{Event Category}}`
   - `event_action`: `{{Event Action}}`
   - `event_label`: `{{Event Label}}`
   - `value`: `{{Event Value}}`
7. **Triggering**: Select `Page Load` trigger
8. **Save**

## Step 5: Test Your Setup

### 5.1 Preview Mode
1. Click **Preview** in GTM
2. Enter your website URL
3. Perform various actions on your site:
   - Click navigation links
   - Download CV
   - Fill out contact form
   - Switch languages
   - Click project links
   - Click social media links
4. Verify events are firing in the GTM debug console

### 5.2 Google Analytics Real-time Reports
1. Go to your GA4 property
2. Navigate to **Reports** → **Realtime**
3. Perform actions on your site
4. Verify events appear in real-time reports

## Step 6: Publish Your Container

### 6.1 Submit for Review
1. Click **Submit** in GTM
2. **Version Name**: `Initial Event Tracking Setup`
3. **Version Description**: `Added comprehensive event tracking for portfolio interactions`
4. **Submit**

### 6.2 Publish
1. Click **Publish** to make changes live
2. Your tracking is now active!

## Step 7: Create Custom Reports in GA4

### 7.1 Events Report
1. Go to **Reports** → **Engagement** → **Events**
2. View all your custom events

### 7.2 Custom Report for Downloads
1. Go to **Explore** → **Free Form**
2. **Dimensions**: Event Name, Event Label
3. **Metrics**: Event Count
4. **Filter**: Event Name = cv_download

### 7.3 Custom Report for Form Interactions
1. Go to **Explore** → **Free Form**
2. **Dimensions**: Event Name, Event Label
3. **Metrics**: Event Count
4. **Filter**: Event Name contains "form"

## Troubleshooting

### Common Issues:
1. **Events not firing**: Check GTM Preview mode
2. **Data not appearing in GA4**: Verify GA4 Configuration tag
3. **Wrong event names**: Ensure trigger names match JavaScript events
4. **Missing parameters**: Check variable names in dataLayer

### Debug Steps:
1. Use GTM Preview mode
2. Check browser console for errors
3. Verify dataLayer pushes in browser dev tools
4. Check GA4 Real-time reports

## Summary

After completing these steps, you'll have:
- ✅ 10 custom event triggers
- ✅ 4 data layer variables
- ✅ 1 GA4 configuration tag
- ✅ 10 GA4 event tags
- ✅ Complete event tracking for your portfolio
- ✅ Real-time data in Google Analytics

Your portfolio will now track all user interactions and provide valuable insights into user behavior!
