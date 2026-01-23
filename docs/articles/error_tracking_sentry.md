# Zero Downtime: Advanced Error Tracking with Sentry

As your application grows, understanding how it performs in the wild becomes critical. Codiner integrates with **Sentry**, the leading platform for error tracking and performance monitoring, to help you catch bugs before your users do.

## Why Use Error Tracking?

Standard logs only tell you what happened on your machine. Error tracking tells you what happened on *your user's* machine. It captures:
- Unexpected JavaScript crashes.
- Low-memory warnings.
- Slow network requests.
- Broken UI components.

## The Codiner + Sentry Integration

### 1. One-Click Setup
Simply add your Sentry DSN in the **Diagnostics** panel, and Codiner automatically injects the necessary tracking code into your production builds.

### 2. Contextual Debugging
When an error occurs, Sentry records a "Breadcrumb" trail—a list of things the user did right before the crash. This makes reproducing and fixing bugs significantly faster.

### 3. Performance Insights
Sentry doesn't just track errors; it tracks performance. See which of your pages are loading slowly and identify the exact API call or image that's causing the delay.

## Quality of Service

By proactively monitoring for errors, you provide a higher "Quality of Service" to your users. It shows that you care about their experience and are committed to maintaining a stable, professional application.

Fix bugs faster. Build better software.
