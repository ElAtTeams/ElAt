import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from "../../constants";
import { Sizes, getFontSize } from "../../utils/dimensions";
import authService from "../../services/authService";
import ThemedAlert from "../../components/common/ThemedAlert";

export default function ResetPasswordScreen({ navigation, route }) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resetToken, setResetToken] = useState("")
  const [email, setEmail] = useState("")
  const [alert, setAlert] = useState({ visible: false, type: 'info', title: '', message: '' });

  useEffect(() => {
    // Get resetToken from route params
    if (route.params?.resetToken) {
      setResetToken(route.params.resetToken);
      setEmail(route.params?.email || '');
    } else {
      showAlert('error', 'Hata', 'Geçersiz sıfırlama bağlantısı');
      navigation.navigate("ForgotPassword");
    }
  }, [route.params])

  const showAlert = (type, title, message) => {
    setAlert({ visible: true, type, title, message });
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push('En az 6 karakter');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('En az bir küçük harf');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('En az bir büyük harf');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('En az bir rakam');
    }
    return errors;
  };

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      showAlert('error', 'Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('error', 'Hata', 'Şifreler eşleşmiyor');
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      showAlert('error', 'Şifre Gereksinimleri', `Şifreniz şu gereksinimleri karşılamalıdır:\n• ${passwordErrors.join('\n• ')}`);
      return;
    }

    if (!resetToken) {
      showAlert('error', 'Hata', 'Geçersiz sıfırlama bağlantısı');
      return;
    }

    setIsLoading(true)

    try {
      const result = await authService.resetPasswordWithToken(resetToken, password);

      if (result.success) {
        // Success screen'e yönlendir
        navigation.navigate('SuccessScreen', {
          title: 'Şifre Değiştirildi!',
          message: 'Şifreniz başarıyla güncellendi. Artık yeni şifrenizle giriş yapabilirsiniz.',
          buttonText: 'Giriş Yap',
          onButtonPress: () => {
            navigation.navigate('Login');
          }
        });
      } else {
        showAlert('error', 'Hata', result.error || 'Şifre güncellenirken bir hata oluştu');
      }
    } catch (error) {
      showAlert('error', 'Hata', 'Beklenmeyen bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  }

  const passwordStrength = password ? validatePassword(password) : [];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.BLACK} />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="shield-checkmark" size={60} color={COLORS.PRIMARY} />
            </View>
            <Text style={styles.title}>Yeni Şifre Oluştur</Text>
            <Text style={styles.subtitle}>
              {email ? `${email} hesabınız için` : 'Hesabınız için'} güvenli bir şifre belirleyin.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.GRAY} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Yeni şifreniz"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
                autoCorrect={false}
                editable={!isLoading}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.GRAY} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.GRAY} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Şifrenizi tekrar girin"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
                autoCorrect={false}
                editable={!isLoading}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.GRAY} />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordRequirements}>
              <Text style={styles.requirementsTitle}>Şifre gereksinimleri:</Text>
              <View style={styles.requirementsList}>
                <RequirementItem text="En az 6 karakter" met={password.length >= 6} />
                <RequirementItem text="Küçük harf" met={/(?=.*[a-z])/.test(password)} />
                <RequirementItem text="Büyük harf" met={/(?=.*[A-Z])/.test(password)} />
                <RequirementItem text="Rakam" met={/(?=.*\d)/.test(password)} />
              </View>
            </View>

            {password && confirmPassword && password !== confirmPassword && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={16} color={COLORS.ERROR} />
                <Text style={styles.errorText}>Şifreler eşleşmiyor</Text>
              </View>
            )}

            <TouchableOpacity 
              style={[
                styles.submitButton, 
                (isLoading || passwordStrength.length > 0 || password !== confirmPassword || !password) && styles.disabledButton
              ]} 
              onPress={handleSubmit} 
              disabled={isLoading || passwordStrength.length > 0 || password !== confirmPassword || !password}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? "Şifre Güncelleniyor..." : "Şifreyi Güncelle"}
              </Text>
            </TouchableOpacity>
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
  )
}

// Şifre gereksinimi item component'i
const RequirementItem = ({ text, met }) => (
  <View style={styles.requirementItem}>
    <Ionicons 
      name={met ? "checkmark-circle" : "ellipse-outline"} 
      size={16} 
      color={met ? COLORS.SUCCESS : COLORS.GRAY} 
    />
    <Text style={[styles.requirementText, met && styles.requirementMet]}>{text}</Text>
  </View>
);

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
    padding: Sizes.spacing.xl,
  },
  backIcon: {
    alignSelf: "flex-start",
    marginBottom: Sizes.spacing.l,
    padding: Sizes.spacing.s,
  },
  header: {
    alignItems: "center",
    marginBottom: Sizes.spacing.xl * 2,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Sizes.spacing.l,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  title: {
    fontSize: getFontSize(28),
    fontWeight: "bold",
    color: COLORS.BLACK,
    marginBottom: Sizes.spacing.s,
    textAlign: "center",
  },
  subtitle: {
    fontSize: getFontSize(16),
    color: COLORS.GRAY,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: Sizes.spacing.m,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    marginBottom: Sizes.spacing.m,
    paddingHorizontal: Sizes.spacing.m,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  inputIcon: {
    marginRight: Sizes.spacing.s,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: getFontSize(16),
    color: COLORS.BLACK,
  },
  eyeIcon: {
    padding: Sizes.spacing.xs,
  },
  passwordRequirements: {
    backgroundColor: COLORS.SECONDARY,
    padding: Sizes.spacing.m,
    borderRadius: 12,
    marginBottom: Sizes.spacing.l,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  requirementsTitle: {
    fontSize: getFontSize(14),
    fontWeight: "600",
    color: COLORS.BLACK,
    marginBottom: Sizes.spacing.s,
  },
  requirementsList: {
    gap: Sizes.spacing.xs,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.spacing.s,
  },
  requirementText: {
    fontSize: getFontSize(12),
    color: COLORS.GRAY,
  },
  requirementMet: {
    color: COLORS.SUCCESS,
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.spacing.m,
    paddingHorizontal: Sizes.spacing.s,
  },
  errorText: {
    fontSize: getFontSize(12),
    color: COLORS.ERROR,
    marginLeft: Sizes.spacing.xs,
  },
  submitButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
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
  submitButtonText: {
    color: COLORS.WHITE,
    fontSize: getFontSize(16),
    fontWeight: "600",
  },
})
