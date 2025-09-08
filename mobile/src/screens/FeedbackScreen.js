"use client"
import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColors } from "../store/themeStore"
import CustomAlert from "../components/CustomAlert"

export default function FeedbackScreen({ navigation }) {
  const [msg, setMsg] = useState("")
  const [sent, setSent] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const c = useThemeColors()
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Geri Bildirim</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ color: c.text, fontSize: 16, marginBottom: 12 }}>Her türlü görüş, öneri ve şikayetinizi bize iletebilirsiniz.</Text>
        <TextInput
          value={msg}
          onChangeText={setMsg}
          placeholder="Mesajınız..."
          placeholderTextColor={c.subtext}
          style={[styles.input, { color: c.text, backgroundColor: c.surface, borderColor: c.border }]}
          multiline
          numberOfLines={5}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: c.primary }]}
          onPress={() => {
            setSent(true)
            setTimeout(() => {
              setSent(false)
              setMsg("")
              setShowSuccess(true)
            }, 1200)
          }}
          disabled={!msg.trim() || sent}
        >
          <Ionicons name="send" size={20} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16, marginLeft: 8 }}>Gönder</Text>
        </TouchableOpacity>
        <CustomAlert
          visible={showSuccess}
          type="success"
          title="Teşekkürler!"
          message="Geri bildiriminiz alındı."
          onClose={() => {
            setShowSuccess(false)
            navigation.goBack()
          }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, borderBottomWidth: 1 },
  title: { fontSize: 20, fontWeight: "bold" },
  input: { borderWidth: 1, borderRadius: 12, padding: 14, fontSize: 16, minHeight: 100, marginBottom: 18 },
  button: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 12, paddingVertical: 14, marginTop: 8 },
})