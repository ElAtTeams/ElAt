import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Sizes, getFontSize } from '../../utils/dimensions';
import { COLORS } from '../../constants';

export default function Header({ 
  title, 
  showBackButton = true, 
  onBackPress, 
  rightComponent,
  backgroundColor = COLORS.WHITE 
}) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={Sizes.icon.m} color={COLORS.BLACK} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.centerSection}>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      
      <View style={styles.rightSection}>
        {rightComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.spacing.l,
    paddingTop: 50,
    paddingBottom: Sizes.spacing.l,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: getFontSize(18),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
});