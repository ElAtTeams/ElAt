"use client"
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColors } from "../../store/themeStore"

export default function SupportScreen({ navigation }) {
  const c = useThemeColors()
  const openMail = () => {
    const subject = encodeURIComponent("Destek Talebi")
    const body = encodeURIComponent("Merhaba,\n\nUygulamada yaşadığım sorun:\n\nCihaz/Platform bilgisi otomatik eklensin.")
    Linking.openURL(`mailto:support@example.com?subject=${subject}&body=${body}`)
  }
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Destek Ol</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ color: c.subtext, marginBottom: 4 }}>İletişime Geç</Text>

        <TouchableOpacity style={[styles.item, { backgroundColor: c.surface, borderColor: c.border }]} onPress={openMail}>
          <Ionicons name="mail-outline" size={20} color={c.primary} />
          <Text style={{ color: c.text, fontSize: 16, fontWeight: "600" }}>E-posta ile Sorun Bildir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { backgroundColor: c.surface, borderColor: c.border }]} onPress={() => Linking.openURL("https://wa.me/905551112233")}>
          <Ionicons name="logo-whatsapp" size={20} color={c.primary} />
          <Text style={{ color: c.text, fontSize: 16, fontWeight: "600" }}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.item, { backgroundColor: c.surface, borderColor: c.border }]} onPress={() => Linking.openURL("tel:+905551112233")}>
          <Ionicons name="call-outline" size={20} color={c.primary} />
          <Text style={{ color: c.text, fontSize: 16, fontWeight: "600" }}>Telefon</Text>
        </TouchableOpacity>

        <Text style={{ color: c.subtext, marginTop: 8 }}>Destekle</Text>
        <TouchableOpacity style={[styles.item, { backgroundColor: c.surface, borderColor: c.border }]} onPress={() => Linking.openURL("https://buymeacoffee.com/yourpage")}>
          <Ionicons name="cafe-outline" size={20} color={c.primary} />
          <Text style={{ color: c.text, fontSize: 16, fontWeight: "600" }}>Bağış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, borderBottomWidth: 1 },
  title: { fontSize: 18, fontWeight: "700" },
  item: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16, borderWidth: 1, borderRadius: 12 },
})