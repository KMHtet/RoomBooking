import React from 'react';
import { View } from 'react-native';

const WebView = (props) => {
  const { testID } = props;
  return <View testID={testID} />;
};

export { WebView };
