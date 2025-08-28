"use client"
import React from "react"
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColors } from "../../store/themeStore"

export default function NotificationSettingsScreen({ navigation }) {
  const c = useThemeColors()
  const [push, setPush] = React.useState(true)
  const [messages, setMessages] = React.useState(true)
  const [mentions, setMentions] = React.useState(true)
  const [sound, setSound] = React.useState(true)
  const [vibrate, setVibrate] = React.useState(true)
  const [preview, setPreview] = React.useState(true)
  const [dnd, setDnd] = React.useState(false)

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Bildirim Ayarları</Text>
        <View style={{ width: 24 }} />
      </View>

      <Section title="Genel" color={c.subtext}>
        <Row label="Bildirimler" value={push} onChange={setPush} />
        <Row label="Mesaj Bildirimleri" value={messages} onChange={setMessages} />
        <Row label="Bahsetmeler" value={mentions} onChange={setMentions} />
      </Section>

      <Section title="Davranış" color={c.subtext}>
        <Row label="Ses" value={sound} onChange={setSound} />
        <Row label="Titreşim" value={vibrate} onChange={setVibrate} />
        <Row label="Önizleme (kilit ekranı)" value={preview} onChange={setPreview} />
      </Section>

      <Section title="Rahatsız Etmeyin" color={c.subtext}>
        <Row label="DND (Tümü kapalı)" value={dnd} onChange={setDnd} />
        <View style={[styles.note, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Ionicons name="moon-outline" size={18} color={c.subtext} />
          <Text style={{ color: c.subtext, marginLeft: 8, flex: 1 }}>
            DND açıkken bildirimler sessize alınır.
          </Text>
        </View>
      </Section>
    </View>
  )
}

function Section({ title, color, children }) {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
      <Text style={{ color, marginBottom: 8, fontWeight: "600" }}>{title}</Text>
      {children}
    </View>
  )
}

function Row({ label, value, onChange }) {
  const c = useThemeColors()
  return (
    <View style={[styles.row, { borderColor: c.border, backgroundColor: c.surface }]}>
      <Text style={{ color: c.text, fontSize: 16, flex: 1 }}>{label}</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, borderBottomWidth: 1 },
  title: { fontSize: 18, fontWeight: "700" },
  row: { height: 56, flexDirection: "row", alignItems: "center", paddingHorizontal: 12, borderWidth: 1, borderRadius: 12, marginBottom: 10 },
  note: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 8 },
})