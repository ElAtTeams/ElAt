"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function SettingsScreen({ navigation }) {
  const [notif, setNotif] = useState(true)
  const [readReceipts, setReadReceipts] = useState(true)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayarlar</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Bildirimler</Text>
          <Switch value={notif} onValueChange={setNotif} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Okundu bilgiler</Text>
          <Switch value={readReceipts} onValueChange={setReadReceipts} />
        </View>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#10b981" />
          <Text style={styles.itemText}>Güvenlik ve Gizlilik</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.logout]}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={[styles.itemText, { color: "#ef4444" }]}>Çıkış Yap</Text>
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
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12 },
  label: { fontSize: 16, color: "#1a1a1a", fontWeight: "500" },
  item: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 12 },
  itemText: { fontSize: 16, color: "#1a1a1a" },
  logout: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 16, marginTop: 8, borderTopWidth: 1, borderTopColor: "#f1f1f1" },
})