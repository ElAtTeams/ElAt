import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/common/Header';
import AppLogo from '../../components/common/AppLogo';
import ScreenTitle from '../../components/common/ScreenTitle';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import ErrorMessage from '../../components/auth/ErrorMessage';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import { useForm } from '../../hooks/useForm';
import { VALIDATION_RULES } from '../../utils/validation';
import authService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { Sizes, getFontSize } from '../../utils/dimensions';
import { COLORS } from '../../constants';

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const { setAuthFromResponse } = useAuth();

  const {
    values,
    errors,
    setValue,
    validateForm,
  } = useForm(
    { email: '', password: '' },
    {
      email: VALIDATION_RULES.email,
      password: [VALIDATION_RULES.password[0]], // Sadece required kuralı
    }
  );

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setGeneralError('');

    try {
      const result = await authService.login(values);
      
      if (result.success) {
        // Persist and sync via AuthContext helper
        const setResult = await setAuthFromResponse(result.data);
        setLoading(false);
        Alert.alert('Başarılı', 'Giriş başarılı!', [
          { 
            text: 'Tamam', 
            onPress: () => navigation.navigate(setResult?.needsOnboarding ? 'Onboarding' : 'MainTabs') 
          }
        ]);
      } else {
        setGeneralError(result.error);
      }
    } catch (error) {
      setGeneralError('Beklenmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        showBackButton={true} 
        onBackPress={() => navigation.goBack()} 
      />
      
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoSection}>
            <AppLogo size="medium" />
          </View>

          {/* Title */}
          <ScreenTitle
            title="Hoş Geldin"
            subtitle="Hesabına giriş yap, komşularınla bağlantı kur."
          />

          {/* Form */}
          <View style={styles.formSection}>
            <ErrorMessage message={generalError} />
            
            <AuthInput
              icon="mail-outline"
              placeholder="E-posta adresi"
              value={values.email}
              onChangeText={(text) => setValue('email', text)}
              autoCapitalize="none"
              keyboardType="email-address"
              error={errors.email}
            />

            <AuthInput
              icon="lock-closed-outline"
              placeholder="Şifre"
              value={values.password}
              onChangeText={(text) => setValue('password', text)}
              secureTextEntry={!showPassword}
              error={errors.password}
              rightIcon={
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Text style={styles.togglePassword}>
                    {showPassword ? 'Gizle' : 'Göster'}
                  </Text>
                </TouchableOpacity>
              }
            />

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <AuthButton
            title="Giriş Yap"
            onPress={handleLogin}
            loading={loading}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>veya</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <View style={styles.socialSection}>
            <AuthButton
              title="Google ile Giriş"
              variant="secondary"
              icon="logo-google"
              onPress={() => {/* Google login */}}
            />
            
            <AuthButton
              title="Apple ile Giriş"
              variant="outline"
              icon="logo-apple"
              onPress={() => {/* Apple login */}}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Hesabın yok mu?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Register')}
              >
                Kayıt Ol
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingOverlay visible={loading} />
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
    paddingHorizontal: Sizes.spacing.l,
  },
  logoSection: {
    alignItems: 'center',
    marginVertical: Sizes.spacing.xl,
  },
  formSection: {
    marginBottom: Sizes.spacing.xl,
  },
  togglePassword: {
    color: COLORS.PRIMARY,
    fontSize: getFontSize(14),
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: Sizes.spacing.s,
  },
  forgotPasswordText: {
    color: COLORS.PRIMARY,
    fontSize: getFontSize(14),
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Sizes.spacing.l,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: Sizes.spacing.m,
    color: COLORS.GRAY,
    fontSize: getFontSize(14),
  },
  socialSection: {
    marginBottom: Sizes.spacing.xl,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: Sizes.spacing.xl,
  },
  footerText: {
    fontSize: getFontSize(16),
    color: COLORS.GRAY,
  },
  link: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
});