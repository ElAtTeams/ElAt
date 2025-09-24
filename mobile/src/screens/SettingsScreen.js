"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Sizes, getFontSize, platformValues, getSize } from "../utils/dimensions"
import { useThemeStore, useThemeColors } from "../store/themeStore"
import CustomAlert from "../components/CustomAlert"
import { CommonActions } from "@react-navigation/native"
import { useAppStore } from "../store/useAppStore"

export default function SettingsScreen({ navigation }) {
  const colors = useThemeColors()
  const themeStore = useThemeStore()
  const currentTheme = themeStore?.theme ?? "system"
  const setTheme = themeStore?.setTheme ?? (() => {})

  const [readReceipts, setReadReceipts] = useState(true)
  const [showLogout, setShowLogout] = useState(false)
  const logout = useAppStore((s) => s.logout ?? (() => {}))

  const handleLogout = () => {
    setShowLogout(false)
    logout() // store güncellenecek, AppNavigator otomatik olarak auth stack'e dönecek
    // NOT: navigation.reset(...) kaldırıldı çünkü o anda Welcome route'u mevcut olmayabilir
  }

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
        <ThemeOption value="system" label="Sistem Varsayılan" icon="phone-portrait-outline" current={currentTheme} setTheme={setTheme} colors={colors} />
        <ThemeOption value="light" label="Açık Tema" icon="sunny-outline" current={currentTheme} setTheme={setTheme} colors={colors} />
        <ThemeOption value="dark" label="Koyu Tema" icon="moon-outline" current={currentTheme} setTheme={setTheme} colors={colors} />

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

        <Text style={[styles.sectionTitle, { color: colors.subtext }]}>Destek</Text>
        <TouchableOpacity style={styles.item(colors)} onPress={() => navigation.navigate("Support")}>
          <Ionicons name="heart-outline" size={20} color={colors.primary} />
          <Text style={styles.itemText(colors)}>Destek Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item(colors)} onPress={() => navigation.navigate("Help")}>
          <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
          <Text style={styles.itemText(colors)}>Yardım & SSS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item(colors)} onPress={() => navigation.navigate("Feedback")}>
          <Ionicons name="chatbox-ellipses-outline" size={20} color={colors.primary} />
          <Text style={styles.itemText(colors)}>Geri Bildirim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item(colors)} onPress={() => navigation.navigate("ReportIssue")}>
          <Ionicons name="warning-outline" size={20} color="#f59e0b" />
          <Text style={styles.itemText(colors)}>Sorun Bildir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logout(colors)} onPress={() => setShowLogout(true)}>
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={[styles.itemText(colors), { color: colors.danger }]}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>

      <CustomAlert
        visible={showLogout}
        type="warning"
        title="Çıkış Yap"
        message="Hesabınızdan çıkmak istediğinize emin misiniz?"
        onClose={handleLogout}
        onCancel={() => setShowLogout(false)}
        showCancel={true}
      />
    </View>
  )
}

/* Basit ThemeOption bileşeni - eksikse hata vermez */
function ThemeOption({ value, label, icon, current, setTheme, colors }) {
  const selected = current === value
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: Sizes.spacing.m,
        borderBottomWidth: Sizes.borderWidth.thin,
        borderBottomColor: colors.border,
      }}
      onPress={() => setTheme(value)}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: Sizes.spacing.s }}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={{ fontSize: getFontSize(16, 18), color: colors.text }}>{label}</Text>
      </View>
      <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" }}>
        {selected ? <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary }} /> : null}
      </View>
    </TouchableOpacity>
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