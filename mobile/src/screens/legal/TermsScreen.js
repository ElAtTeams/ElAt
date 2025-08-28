"use client"

import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Sizes, getFontSize, platformValues } from "../../utils/dimensions"
import { useThemeColors } from "../../store/themeStore"

export default function TermsScreen({ navigation }) {
  const c = useThemeColors()
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Kullanım Koşulları</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: Sizes.spacing.l }}>
        <Text style={[styles.h2, { color: c.text }]}>Kabul ve Sorumluluk</Text>
        <Text style={[styles.p, { color: c.subtext }]}>Uygulamayı kullanarak topluluk kurallarını kabul etmiş olursunuz.</Text>

        <Text style={[styles.h2, { color: c.text }]}>Yasaklı Davranışlar</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Yanıltıcı ilan ve içerik</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Taciz, nefret söylemi ve spam</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Yasalara aykırı faaliyetler</Text>

        <Text style={[styles.h2, { color: c.text }]}>Hesap Sonlandırma</Text>
        <Text style={[styles.p, { color: c.subtext }]}>Kurallara aykırı kullanımda hesabınız uyarı olmadan sonlandırılabilir.</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: Sizes.spacing.l, paddingTop: platformValues.statusBarHeight + Sizes.spacing.l, paddingBottom: Sizes.spacing.m, borderBottomWidth: 1 },
  title: { fontSize: getFontSize(18, 20), fontWeight: "700" },
  h2: { marginTop: Sizes.spacing.l, marginBottom: Sizes.spacing.xs, fontSize: getFontSize(16, 18), fontWeight: "700" },
  p: { fontSize: getFontSize(14, 16), lineHeight: 22 },
  li: { fontSize: getFontSize(14, 16), lineHeight: 22, marginTop: Sizes.spacing.xs },
})