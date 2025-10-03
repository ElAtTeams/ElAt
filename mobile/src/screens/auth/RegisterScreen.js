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
import ThemedAlert from '../../components/common/ThemedAlert';
import { useForm } from '../../hooks/useForm';
import { VALIDATION_RULES } from '../../utils/validation';
import authService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { Sizes, getFontSize } from '../../utils/dimensions';
import { COLORS } from '../../constants';

export default function RegisterScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [alert, setAlert] = useState({ visible: false, type: 'info', title: '', message: '' });
  const { setAuthFromResponse } = useAuth();

  const {
    values,
    errors,
    setValue,
    validateForm,
  } = useForm(
    { 
      firstName: '', 
      lastName: '', 
      email: '', 
      password: '', 
      confirmPassword: '' 
    },
    {
      firstName: VALIDATION_RULES.firstName,
      lastName: VALIDATION_RULES.lastName,
      email: VALIDATION_RULES.email,
      password: VALIDATION_RULES.password,
      confirmPassword: VALIDATION_RULES.confirmPassword,
    }
  );

  const showAlert = (type, title, message) => {
    setAlert({ visible: true, type, title, message });
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setGeneralError('');

    try {
      const result = await authService.register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      
      if (result.success) {
        // Use AuthContext helper to persist and sync state
        const setResult = await setAuthFromResponse(result.data);
        setLoading(false);
        
        showAlert('success', 'Hoş Geldiniz! 🎉', `Merhaba ${values.firstName}! Hesabınız başarıyla oluşturuldu. Profilinizi tamamlayalım.`);
        
        // 3 saniye sonra yönlendir
        setTimeout(() => {
          setAlert({ ...alert, visible: false });
          navigation.navigate(setResult?.needsOnboarding ? 'Onboarding' : 'MainTabs');
        }, 3000);
      } else {
        setGeneralError(result.error);
        showAlert('error', 'Kayıt Başarısız', result.error || 'Hesap oluşturulurken bir hata oluştu.');
      }
    } catch (error) {
      setGeneralError('Beklenmeyen bir hata oluştu.');
      showAlert('error', 'Hata', 'Beklenmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
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
            title="Hesap Oluştur"
            subtitle="Aramıza katılın, komşularınızla bağlantı kurun."
          />

          {/* Form */}
          <View style={styles.formSection}>
            <ErrorMessage message={generalError} />
            
            {/* Name Fields - Side by side */}
            <View style={styles.nameRow}>
              <AuthInput
                icon="person-outline"
                placeholder="Ad"
                value={values.firstName}
                onChangeText={(text) => setValue('firstName', text)}
                error={errors.firstName}
                containerStyle={styles.nameInput}
              />
              <AuthInput
                icon="person-outline"
                placeholder="Soyad"
                value={values.lastName}
                onChangeText={(text) => setValue('lastName', text)}
                error={errors.lastName}
                containerStyle={styles.nameInput}
              />
            </View>

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
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.togglePassword}>
                    {showPassword ? 'Gizle' : 'Göster'}
                  </Text>
                </TouchableOpacity>
              }
            />

            <AuthInput
              icon="lock-closed-outline"
              placeholder="Şifre Tekrar"
              value={values.confirmPassword}
              onChangeText={(text) => setValue('confirmPassword', text)}
              secureTextEntry={!showConfirmPassword}
              error={errors.confirmPassword}
              rightIcon={
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Text style={styles.togglePassword}>
                    {showConfirmPassword ? 'Gizle' : 'Göster'}
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>

          {/* Register Button */}
          <AuthButton
            title="Hesap Oluştur"
            onPress={handleRegister}
            loading={loading}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Zaten hesabın var mı?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Login')}
              >
                Giriş Yap
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingOverlay visible={loading} />
      
      <ThemedAlert
        visible={alert.visible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, visible: false })}
        autoClose={alert.type === 'success'}
        autoCloseDelay={3000}
        buttons={alert.type !== 'success' ? [
          {
            text: 'Tamam',
            style: 'primary'
          }
        ] : []}
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
    paddingHorizontal: Sizes.spacing.l,
  },
  logoSection: {
    alignItems: 'center',
    marginVertical: Sizes.spacing.xl,
  },
  formSection: {
    marginBottom: Sizes.spacing.xl,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameInput: {
    flex: 1,
    marginHorizontal: Sizes.spacing.xs,
  },
  togglePassword: {
    color: COLORS.PRIMARY,
    fontSize: getFontSize(14),
    fontWeight: '500',
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