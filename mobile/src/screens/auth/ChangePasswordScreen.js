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

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { changePassword } = useAuth()

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

    const result = await changePassword(currentPassword, newPassword)

    setIsLoading(false)

    if (result.success) {
      Alert.alert("Başarılı", "Şifreniz başarıyla güncellendi.", [
        {
          text: "Tamam",
          onPress: () => navigation.goBack(),
        },
      ])
    } else {
      Alert.alert("Hata", result.error)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={styles.title}>Şifre Değiştir</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mevcut şifreniz"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              autoComplete="current-password"
            />
            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} style={styles.eyeIcon}>
              <Ionicons name={showCurrentPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Yeni şifreniz"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              autoComplete="new-password"
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
              <Ionicons name={showNewPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Yeni şifrenizi tekrar girin"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoComplete="new-password"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#666" />
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
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
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
  submitButton: {
    backgroundColor: "#10b981",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
