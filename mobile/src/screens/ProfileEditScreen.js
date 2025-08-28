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

  const colors = useThemeColors()

  const save = () => {
    // API çağrısı yerine demo
    Alert.alert("Kaydedildi", "Profiliniz güncellendi.", [{ text: "Tamam", onPress: () => navigation.goBack() }])
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
          <TouchableOpacity style={styles.avatarBtn}>
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

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={save}>
          <Text style={styles.saveText}>Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.spacing.l,
    paddingTop: platformValues.statusBarHeight + Sizes.spacing.l,
    paddingBottom: Sizes.spacing.m,
  },
  headerTitle: { fontSize: getFontSize(18, 20), fontWeight: "bold", color: "#1a1a1a" },
  content: { padding: Sizes.spacing.l, gap: Sizes.spacing.s },
  avatarWrap: { alignItems: "center", marginBottom: Sizes.spacing.m },
  avatar: { width: getSize(100, 120), height: getSize(100, 120), borderRadius: getSize(100, 120) / 2, marginBottom: Sizes.spacing.s },
  avatarBtn: { flexDirection: "row", alignItems: "center", gap: Sizes.spacing.xs },
  avatarBtnText: { color: "#10b981", fontWeight: "600" },
  label: { fontSize: getFontSize(14, 16), color: "#666" },
  input: {
    height: Sizes.input.height,
    borderRadius: Sizes.borderRadius.l,
    borderWidth: Sizes.borderWidth.default,
    borderColor: "#e1e1e1",
    paddingHorizontal: Sizes.input.paddingH,
    backgroundColor: "#fafafa",
    fontSize: getFontSize(16, 18),
    color: "#1a1a1a",
  },
  saveBtn: {
    marginTop: Sizes.spacing.s,
    backgroundColor: "#10b981",
    height: Sizes.button.height,
    borderRadius: Sizes.borderRadius.l,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: { color: "#fff", fontSize: getFontSize(16, 18), fontWeight: "600" },
})