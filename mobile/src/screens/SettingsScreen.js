"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Sizes, getFontSize, platformValues, getSize } from "../utils/dimensions"
import { useThemeStore, useThemeColors } from "../store/themeStore"

export default function SettingsScreen({ navigation }) {
  const colors = useThemeColors()
  const { mode, setMode } = useThemeStore()
  const [notif, setNotif] = useState(true)
  const [readReceipts, setReadReceipts] = useState(true)

  const ThemeOption = ({ value, label, icon }) => (
    <TouchableOpacity onPress={() => setMode(value)} style={[styles.rowLine(colors), mode === value && { backgroundColor: colors.muted }]}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={Sizes.icon.m} color={colors.primary} />
        <Text style={[styles.rowText(colors), { marginLeft: Sizes.spacing.s }]}>{label}</Text>
      </View>
      <View style={[styles.radioDot(colors), mode === value && { borderColor: colors.primary, backgroundColor: colors.primarySoft }]} />
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Ayarlar</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.subtext }]}>Hesap</Text>
        <TouchableOpacity style={styles.item(colors)} onPress={() => navigation.navigate("NotificationSettings")}>
          <Ionicons name="notifications-outline" size={20} color={colors.primary} />
          <Text style={styles.itemText(colors)}>Bildirim Ayarları</Text>
        </TouchableOpacity>
        <View style={styles.rowLine(colors)}>
          <Text style={styles.rowText(colors)}>Okundu bilgileri</Text>
          <Switch value={readReceipts} onValueChange={setReadReceipts} />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.subtext }]}>Görünüm</Text>
        <ThemeOption value="system" label="Sistem Varsayılan" icon="phone-portrait-outline" />
        <ThemeOption value="light" label="Açık Tema" icon="sunny-outline" />
        <ThemeOption value="dark" label="Koyu Tema" icon="moon-outline" />

        <Text style={[styles.sectionTitle, { color: colors.subtext }]}>Hukuk ve Gizlilik</Text>
        <TouchableOpacity style={styles.item(colors)} onPress={() => navigation.navigate("PrivacyPolicy")}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
          <Text style={styles.itemText(colors)}>Gizlilik Politikası</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item(colors)} onPress={() => navigation.navigate("Terms")}>
          <Ionicons name="document-text-outline" size={20} color={colors.primary} />
          <Text style={styles.itemText(colors)}>Kullanım Koşulları</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item(colors)} onPress={() => navigation.navigate("KVKK")}>
          <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
          <Text style={styles.itemText(colors)}>KVKK Aydınlatma Metni</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { color: colors.subtext }]}>Diğer</Text>
        <TouchableOpacity style={styles.item(colors)} onPress={() => navigation.navigate("Support")}>
          <Ionicons name="heart-outline" size={20} color={colors.primary} />
          <Text style={styles.itemText(colors)}>Destek Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logout(colors)}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={[styles.itemText(colors), { color: colors.danger }]}>Çıkış Yap</Text>
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
    borderBottomWidth: Sizes.borderWidth.thin,
  },
  headerTitle: { fontSize: getFontSize(18, 20), fontWeight: "bold" },
  content: { padding: Sizes.spacing.l, gap: Sizes.spacing.s },
  sectionTitle: { marginTop: Sizes.spacing.m, marginBottom: Sizes.spacing.xs, fontSize: getFontSize(14, 16), fontWeight: "600" },

  rowLeft: { flexDirection: "row", alignItems: "center" },
  rowLine: (c) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Sizes.spacing.m,
    borderBottomWidth: Sizes.borderWidth.thin,
    borderBottomColor: c.border,
  }),
  rowText: (c) => ({ fontSize: getFontSize(16, 18), color: c.text, fontWeight: "500" }),
  radioDot: (c) => ({
    width: getSize(18, 20),
    height: getSize(18, 20),
    borderRadius: 999,
    borderWidth: Sizes.borderWidth.default,
    borderColor: c.border,
  }),

  item: (c) => ({ flexDirection: "row", alignItems: "center", gap: Sizes.spacing.s, paddingVertical: Sizes.spacing.m }),
  itemText: (c) => ({ fontSize: getFontSize(16, 18), color: c.text }),
  logout: (c) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.spacing.s,
    paddingVertical: Sizes.spacing.l,
    marginTop: Sizes.spacing.s,
    borderTopWidth: Sizes.borderWidth.thin,
    borderTopColor: c.border,
  }),
})