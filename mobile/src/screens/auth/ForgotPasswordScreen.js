"use client";

import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, KeyboardAvoidingView, Platform, ScrollView, Image, Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Sizes, getFontSize, isTablet, getSize } from "../../utils/dimensions";

const { width } = Dimensions.get("window");

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email) { Alert.alert("Hata", "Lütfen e‑posta adresinizi girin"); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { Alert.alert("Hata", "Geçerli bir e‑posta adresi girin"); return; }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true); // demo
    }, 800);
  };

  const handleResend = () => setIsSubmitted(false);

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <View style={{ marginBottom: Sizes.spacing.large }}>
            <Ionicons name="checkmark-circle" size={80} color="#10b981" />
          </View>
          <Text style={styles.successTitle}>E‑posta Gönderildi!</Text>
          <Text style={styles.successText}>
            <Text style={styles.emailText}>{email}</Text> adresine şifre sıfırlama bağlantısı gönderdik.
          </Text>
          <Text style={styles.instructionText}>E‑postanızı kontrol edip bağlantıya tıklayın.</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
              <Text style={styles.resendButtonText}>Tekrar Gönder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
              <Text style={styles.backButtonText}>Giriş Sayfasına Dön</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const avatarSize = getSize(140, 180);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80" }}
            style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2, backgroundColor: "#f0fdf4" }}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={Sizes.icon.m} color="#1a1a1a" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Şifremi Unuttum</Text>
          <Text style={styles.subtitle}>E‑posta adresinizi girin, size şifırlama bağlantısı gönderelim.</Text>
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
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
            <Text style={styles.submitButtonText}>{isLoading ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Şifrenizi hatırladınız mı? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.linkText}>Giriş yapın</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: Sizes.spacing.xl },
  imageContainer: { width: "100%", alignItems: "center", marginBottom: Sizes.spacing.l },
  backIcon: { alignSelf: "flex-start", marginBottom: Sizes.spacing.l, padding: Sizes.spacing.s },
  header: { alignItems: "center", marginBottom: Sizes.spacing.xl },
  title: { fontSize: getFontSize(28, 32), fontWeight: "bold", color: "#1a1a1a", marginBottom: Sizes.spacing.s, textAlign: "center" },
  subtitle: { fontSize: getFontSize(16, 18), color: "#666", textAlign: "center", lineHeight: getSize(24, 28) },
  form: { width: "100%" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: Sizes.borderWidth.default,
    borderColor: "#e1e1e1",
    borderRadius: Sizes.borderRadius.l,
    marginBottom: Sizes.spacing.xl,
    paddingHorizontal: Sizes.input.paddingH,
    backgroundColor: "#f8f9fa",
  },
  input: { flex: 1, height: Sizes.input.height, fontSize: getFontSize(16, 18), color: "#1a1a1a" },
  submitButton: {
    backgroundColor: "#10b981",
    borderRadius: Sizes.borderRadius.l,
    height: Sizes.button.height,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Sizes.spacing.xl,
  },
  submitButtonText: { color: "#fff", fontSize: getFontSize(16, 18), fontWeight: "600" },
  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  footerText: { color: "#666", fontSize: getFontSize(14, 16) },
  linkText: { color: "#10b981", fontSize: getFontSize(14, 16), fontWeight: "600" },
  successContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: Sizes.spacing.l },
  successTitle: { fontSize: getFontSize(24, 28), fontWeight: "bold", color: "#1a1a1a", marginBottom: Sizes.spacing.m, textAlign: "center" },
  successText: { fontSize: getFontSize(16, 18), color: "#666", textAlign: "center", lineHeight: getSize(24, 28), marginBottom: Sizes.spacing.m },
  emailText: { fontWeight: "600", color: "#1a1a1a" },
  instructionText: { fontSize: getFontSize(14, 16), color: "#666", textAlign: "center", lineHeight: getSize(20, 24), marginBottom: Sizes.spacing.xl },
  actionButtons: { width: "100%", gap: Sizes.spacing.s },
  resendButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: Sizes.borderWidth.default,
    borderColor: "#e1e1e1",
    borderRadius: Sizes.borderRadius.l,
    paddingVertical: Sizes.spacing.m,
    paddingHorizontal: Sizes.button.paddingH,
    alignItems: "center",
  },
  resendButtonText: { color: "#1a1a1a", fontSize: getFontSize(16, 18), fontWeight: "500" },
  backButton: {
    backgroundColor: "#10b981",
    borderRadius: Sizes.borderRadius.l,
    paddingVertical: Sizes.spacing.m,
    paddingHorizontal: Sizes.button.paddingH,
    alignItems: "center",
  },
  backButtonText: { color: "#fff", fontSize: getFontSize(16, 18), fontWeight: "600" },
});
