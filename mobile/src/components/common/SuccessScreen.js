import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { getFontSize, Sizes } from '../../utils/dimensions';

const SuccessScreen = ({ 
  title = 'Başarılı!',
  message = 'İşlem başarıyla tamamlandı.',
  buttonText = 'Devam Et',
  onButtonPress,
  navigation,
  route
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));
  const [checkmarkAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Parametreleri route'dan al
    const params = route?.params || {};
    
    // Animasyonları başlat
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(checkmarkAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleButtonPress = () => {
    const params = route?.params || {};
    if (params.onButtonPress) {
      params.onButtonPress();
    } else if (onButtonPress) {
      onButtonPress();
    } else {
      navigation?.goBack();
    }
  };

  // Route params'dan değerleri al
  const screenTitle = route?.params?.title || title;
  const screenMessage = route?.params?.message || message;
  const screenButtonText = route?.params?.buttonText || buttonText;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        {/* Success Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: checkmarkAnim }],
            }
          ]}
        >
          <View style={styles.iconBackground}>
            <Ionicons name="checkmark" size={60} color="white" />
          </View>
        </Animated.View>

        {/* Title */}
        <Text style={styles.title}>{screenTitle}</Text>

        {/* Message */}
        <Text style={styles.message}>{screenMessage}</Text>

        {/* Continue Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleButtonPress}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{screenButtonText}</Text>
          <Ionicons 
            name="arrow-forward" 
            size={20} 
            color="white" 
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Background decoration */}
      <View style={styles.decoration1} />
      <View style={styles.decoration2} />
      <View style={styles.decoration3} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing.xl,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    marginBottom: Sizes.spacing.xl,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.SUCCESS,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.SUCCESS,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: getFontSize(28),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: Sizes.spacing.m,
  },
  message: {
    fontSize: getFontSize(16),
    color: COLORS.GRAY,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Sizes.spacing.xl * 2,
    paddingHorizontal: Sizes.spacing.m,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: Sizes.spacing.m,
    paddingHorizontal: Sizes.spacing.xl,
    borderRadius: 25,
    minWidth: 200,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: getFontSize(16),
    fontWeight: '600',
    color: 'white',
    marginRight: Sizes.spacing.s,
  },
  buttonIcon: {
    marginLeft: Sizes.spacing.xs,
  },
  // Background decorations
  decoration1: {
    position: 'absolute',
    top: 100,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.PRIMARY,
    opacity: 0.1,
  },
  decoration2: {
    position: 'absolute',
    bottom: 150,
    left: 40,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.SUCCESS,
    opacity: 0.1,
  },
  decoration3: {
    position: 'absolute',
    top: 200,
    left: 50,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.WARNING,
    opacity: 0.1,
  },
});

export default SuccessScreen;