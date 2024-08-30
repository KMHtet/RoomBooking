import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { HeaderProps } from './Type';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../commons';
import { ImagesAsset } from '../../../assets';

export const HeaderView = (props: HeaderProps) => {
  const {
    isIconLeft,
    onPressIconLeft,
    isIconRight,
    onPressIconRight,
    title
  } = props;
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.rightContainer} onPress={onPressIconLeft}>
        {isIconLeft && (
          <Image source={ImagesAsset.back} style={styles.leftIcon} />
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.rightContainer} onPress={onPressIconRight}>
        {isIconRight && (
          <Image source={ImagesAsset.camera} style={styles.rightIcon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderView;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.black
  },
  rightIcon: {
    width: 30,
    height: 30
  },
  leftIcon: {
    width: 20,
    height: 20
  },
  rightContainer: {

  }
});
