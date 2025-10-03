import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import { Sizes, getFontSize } from '../../utils/dimensions';
import authService from '../../services/authService';
import ThemedAlert from '../../components/common/ThemedAlert';

const { width } = Dimensions.get('window');

export default function VerifyOTPScreen({ navigation, route }) {
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 dakika
  const [canResend, setCanResend] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: 'info', title: '', message: '' });
  
  const { email } = route.params;
  const inputs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showAlert = (type, title, message) => {
    setAlert({ visible: true, type, title, message });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Otomatik olarak sonraki inputa geç
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const code = otpCode.join('');
    
    if (code.length !== 6) {
      showAlert('error', 'Hata', 'Lütfen 6 haneli kodu tam olarak girin.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.verifyOTP(email, code);
      
      if (result.success) {
        // Reset token'ı al ve ResetPasswordScreen'e gönder
        const resetToken = result.data.resetToken;
        
        navigation.navigate('ResetPassword', { 
          resetToken,
          email 
        });
      } else {
        showAlert('error', 'Hata', result.error || 'OTP doğrulama başarısız.');
        // Hatalı kod durumunda inputları temizle
        setOtpCode(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
      }
    } catch (error) {
      showAlert('error', 'Hata', 'Beklenmeyen bir hata oluştu.');
      setOtpCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setIsLoading(true);
    
    try {
      const result = await authService.forgotPassword(email);
      
      if (result.success) {
        showAlert('success', 'Kod Gönderildi', 'Yeni doğrulama kodu e-posta adresinize gönderildi.');
        setTimer(300);
        setCanResend(false);
        setOtpCode(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
      } else {
        showAlert('error', 'Hata', result.error || 'Kod tekrar gönderilemedi.');
      }
    } catch (error) {
      showAlert('error', 'Hata', 'Beklenmeyen bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.BLACK} />
          </TouchableOpacity>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="mail-open" size={50} color={COLORS.PRIMARY} />
            </View>
          </View>

          {/* Header Text */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Doğrulama Kodu</Text>
            <Text style={styles.subtitle}>
              <Text style={styles.emailText}>{email}</Text> adresine gönderilen 6 haneli kodu girin.
            </Text>
          </View>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            {otpCode.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputFilled : null,
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
                editable={!isLoading}
              />
            ))}
          </View>

          {/* Timer and Resend */}
          <View style={styles.timerContainer}>
            {!canResend ? (
              <Text style={styles.timerText}>
                Yeni kod isteyebilmek için: {formatTime(timer)}
              </Text>
            ) : (
              <TouchableOpacity 
                style={styles.resendButton}
                onPress={handleResendOTP}
                disabled={isLoading}
              >
                <Text style={styles.resendButtonText}>Kodu Tekrar Gönder</Text>
                <Ionicons name="refresh" size={16} color={COLORS.PRIMARY} />
              </TouchableOpacity>
            )}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={[
              styles.verifyButton,
              (isLoading || otpCode.join('').length !== 6) && styles.disabledButton
            ]}
            onPress={handleVerifyOTP}
            disabled={isLoading || otpCode.join('').length !== 6}
          >
            <Text style={styles.verifyButtonText}>
              {isLoading ? 'Doğrulanıyor...' : 'Kodu Doğrula'}
            </Text>
          </TouchableOpacity>

          {/* Help Text */}
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Kod gelmedi mi? Spam klasörünüzü kontrol edin.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ThemedAlert
        visible={alert.visible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, visible: false })}
        buttons={[
          {
            text: 'Tamam',
            style: 'primary'
          }
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: Sizes.spacing.xl,
    paddingVertical: Sizes.spacing.l,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: Sizes.spacing.s,
    marginBottom: Sizes.spacing.l,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: Sizes.spacing.xl,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  headerTextContainer: {
    alignItems: 'center',
    marginBottom: Sizes.spacing.xl * 2,
  },
  title: {
    fontSize: getFontSize(28),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: Sizes.spacing.s,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: getFontSize(16),
    color: COLORS.GRAY,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Sizes.spacing.m,
  },
  emailText: {
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Sizes.spacing.xl,
    paddingHorizontal: Sizes.spacing.m,
  },
  otpInput: {
    width: (width - (Sizes.spacing.xl * 2) - (Sizes.spacing.m * 2)) / 6 - 8,
    height: 55,
    borderWidth: 2,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: getFontSize(20),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  otpInputFilled: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.SECONDARY,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: Sizes.spacing.xl,
  },
  timerText: {
    fontSize: getFontSize(14),
    color: COLORS.GRAY,
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Sizes.spacing.s,
    paddingHorizontal: Sizes.spacing.m,
  },
  resendButtonText: {
    fontSize: getFontSize(14),
    color: COLORS.PRIMARY,
    fontWeight: '600',
    marginRight: Sizes.spacing.xs,
  },
  verifyButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.spacing.l,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },
  verifyButtonText: {
    fontSize: getFontSize(16),
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  helpContainer: {
    alignItems: 'center',
    paddingTop: Sizes.spacing.m,
  },
  helpText: {
    fontSize: getFontSize(12),
    color: COLORS.GRAY,
    textAlign: 'center',
    lineHeight: 18,
  },
});