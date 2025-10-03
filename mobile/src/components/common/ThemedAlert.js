import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants'; 
import { getFontSize, Sizes } from '../../utils/dimensions';

const { width } = Dimensions.get('window');

const ThemedAlert = ({ 
  visible, 
  onClose, 
  title, 
  message, 
  type = 'info', // 'success', 'error', 'warning', 'info'
  buttons = [],
  showCloseButton = true,
  autoClose = false,
  autoCloseDelay = 3000
}) => {
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [scaleAnim] = React.useState(new Animated.Value(0.5));

  React.useEffect(() => {
    if (visible) {
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
      ]).start();

      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);
        return () => clearTimeout(timer);
      }
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, autoClose, autoCloseDelay]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  const getAlertConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'checkmark-circle',
          iconColor: COLORS.SUCCESS,
          bgColor: '#f0fdf4',
          borderColor: COLORS.SUCCESS,
        };
      case 'error':
        return {
          icon: 'close-circle',
          iconColor: COLORS.ERROR,
          bgColor: '#fef2f2',
          borderColor: COLORS.ERROR,
        };
      case 'warning':
        return {
          icon: 'warning',
          iconColor: COLORS.WARNING,
          bgColor: '#fffbeb',
          borderColor: COLORS.WARNING,
        };
      default:
        return {
          icon: 'information-circle',
          iconColor: COLORS.PRIMARY,
          bgColor: '#f0fdfa',
          borderColor: COLORS.PRIMARY,
        };
    }
  };

  const config = getAlertConfig();

  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        <TouchableOpacity 
          style={StyleSheet.absoluteFill} 
          activeOpacity={1}
          onPress={handleClose}
        />
        
        <Animated.View
          style={[
            styles.alertContainer,
            {
              backgroundColor: config.bgColor,
              borderColor: config.borderColor,
              transform: [{ scale: scaleAnim }],
            }
          ]}
        >
          {/* Header with Icon */}
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: config.iconColor }]}>
              <Ionicons name={config.icon} size={24} color="white" />
            </View>
            
            {showCloseButton && (
              <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Ionicons name="close" size={20} color={COLORS.GRAY} />
              </TouchableOpacity>
            )}
          </View>

          {/* Content */}
          <View style={styles.content}>
            {title && (
              <Text style={[styles.title, { color: config.iconColor }]}>
                {title}
              </Text>
            )}
            
            {message && (
              <Text style={styles.message}>
                {message}
              </Text>
            )}
          </View>

          {/* Buttons */}
          {buttons.length > 0 && (
            <View style={styles.buttonContainer}>
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    button.style === 'primary' ? 
                      [styles.primaryButton, { backgroundColor: config.iconColor }] :
                      styles.secondaryButton,
                    buttons.length === 1 && styles.fullWidthButton
                  ]}
                  onPress={() => {
                    button.onPress?.();
                    if (button.autoClose !== false) {
                      handleClose();
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      button.style === 'primary' ? 
                        styles.primaryButtonText : 
                        [styles.secondaryButtonText, { color: config.iconColor }]
                    ]}
                  >
                    {button.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing.l,
  },
  alertContainer: {
    width: width * 0.85,
    maxWidth: 400,
    borderRadius: 16,
    borderWidth: 1,
    padding: Sizes.spacing.l,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Sizes.spacing.m,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: Sizes.spacing.xs,
  },
  content: {
    marginBottom: Sizes.spacing.l,
  },
  title: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    marginBottom: Sizes.spacing.s,
    textAlign: 'center',
  },
  message: {
    fontSize: getFontSize(14),
    color: COLORS.GRAY,
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Sizes.spacing.s,
  },
  button: {
    flex: 1,
    paddingVertical: Sizes.spacing.m,
    paddingHorizontal: Sizes.spacing.l,
    borderRadius: 8,
    alignItems: 'center',
  },
  fullWidthButton: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  buttonText: {
    fontSize: getFontSize(14),
    fontWeight: '600',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: COLORS.PRIMARY,
  },
});

export default ThemedAlert;