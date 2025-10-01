import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Sizes, getFontSize } from '../../utils/dimensions';
import { COLORS, THEME } from '../../constants';

export default function AuthButton({ 
  title, 
  loading, 
  onPress, 
  variant = 'primary',
  size = 'large',
  disabled,
  icon,
  style
}) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${variant}`], styles[`button_${size}`]];
    if (disabled || loading) baseStyle.push(styles.buttonDisabled);
    if (style) baseStyle.push(style);
    return baseStyle;
  };

  const getTextStyle = () => {
    return [styles.buttonText, styles[`buttonText_${variant}`], styles[`buttonText_${size}`]];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={variant === 'primary' ? COLORS.WHITE : COLORS.PRIMARY} />
          <Text style={[getTextStyle(), { marginLeft: Sizes.spacing.s }]}>{title}...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          {icon && <Ionicons name={icon} size={Sizes.icon.s} color={variant === 'primary' ? COLORS.WHITE : COLORS.PRIMARY} />}
          <Text style={[getTextStyle(), icon && { marginLeft: Sizes.spacing.s }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Sizes.borderRadius.l,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.spacing.l,
  },
  button_primary: {
    backgroundColor: COLORS.PRIMARY,
    ...THEME.SHADOW.MEDIUM,
  },
  button_secondary: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.GRAY,
  },
  button_large: {
    height: Sizes.button.height,
    paddingHorizontal: Sizes.spacing.xl,
  },
  button_medium: {
    height: 48,
    paddingHorizontal: Sizes.spacing.l,
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
    shadowOpacity: 0.1,
  },
  buttonText: {
    fontWeight: '600',
  },
  buttonText_primary: {
    color: COLORS.WHITE,
  },
  buttonText_secondary: {
    color: COLORS.PRIMARY,
  },
  buttonText_outline: {
    color: COLORS.GRAY,
  },
  buttonText_large: {
    fontSize: getFontSize(18),
  },
  buttonText_medium: {
    fontSize: getFontSize(16),
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});