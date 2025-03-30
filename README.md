# AI Career Coach

## Overview

AI Career Coach is a Next.js-based application that leverages AI for career coaching, integrating various technologies for authentication, data handling, form validation, and UI components.

## Tech Stack

- **Framework**: Next.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: Clerk
- **UI Components**: ShadCN
- **State Management & Form Handling**: React Hook Form + Zod
- **Background Jobs**: Inngest
- **AI Integration**: Google Gemini API
- **Charts & Visualization**: Recharts
- **Date Management**: Date-fns

## Installation & Setup

### Clone the Repository

```sh
 git clone <https://github.com/piyushpratek/ai-career-coach>
 cd ai-career-coach
```

### Install Dependencies

```sh
npm install
```

### Environment Variables

Create a `.env` file and configure it with your database and API keys.

```sh
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= ########################
CLERK_SECRET_KEY= ########################
NEXT_PUBLIC_CLERK_SIGN_IN_URL= /sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL= /sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL= /onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL= /onboarding
DATABASE_URL= ########################
GEMINI_API_KEY= ########################
```

### Migrate Database

Push all Prisma schemas to the Neon database:

```sh
npx prisma migrate dev --name create-models
```

### Start Development Server

```sh
npm run dev
```

## Available Scripts

- `npm run dev` - Runs the development server.
- `npm run build` - Builds the app for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Lints the code.
- `npm run postinstall` - Generates Prisma client after installation.

## Dependencies

### Core Libraries

- `next` - React framework
- `react` - UI library
- `react-dom` - React renderer for the web
- `next-themes` - Theme switching

### Authentication

- `@clerk/nextjs` - Authentication provider
- `@clerk/themes` - Theming for Clerk components

### Database & ORM

- `@prisma/client` - Prisma ORM
- `prisma` - Prisma CLI
- `neon` - PostgreSQL database

### AI & Machine Learning

- `@google/generative-ai` - Google Gemini AI API

### Form Handling & Validation

- `react-hook-form` - Form management
- `zod` - Schema validation
- `@hookform/resolvers` - Zod resolver for React Hook Form

### UI Components & Styling

- `shadcn-ui` - Custom UI components
- `@radix-ui/react-*` - Radix UI components
- `tailwindcss` - Utility-first CSS framework
- `tailwind-merge` - Utility class merging
- `tailwindcss-animate` - Tailwind animations

### Charts & Data Visualization

- `recharts` - Bar charts, line charts, etc.

### Date Management

- `date-fns` - Date formatting and manipulation

### Background Jobs

- `inngest` - Background job processing

### Other Utilities

- `clsx` - Conditional classnames
- `lucide-react` - Icons
- `react-spinners` - Loading indicators
- `sonner` - Notifications
- `html2pdf.js` - Convert HTML to PDF

## Useful Commands

### Run Inngest Dev Server

```sh
npx inngest-cli@latest dev
```

### Install Additional Packages

```sh
npm install <package-name>
```

## Contribution

Feel free to contribute by opening an issue or submitting a pull request.
