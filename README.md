# JoeyMed Healthcare Intake Form

A premium healthcare intake form for JoeyMed with Typeform-style interface, Florida residency verification, age verification, and Square checkout integration.

## Features

- **Premium Typeform-style Interface**: One question per screen with smooth animations
- **Qualification Checks**: Disqualifies users not in Florida or under 18 years old
- **Dynamic Health Questions**: Questions change based on selected treatment vertical
- **Treatment Verticals**: Weight Loss, Erectile Dysfunction, Sexual Health, Anti-Aging & Wellness, Travel Kits
- **Upsell Recommendations**: Suggests additional products based on selected treatment
- **Square Checkout Integration**: Seamless payment processing with Square
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Form Validation**: Complete validation for all form fields

## Tech Stack

- Next.js 15.x
- React 19.x
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Square Web Payments SDK

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/joeymed-intake-form.git
   cd joeymed-intake-form
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local` with your Square credentials.

5. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the form.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

- `src/app`: Next.js app router files
- `src/components`: React components
  - `src/components/checkout`: Square checkout integration
  - `src/components/ui`: UI components (buttons, inputs, etc.)
- `src/lib`: Utility functions and helpers
- `src/hooks`: Custom React hooks

## Square Integration

This project integrates with Square for payment processing. To use Square:

1. Create a Square developer account at [https://developer.squareup.com/](https://developer.squareup.com/)
2. Create a new application in the Square Developer Dashboard
3. Get your App ID, Location ID, and Access Token
4. Add these credentials to your environment variables

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- JoeyMed for the project requirements
- Square for the payment processing API
- Vercel for the Next.js framework
