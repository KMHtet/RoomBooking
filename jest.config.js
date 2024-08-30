module.exports = {
  preset: 'react-native',
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  moduleNameMapper: {
    'react-native-webview': '<rootDir>/__mocks__/react-native-webview.js',
    'react-native-vision-camera': '<rootDir>/__mocks__/react-native-vision-camera.js',
    'VisionCamera': '<rootDir>/__mocks__/VisionCamera.js', 
  },
};
