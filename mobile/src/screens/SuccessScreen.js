"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColors } from "../store/themeStore"

export default function SuccessScreen({ navigation }) {
  const colors = useThemeColors()
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Ionicons name="checkmark-circle-outline" size={96} color={colors.primary} style={{ marginBottom: 24 }} />
      <Text style={[styles.title, { color: colors.text }]}>Tebrikler!</Text>
      <Text style={[styles.subtitle, { color: colors.subtext }]}>İlanınız başarıyla oluşturuldu.</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate("Home")}>
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Ana Sayfaya Dön</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 32, textAlign: "center" },
  button: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
})