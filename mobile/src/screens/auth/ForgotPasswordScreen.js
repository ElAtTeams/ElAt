import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Image, Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Sizes, getFontSize, isTablet, getSize } from "../../utils/dimensions";
import { COLORS } from "../../constants";
import authService from "../../services/authService";
import ThemedAlert from "../../components/common/ThemedAlert";

const { width } = Dimensions.get("window");

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alert, setAlert] = useState({ visible: false, type: 'info', title: '', message: '' });

  const showAlert = (type, title, message) => {
    setAlert({ visible: true, type, title, message });
  };

  const handleSubmit = async () => {
    if (!email) { 
      showAlert('error', 'Hata', 'Lütfen e‑posta adresinizi girin');
      return; 
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { 
      showAlert('error', 'Hata', 'Geçerli bir e‑posta adresi girin');
      return; 
    }

    setIsLoading(true);
    
    try {
      const result = await authService.forgotPassword(email);
      
      if (result.success) {
        setIsSubmitted(true);
        showAlert('success', 'Email Gönderildi!', 'Şifre sıfırlama kodu e-posta adresinize gönderildi.');
      } else {
        showAlert('error', 'Hata', result.error || 'Şifre sıfırlama kodu gönderilirken bir hata oluştu.');
      }
    } catch (error) {
      showAlert('error', 'Hata', 'Beklenmeyen bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsSubmitted(false);
    setAlert({ visible: false, type: 'info', title: '', message: '' });
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <View style={{ marginBottom: Sizes.spacing.l }}>
            <Ionicons name="mail" size={80} color={COLORS.PRIMARY} />
          </View>
          <Text style={styles.successTitle}>Kod Gönderildi!</Text>
          <Text style={styles.successText}>
            <Text style={styles.emailText}>{email}</Text> adresine 6 haneli doğrulama kodu gönderdik.
          </Text>
          <Text style={styles.instructionText}>
            E-postanızı kontrol edin ve kodu girdikten sonra yeni şifrenizi belirleyebilirsiniz.
          </Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.continueButton} 
              onPress={() => navigation.navigate("VerifyOTP", { email })}
            >
              <Text style={styles.continueButtonText}>Kodu Gir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
              <Text style={styles.resendButtonText}>Tekrar Gönder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.backButtonText}>Giriş Sayfasına Dön</Text>
            </TouchableOpacity>
          </View>
        </View>
        
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
      </View>
    );
  }

  const avatarSize = getSize(140, 180);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="key-outline" size={60} color={COLORS.PRIMARY} />
          </View>
        </View>
        
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={Sizes.icon.m} color="#1a1a1a" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Şifremi Unuttum</Text>
          <Text style={styles.subtitle}>
            E‑posta adresinizi girin, size 6 haneli doğrulama kodu gönderelim.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={Sizes.icon.m} color="#666" style={{ marginRight: Sizes.spacing.s }} />
            <TextInput
              style={styles.input}
              placeholder="E‑posta adresiniz"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, isLoading && styles.disabledButton]} 
            onPress={handleSubmit} 
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? "Gönderiliyor..." : "Doğrulama Kodu Gönder"}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Şifrenizi hatırladınız mı? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.linkText}>Giriş yapın</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.WHITE },
  scrollContainer: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: Sizes.spacing.xl },
  imageContainer: { width: "100%", alignItems: "center", marginBottom: Sizes.spacing.l },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.SECONDARY,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
  },
  backIcon: { alignSelf: "flex-start", marginBottom: Sizes.spacing.l, padding: Sizes.spacing.s },
  header: { alignItems: "center", marginBottom: Sizes.spacing.xl },
  title: { fontSize: getFontSize(28, 32), fontWeight: "bold", color: COLORS.BLACK, marginBottom: Sizes.spacing.s, textAlign: "center" },
  subtitle: { fontSize: getFontSize(16, 18), color: COLORS.GRAY, textAlign: "center", lineHeight: getSize(24, 28) },
  form: { width: "100%" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: Sizes.borderWidth.default,
    borderColor: "#e1e1e1",
    borderRadius: Sizes.borderRadius.l,
    marginBottom: Sizes.spacing.xl,
    paddingHorizontal: Sizes.input.paddingH,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  input: { flex: 1, height: Sizes.input.height, fontSize: getFontSize(16, 18), color: COLORS.BLACK },
  submitButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: Sizes.borderRadius.l,
    height: Sizes.button.height,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Sizes.spacing.xl,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: { color: COLORS.WHITE, fontSize: getFontSize(16, 18), fontWeight: "600" },
  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  footerText: { color: COLORS.GRAY, fontSize: getFontSize(14, 16) },
  linkText: { color: COLORS.PRIMARY, fontSize: getFontSize(14, 16), fontWeight: "600" },
  successContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: Sizes.spacing.l },
  successTitle: { fontSize: getFontSize(24, 28), fontWeight: "bold", color: COLORS.BLACK, marginBottom: Sizes.spacing.m, textAlign: "center" },
  successText: { fontSize: getFontSize(16, 18), color: COLORS.GRAY, textAlign: "center", lineHeight: getSize(24, 28), marginBottom: Sizes.spacing.m },
  emailText: { fontWeight: "600", color: COLORS.BLACK },
  instructionText: { fontSize: getFontSize(14, 16), color: COLORS.GRAY, textAlign: "center", lineHeight: getSize(20, 24), marginBottom: Sizes.spacing.xl },
  actionButtons: { width: "100%", gap: Sizes.spacing.s },
  continueButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: Sizes.borderRadius.l,
    paddingVertical: Sizes.spacing.m,
    paddingHorizontal: Sizes.button.paddingH,
    alignItems: "center",
  },
  continueButtonText: { color: COLORS.WHITE, fontSize: getFontSize(16, 18), fontWeight: "600" },
  resendButton: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: Sizes.borderWidth.default,
    borderColor: "#e1e1e1",
    borderRadius: Sizes.borderRadius.l,
    paddingVertical: Sizes.spacing.m,
    paddingHorizontal: Sizes.button.paddingH,
    alignItems: "center",
  },
  resendButtonText: { color: COLORS.BLACK, fontSize: getFontSize(16, 18), fontWeight: "500" },
  backButton: {
    backgroundColor: "transparent",
    borderRadius: Sizes.borderRadius.l,
    paddingVertical: Sizes.spacing.m,
    paddingHorizontal: Sizes.button.paddingH,
    alignItems: "center",
  },
  backButtonText: { color: COLORS.PRIMARY, fontSize: getFontSize(16, 18), fontWeight: "600" },
});
