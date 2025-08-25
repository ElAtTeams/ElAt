"use client"


import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useAppStore } from "../../store/useAppStore";

const { width } = Dimensions.get("window");
const logoUri = "https://img.icons8.com/fluency/96/leaf.png";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAppStore((s) => s.login);
  const handleRegister = () => login();

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoWrap}>
          <Image source={{ uri: logoUri }} style={styles.logo} />
        </View>
        <Text style={styles.headerTitle}>Hesap Oluştur</Text>
        <Text style={styles.subTitle}>Aramıza katılın, hemen başlayın.</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ad"
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Soyad"
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="E‑posta adresi"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Şifre"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Zaten hesabın var mı?{" "}
          <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
            Giriş Yap
          </Text>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 56,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    marginBottom: 18,
    width: width > 600 ? 500 : "100%",
    maxWidth: 500,
  },
  input: { flex: 1, fontSize: 18, color: "#1a1a1a" },
  registerButton: {
    backgroundColor: "#10b981",
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    width: width > 600 ? 500 : "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  registerButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  footerText: { textAlign: "center", marginTop: 24, color: "#666", fontSize: 16 },
  link: { color: "#10b981", fontWeight: "600", fontSize: 16 },
});
