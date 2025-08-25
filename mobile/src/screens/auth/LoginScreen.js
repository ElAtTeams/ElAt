import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image, Dimensions } from "react-native";
import { useAppStore } from "../../store/useAppStore";

const { width } = Dimensions.get("window");
const logoUri = "https://img.icons8.com/fluency/96/leaf.png";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const login = useAppStore((s) => s.login);

  const handleLogin = () => login(); // direkt giriş

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.logoWrap}>
          <Image source={{ uri: logoUri }} style={styles.logo} />
        </View>

        <Text style={styles.headerTitle}>Giriş Yap</Text>
        <Text style={styles.subTitle}>Hesabınıza giriş yapın ve devam edin.</Text>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="E‑posta adresi" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholderTextColor="#aaa" />
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} placeholderTextColor="#aaa" />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.toggleText}>{showPassword ? "Gizle" : "Göster"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setRememberMe(!rememberMe)}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>{rememberMe && <Text style={styles.checkboxTick}>✓</Text>}</View>
            <Text style={styles.checkboxText}>Beni hatırla</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>veya</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={handleLogin}>
          <Image source={{ uri: "https://img.icons8.com/color/48/google-logo.png" }} style={{ width: 22, height: 22, marginRight: 10 }} />
          <Text style={styles.googleButtonText}>Google ile devam et</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Hesabınız yok mu? <Text style={styles.link} onPress={() => navigation.navigate("Register")}>Kayıt Ol</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContainer: { padding: 32, justifyContent: "center", alignItems: "center" },
  logoWrap: { width: "100%", alignItems: "center", marginBottom: 16 },
  logo: { width: 80, height: 80, borderRadius: 20, backgroundColor: "#f0fdf4" },
  headerTitle: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 8, color: "#1a1a1a" },
  subTitle: { fontSize: 16, textAlign: "center", marginBottom: 24, color: "#666" },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 16, paddingHorizontal: 20, height: 56, borderWidth: 1, borderColor: "#e1e1e1", marginBottom: 18, width: width > 600 ? 500 : "100%", maxWidth: 500 },
  input: { flex: 1, fontSize: 18, color: "#1a1a1a" },
  toggleText: { color: "#10b981", fontWeight: "bold", fontSize: 16 },
  optionsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: width > 600 ? 500 : "100%", maxWidth: 500, marginBottom: 8 },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: { width: 20, height: 20, borderWidth: 2, borderColor: "#e1e1e1", borderRadius: 6, marginRight: 8, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  checkboxChecked: { backgroundColor: "#10b981", borderColor: "#10b981" },
  checkboxTick: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  checkboxText: { fontSize: 14, color: "#666" },
  forgotPasswordText: { fontSize: 14, color: "#10b981", fontWeight: "600" },
  loginButton: { backgroundColor: "#10b981", borderRadius: 16, height: 56, justifyContent: "center", alignItems: "center", marginTop: 8, width: width > 600 ? 500 : "100%", maxWidth: 500, alignSelf: "center" },
  loginButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 16, width: width > 600 ? 500 : "100%", maxWidth: 500 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#e1e1e1" },
  dividerText: { marginHorizontal: 12, color: "#666", fontSize: 14 },
  googleButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#e1e1e1", borderRadius: 16, height: 56, backgroundColor: "#fff", width: width > 600 ? 500 : "100%", maxWidth: 500 },
  googleButtonText: { fontSize: 16, color: "#1a1a1a", fontWeight: "500" },
  footerText: { textAlign: "center", marginTop: 24, color: "#666", fontSize: 16 },
  link: { color: "#10b981", fontWeight: "600", fontSize: 16 },
});
