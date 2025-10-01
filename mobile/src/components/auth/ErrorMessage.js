import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Sizes, getFontSize } from '../../utils/dimensions';
import { COLORS } from '../../constants';

export default function ErrorMessage({ message, centered = true, showIcon = true }) {
  if (!message) return null;
  
  return (
    <View style={[styles.container, centered && styles.centered]}>
      {showIcon && <Ionicons name="alert-circle-outline" size={Sizes.icon.s} color={COLORS.ERROR} />}
      <Text style={[styles.error, showIcon && styles.errorWithIcon]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.spacing.s,
    paddingHorizontal: Sizes.spacing.s,
  },
  centered: {
    justifyContent: 'center',
  },
  error: {
    color: COLORS.ERROR,
    fontSize: getFontSize(14),
    flex: 1,
  },
  errorWithIcon: {
    marginLeft: Sizes.spacing.xs,
  },
});