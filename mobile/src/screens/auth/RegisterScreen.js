"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../../contexts/AuthContext"

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, signInWithGoogle, loading } = useAuth()

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun")
      return
    }

    if (firstName.length < 2 || lastName.length < 2) {
      Alert.alert("Hata", "Ad ve soyad en az 2 karakter olmalıdır")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Hata", "Şifreler eşleşmiyor")
      return
    }

    if (password.length < 6) {
      Alert.alert("Hata", "Şifre en az 6 karakter olmalıdır")
      return
    }

    const result = await register(firstName, lastName, email, password)
    if (!result.success) {
      Alert.alert("Kayıt Hatası", result.error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      Alert.alert("Hata", "Google ile kayıt olunamadı")
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Ionicons name="heart" size={24} color="#fff" />
            </View>
            <Text style={styles.logoText}>YanKapı</Text>
          </View>
          <Text style={styles.title}>Hesap Oluşturun</Text>
          <Text style={styles.subtitle}>Komşularınızla bağlantı kurun</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ad"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                autoComplete="given-name"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Soyad"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                autoComplete="family-name"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-posta adresiniz"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Şifreniz (min. 6 karakter)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="new-password"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Şifrenizi tekrar girin"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoComplete="new-password"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
            <Text style={styles.registerButtonText}>{loading ? "Kayıt oluşturuluyor..." : "Hesap Oluştur"}</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>veya</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn} disabled={loading}>
            <Ionicons name="logo-google" size={20} color="#4285F4" />
            <Text style={styles.googleButtonText}>Google ile Kayıt Ol</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Zaten hesabınız var mı? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.linkText}>Giriş Yapın</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: "#10b981",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#1a1a1a",
  },
  eyeIcon: {
    padding: 4,
  },
  registerButton: {
    backgroundColor: "#10b981",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e1e1e1",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#666",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    height: 50,
    backgroundColor: "#fff",
  },
  googleButtonText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  linkText: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "600",
  },
})
