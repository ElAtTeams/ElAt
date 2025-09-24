"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../contexts/AuthContext"
import { Sizes, getFontSize, getSize, platformValues } from "../utils/dimensions"
import { useThemeColors } from "../store/themeStore"

export default function ProfileEditScreen({ navigation }) {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [location, setLocation] = useState(user?.location || "")
  const [bio, setBio] = useState(user?.bio || "")
  const [loading, setLoading] = useState(false)

  const colors = useThemeColors()

  const save = () => {
    let hasError = false
    if (!name.trim()) { setNameError(true); hasError = true }
    if (!location.trim()) { setLocationError(true); hasError = true }
    if (hasError) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      Alert.alert("Kaydedildi", "Profiliniz güncellendi.", [{ text: "Tamam", onPress: () => navigation.goBack() }])
    }, 1000)
  }

  const pickImage = () => {
    Alert.alert("Fotoğraf", "Fotoğraf değiştirme özelliği backend ile eklenecek.")
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profili Düzenle</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.avatarBtn} onPress={pickImage}>
            <Ionicons name="camera-outline" size={Sizes.icon.m} color="#10b981" />
            <Text style={styles.avatarBtnText}>Fotoğrafı Değiştir</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Ad Soyad</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Ad Soyad" />

        <Text style={styles.label}>Konum</Text>
        <TextInput value={location} onChangeText={setLocation} style={styles.input} placeholder="İl, İlçe" />

        <Text style={styles.label}>Hakkında</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          style={[styles.input, { height: getSize(100, 130), textAlignVertical: "top" }]}
          multiline
          placeholder="Kısaca kendinizden bahsedin"
        />

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={save} disabled={loading}>
          {loading
            ? <Ionicons name="reload" size={22} color="#fff" style={{ transform: [{ rotate: "90deg" }] }} />
            : <Text style={styles.saveText}>Kaydet</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.spacing.l,
    paddingTop: platformValues.statusBarHeight + Sizes.spacing.l,
    paddingBottom: Sizes.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  headerTitle: { fontSize: getFontSize(20, 22), fontWeight: "bold" },
  content: { padding: Sizes.spacing.l, gap: Sizes.spacing.l },
  avatarWrap: { alignItems: "center", marginBottom: Sizes.spacing.l },
  avatar: { width: getSize(120, 140), height: getSize(120, 140), borderRadius: getSize(120, 140) / 2, marginBottom: Sizes.spacing.s, borderWidth: 3, borderColor: "#10b981" },
  avatarBtn: { flexDirection: "row", alignItems: "center", gap: Sizes.spacing.xs, marginTop: 8 },
  avatarBtnText: { color: "#10b981", fontWeight: "700", fontSize: 15 },
  label: { fontSize: getFontSize(15, 17), color: "#666", marginBottom: 6, fontWeight: "600" },
  input: {
    height: Sizes.input.height,
    borderRadius: Sizes.borderRadius.l,
    borderWidth: 1.5,
    borderColor: "#e1e1e1",
    paddingHorizontal: Sizes.input.paddingH,
    backgroundColor: "#f8f9fa",
    fontSize: getFontSize(16, 18),
    color: "#1a1a1a",
    marginBottom: 10,
  },
  saveBtn: {
    marginTop: Sizes.spacing.l,
    backgroundColor: "#10b981",
    height: Sizes.button.height,
    borderRadius: Sizes.borderRadius.l,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  saveText: { color: "#fff", fontSize: getFontSize(17, 19), fontWeight: "700" },
})