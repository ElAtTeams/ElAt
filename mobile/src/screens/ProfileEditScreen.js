"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../contexts/AuthContext"

export default function ProfileEditScreen({ navigation }) {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [location, setLocation] = useState(user?.location || "")
  const [bio, setBio] = useState(user?.bio || "")

  const save = () => {
    // API çağrısı yerine demo
    Alert.alert("Kaydedildi", "Profiliniz güncellendi.", [{ text: "Tamam", onPress: () => navigation.goBack() }])
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profili Düzenle</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Ad Soyad</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Ad Soyad" />

        <Text style={styles.label}>Konum</Text>
        <TextInput value={location} onChangeText={setLocation} style={styles.input} placeholder="İl, İlçe" />

        <Text style={styles.label}>Hakkında</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          multiline
          placeholder="Kısaca kendinizden bahsedin"
        />

        <TouchableOpacity style={styles.saveBtn} onPress={save}>
          <Text style={styles.saveText}>Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1a1a1a" },
  content: { padding: 20, gap: 12 },
  label: { fontSize: 14, color: "#666" },
  input: {
    height: 48, borderRadius: 12, borderWidth: 1, borderColor: "#e1e1e1", paddingHorizontal: 14, backgroundColor: "#fafafa",
    fontSize: 16, color: "#1a1a1a",
  },
  saveBtn: { marginTop: 8, backgroundColor: "#10b981", height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
})