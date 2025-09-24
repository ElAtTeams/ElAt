"use client"

import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Sizes, getFontSize, platformValues } from "../../utils/dimensions"
import { useThemeColors } from "../../store/themeStore"

export default function KvkkScreen({ navigation }) {
  const c = useThemeColors()
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>KVKK Aydınlatma Metni</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: Sizes.spacing.l }}>
        <Text style={[styles.h2, { color: c.text }]}>Veri Sorumlusu</Text>
        <Text style={[styles.p, { color: c.subtext }]}>ElAt uygulamasının veri sorumlusu şirket/kurumunuzdur.</Text>

        <Text style={[styles.h2, { color: c.text }]}>İşlenen Kişisel Veriler ve Amaç</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Kimlik ve iletişim bilgileri — hesap yönetimi</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Konum — yakın çevre ilanlarını göstermek</Text>

        <Text style={[styles.h2, { color: c.text }]}>İlgili Kişinin Hakları</Text>
        <Text style={[styles.li, { color: c.subtext }]}>• Bilgi talep etme, silme, düzeltme ve itiraz</Text>
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