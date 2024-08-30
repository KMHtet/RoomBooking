# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Step 3: Running Unit Test

```bash
# using npm
npm test

# OR using Yarn
yarn test
```

The project is structured as follows:

* `index.js` - The main entry point of the application.
* `android/` - The Android project of the application.
* `ios/` - The iOS project of the application.
* `src/` - The source code of the application.
* `src/index.tsx` - The main application entry point.
* `src/app/` - The application components.
* `src/app/components/` - The common components of application (it is used in many screens).
* `src/features/` - The features of application (it contained screens, its API, its test files, and its components).
* `src/navigations/` - The navigations of application (it contained root navigation and navigation helper).

The project visual structure is as follows:

```bash
.
├── android
├── ios
├── src
│   ├── app
│   │   ├── commons
│   │   │   ├── defines # Define the constants of application
│   │   │   └── ... # Other common utilities
│   │   ├── components # Define the common components of application
│   │   ├── features # Define the features of application
│   │   ├── navigation
│   │   │   ├── RootNavigation.tsx # The root navigation of application
│   │   │   ├── ScreenNavigation.tsx # Define the quick route to screen
│   │   │   └── ... # Other navigations configuration files
│   ├── asset
│   │   ├── images
│   ├── utils
│   ├── index.tsx # The main entry point of application
│   └── ... # Other files
├── index.js # The main entry point of application
├── package.json # The package.json of application
├── README.md # The README.md of application
└── ... # Other files
```
