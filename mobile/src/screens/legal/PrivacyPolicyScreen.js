"use client"

import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Sizes, getFontSize, platformValues } from "../../utils/dimensions"
import { useThemeColors } from "../../store/themeStore"

export default function PrivacyPolicyScreen({ navigation }) {
  const c = useThemeColors()
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Gizlilik Politikası</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: Sizes.spacing.l }}>
        <Text style={[styles.p, { color: c.subtext }]}>
          Bu politika; hangi verileri topladığımızı, neden topladığımızı ve nasıl koruduğumuzu açıklar.
        </Text>

        <Text style={[styles.h2, { color: c.text }]}>Toplanan Veriler</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Kimlik bilgileri (ad, e-posta)</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Konum verisi (izin verdiğinizde)</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Kullanım analitiği ve cihaz bilgileri</Text>

        <Text style={[styles.h2, { color: c.text }]}>Kullanım Amaçları</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Güvenli iletişim ve eşleştirme</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Bildirim ve hesap yönetimi</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Hile ve kötüye kullanımı tespit</Text>

        <Text style={[styles.h2, { color: c.text }]}>Saklama ve Paylaşım</Text>
        <Text style={[styles.p, { color: c.subtext }]}>
          Veriler yalnızca hizmet sunumu için gerekli süre boyunca saklanır; yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz.
        </Text>
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