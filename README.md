# SnapEat - Food Recognition & Nutrition App

## Overview

SnapEat is a React Native mobile application built with Expo that allows users to identify food items through their camera, track nutritional information, discover new restaurants, and save favorite dishes. The app features a modern UI with support for both light and dark modes.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Features

- **Onboarding Experience**: Smooth introduction to the app's features
- **Food Recognition**: Scan food items to identify them and get nutritional information
- **Restaurant Discovery**: Find popular and nearby restaurants
- **Favorites System**: Save and organize favorite dishes and restaurants
- **User Profiles**: Personalized user experience with customizable settings
- **Dark Mode Support**: Full support for both light and dark themes
- **Responsive Design**: Works on various device sizes

## Tech Stack

- **React Native**: Core framework for building the mobile application
- **Expo**: Development platform for React Native
- **TypeScript**: Type-safe JavaScript for better development experience
- **NativeWind/Tailwind CSS**: Utility-first CSS framework for styling
- **Expo Router**: File-based routing for navigation
- **React Navigation**: Navigation library for React Native
- **Expo Vector Icons**: Icon library for the UI
- **React Native Reanimated**: Library for animations

## Project Structure

```
/
├── app/                    # Main application code
│   ├── (app)/              # Main app screens
│   │   ├── _layout.tsx     # Layout for main app screens with tab navigation
│   │   ├── index.tsx       # Home screen
│   │   ├── discover.tsx    # Discover screen
│   │   ├── scan.tsx        # Scan screen
│   │   ├── favorites.tsx   # Favorites screen
│   │   └── profile.tsx     # Profile screen
│   ├── (onboarding)/       # Onboarding screens
│   │   ├── _layout.tsx     # Layout for onboarding screens
│   │   ├── index.tsx       # First onboarding screen
│   │   ├── screen2.tsx     # Second onboarding screen
│   │   └── screen3.tsx     # Third onboarding screen
│   ├── _layout.tsx         # Root layout
│   ├── theme.ts            # Theme configuration
│   └── context/            # React context providers
│       └── ThemeContext.tsx # Theme context for light/dark mode
├── assets/                 # Static assets
│   ├── images/             # Image assets
│   └── fonts/              # Font assets
├── components/             # Reusable components
├── babel.config.js         # Babel configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── app.json                # Expo configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

This project uses [file-based routing](https://docs.expo.dev/router/introduction) with Expo Router.

## Customization

### Theming

The app uses a centralized theming system defined in `app/theme.ts`. You can modify colors, fonts, and other design tokens in this file.

### Styling

The app uses NativeWind (Tailwind CSS for React Native) for styling. You can customize the Tailwind configuration in `tailwind.config.js`.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
