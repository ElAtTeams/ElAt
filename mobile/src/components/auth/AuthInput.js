import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Sizes, getFontSize } from '../../utils/dimensions';
import { COLORS } from '../../constants';

export default function AuthInput({ 
  icon, 
  rightIcon, 
  error, 
  label,
  containerStyle,
  ...props 
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <Ionicons name={icon} size={Sizes.icon.s} color={error ? COLORS.ERROR : COLORS.GRAY} />
        <TextInput 
          style={styles.input} 
          placeholderTextColor={COLORS.GRAY} 
          {...props} 
        />
        {rightIcon && rightIcon}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.spacing.m,
  },
  label: {
    fontSize: getFontSize(14),
    fontWeight: '500',
    color: COLORS.BLACK,
    marginBottom: Sizes.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: Sizes.borderRadius.l,
    paddingHorizontal: Sizes.spacing.m,
    height: Sizes.input.height,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: COLORS.ERROR,
    backgroundColor: '#fef2f2',
  },
  input: {
    flex: 1,
    fontSize: getFontSize(16),
    color: COLORS.BLACK,
    marginLeft: Sizes.spacing.s,
  },
  errorText: {
    fontSize: getFontSize(12),
    color: COLORS.ERROR,
    marginTop: Sizes.spacing.xs,
  },
});