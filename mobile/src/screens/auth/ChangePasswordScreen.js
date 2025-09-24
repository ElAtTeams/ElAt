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
import { Sizes, getFontSize } from "../../utils/dimensions"

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun")
      return
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Hata", "Yeni şifreler eşleşmiyor")
      return
    }
    if (newPassword.length < 6) {
      Alert.alert("Hata", "Yeni şifre en az 6 karakter olmalıdır")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      Alert.alert("Başarılı", "Şifreniz güncellendi.", [
        { text: "Tamam", onPress: () => navigation.goBack() },
      ])
    }, 800)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={Sizes.icon.l} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={styles.title}>Şifre Değiştir</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={Sizes.icon.m} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mevcut şifreniz"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              autoComplete="current-password"
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} style={styles.eyeIcon}>
              <Ionicons name={showCurrentPassword ? "eye-outline" : "eye-off-outline"} size={Sizes.icon.m} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={Sizes.icon.m} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Yeni şifreniz"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              autoComplete="new-password"
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
              <Ionicons name={showNewPassword ? "eye-outline" : "eye-off-outline"} size={Sizes.icon.m} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={Sizes.icon.m} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Yeni şifrenizi tekrar girin"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoComplete="new-password"
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={Sizes.icon.m} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
            <Text style={styles.submitButtonText}>{isLoading ? "Güncelleniyor..." : "Şifreyi Güncelle"}</Text>
          </TouchableOpacity>
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
    padding: Sizes.spacing.l,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Sizes.spacing.xl,
  },
  backButton: {
    marginRight: Sizes.spacing.m,
    padding: Sizes.spacing.xs,
  },
  title: {
    fontSize: getFontSize(24, 30),
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: Sizes.borderWidth.default,
    borderColor: "#e1e1e1",
    borderRadius: Sizes.borderRadius.l,
    marginBottom: Sizes.spacing.m,
    paddingHorizontal: Sizes.input.paddingH,
    backgroundColor: "#f8f9fa",
  },
  inputIcon: {
    marginRight: Sizes.spacing.s,
  },
  input: {
    flex: 1,
    height: Sizes.input.height,
    fontSize: getFontSize(16, 18),
    color: "#1a1a1a",
  },
  eyeIcon: {
    padding: Sizes.spacing.xs,
  },
  submitButton: {
    backgroundColor: "#10b981",
    borderRadius: Sizes.borderRadius.l,
    height: Sizes.button.height,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Sizes.spacing.m,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: getFontSize(16, 18),
    fontWeight: "600",
  },
})
