# JoeyMed Improved Intake Form

This directory contains all the components for the enhanced JoeyMed healthcare intake form. The form includes premium features such as address auto-completion, BMI calculation, weight loss visualization, treatment infographics, Trustpilot reviews, and interactive 3D body visualization.

## Components

### Main Components
- `IntakeForm.tsx` - The main form component with multi-step flow
- `AddressAutocomplete.tsx` - Auto-populates address as users type
- `BMICalculator.tsx` - Calculates and visualizes BMI based on height and weight
- `WeightLossGraph.tsx` - Projects weight loss journey with timeline
- `TreatmentInfographic.tsx` - Visual statistics for each treatment vertical
- `BodyVisualization.tsx` - Interactive 3D model visualization
- `TrustpilotReviews.tsx` - Displays reviews from Trustpilot

### Checkout Components
- `SquareCheckout.tsx` - Handles payment processing with Square

## Features

- **Premium User Experience**
  - Typeform-style cards with one question per screen
  - Smooth animations and transitions
  - Interactive visualizations
  - Professional design with clear typography

- **Form Validation**
  - Florida residency verification
  - Age verification (18+ only)
  - Email confirmation
  - Required field validation

- **Treatment Options**
  - Weight Loss Program (3 package options)
  - ED Treatment (3 package options)
  - Sexual Health (3 package options)
  - Longevity Treatment (3 package options)

- **Health Assessment**
  - BMI calculation and visualization
  - Weight loss projection
  - Treatment-specific health questions
  - Interactive body visualization

- **Compliance**
  - Privacy Policy consent
  - Telehealth consent
  - HIPAA authorization
  - Marketing email opt-in (optional)

## Integration Instructions

1. Ensure all component files are in the same directory
2. Import components in your main application
3. Use the IntakeForm component as the entry point
4. Customize styling as needed using the provided CSS

## Dependencies

- React
- Framer Motion (for animations)
- Recharts (for graphs)
- TypeScript

## Notes

- The form is designed for Florida residents only
- Free consultation with healthcare providers is included after purchase
- Full refund is provided if medication is not prescribed
