# Caly - Calorie Tracker App

A modern React Native (Expo) application for tracking calories, macronutrients, and physical activity.

## Features

- Dashboard with daily calorie tracking
- Macronutrient breakdown (carbs, protein, fat)
- Step tracking with distance, duration, and calories burned
- Daily meals log
- Light and dark theme support

## Tech Stack

- React Native (Expo)
- TypeScript
- NativeWind (Tailwind CSS for React Native)
- Expo Router for navigation
- Expo Vector Icons

## Project Structure

```
├── app/                  # Expo Router app directory
│   ├── _layout.tsx       # Root layout with navigation setup
│   └── index.tsx         # Dashboard screen
├── assets/               # Static assets (images, fonts)
├── components/           # Reusable components
│   ├── common/           # Common UI components
│   ├── dashboard/        # Dashboard-specific components
│   └── navigation/       # Navigation components
├── theme/                # Theme configuration
│   ├── ThemeContext.tsx  # Theme context provider
│   └── theme.ts          # Theme colors and styles
└── global.css            # Global CSS for NativeWind
```

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Theme Configuration

The app supports both light and dark themes. The theme configuration is centralized in the `theme` directory:

- `ThemeContext.tsx`: Provides theme context and toggle functionality
- `theme.ts`: Contains theme color definitions for both light and dark modes

Colors are defined in the `tailwind.config.js` file and can be easily modified.

## License

MIT
