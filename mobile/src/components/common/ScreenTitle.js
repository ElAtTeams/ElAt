import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sizes, getFontSize } from '../../utils/dimensions';
import { COLORS } from '../../constants';

export default function ScreenTitle({ title, subtitle, centered = true }) {
  return (
    <View style={[styles.container, centered && styles.centered]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.spacing.xl,
  },
  centered: {
    alignItems: 'center',
  },
  title: {
    fontSize: getFontSize(32),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: Sizes.spacing.s,
  },
  subtitle: {
    fontSize: getFontSize(16),
    color: COLORS.GRAY,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: Sizes.spacing.m,
  },
});