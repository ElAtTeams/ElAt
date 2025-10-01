import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Sizes, getFontSize } from '../../utils/dimensions';
import { COLORS } from '../../constants';

export default function AppLogo({ size = 'medium', showText = true }) {
  const logoSize = size === 'large' ? 100 : size === 'small' ? 60 : 80;
  const iconSize = size === 'large' ? Sizes.icon.xl + 10 : size === 'small' ? Sizes.icon.l : Sizes.icon.xl;
  
  return (
    <View style={styles.container}>
      <View style={[styles.logoCircle, { width: logoSize, height: logoSize, borderRadius: logoSize / 2 }]}>
        <Ionicons name="leaf" size={iconSize} color={COLORS.PRIMARY} />
      </View>
      {showText && <Text style={styles.appName}>ElAt</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoCircle: {
    backgroundColor: COLORS.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.spacing.m,
  },
  appName: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
});