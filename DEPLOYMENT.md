# JoeyMed Healthcare Intake Form - Deployment Guide

This document provides instructions for deploying the JoeyMed healthcare intake form to a production environment.

## Prerequisites

- Node.js 18.x or higher
- npm or pnpm package manager
- A Square developer account with API credentials
- A hosting platform that supports Next.js applications (Vercel recommended)

## Environment Variables

Before deploying, you need to set up the following environment variables:

```
# Square Integration
NEXT_PUBLIC_SQUARE_APP_ID=your_square_app_id
NEXT_PUBLIC_SQUARE_LOCATION_ID=your_square_location_id
SQUARE_ACCESS_TOKEN=your_square_access_token

# Environment
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Where to Find Square Credentials

1. **Square App ID and Location ID**:
   - Log in to the [Square Developer Dashboard](https://developer.squareup.com/apps)
   - Select your application
   - Find your Application ID in the Credentials section
   - Find your Location ID in the Locations section

2. **Square Access Token**:
   - In the Square Developer Dashboard, go to the OAuth section
   - Generate a new Access Token or use an existing one
   - Make sure the token has the appropriate permissions for payments

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

1. **Create a Vercel Account**:
   - Go to https://vercel.com and sign up for an account
   - You can sign up using GitHub, GitLab, or Bitbucket for easier integration

2. **Prepare Your Repository**:
   - Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

3. **Deploy on Vercel**:
   - In your Vercel dashboard, click "New Project"
   - Import your repository
   - Vercel will automatically detect it's a Next.js project
   - Configure your project settings:
     - Add the environment variables listed above
     - Set the build command to `pnpm build` or `npm run build`
     - Set the output directory to `.next`
   - Click "Deploy"

4. **Configure Custom Domain** (optional):
   - In your project settings on Vercel, go to "Domains"
   - Add your custom domain (e.g., intake.joeymed.com)
   - Follow the instructions to configure DNS settings

### Option 2: Deploy to Netlify

1. **Create a Netlify Account**:
   - Go to https://netlify.com and sign up for an account

2. **Deploy on Netlify**:
   - Click "New site from Git"
   - Connect to your Git provider and select your repository
   - Configure build settings:
     - Build command: `pnpm build` or `npm run build`
     - Publish directory: `.next`
   - Add the environment variables in the "Advanced build settings"
   - Click "Deploy site"

### Option 3: Self-Hosting

1. **Build the Application**:
   ```bash
   # Install dependencies
   pnpm install
   # or
   npm install

   # Build the application
   pnpm build
   # or
   npm run build
   ```

2. **Start the Production Server**:
   ```bash
   # Set environment variables first
   pnpm start
   # or
   npm start
   ```

## Testing Your Deployment

After deployment, verify that:

1. The form loads correctly
2. Florida residency and age verification work properly
3. Treatment selection and dynamic questions function as expected
4. Square checkout integration works (test with Square's sandbox environment first)

## Troubleshooting

- **Square Integration Issues**:
  - Verify your Square credentials are correct
  - Check that you're using the correct environment (sandbox vs. production)
  - Review Square's API documentation for any changes

- **Deployment Failures**:
  - Check build logs for errors
  - Verify all dependencies are correctly installed
  - Ensure environment variables are properly set

## Support

For additional support with your JoeyMed healthcare intake form, please contact your developer or Square support for payment-related issues.
