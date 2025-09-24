"use client"
import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColors } from "../store/themeStore"
import CustomAlert from "../components/CustomAlert"

export default function HelpScreen({ navigation }) {
  const [showBack, setShowBack] = useState(false)
  const c = useThemeColors()
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => setShowBack(true)}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Yardım & SSS</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={[styles.section, { color: c.primary }]}>Sıkça Sorulan Sorular</Text>
        <Text style={[styles.q, { color: c.text }]}>• Nasıl ilan oluşturabilirim?</Text>
        <Text style={[styles.a, { color: c.subtext }]}>Ana sayfadaki + butonuna tıklayarak kolayca ilan oluşturabilirsiniz.</Text>
        <Text style={[styles.q, { color: c.text }]}>• Destek almak için ne yapmalıyım?</Text>
        <Text style={[styles.a, { color: c.subtext }]}>Ayarlar Destek Ol menüsünden bize ulaşabilirsiniz.</Text>
        <Text style={[styles.q, { color: c.text }]}>• Profilimi nasıl düzenlerim?</Text>
        <Text style={[styles.a, { color: c.subtext }]}>Profil sekmesinden Profili Düzenle’ye tıklayabilirsiniz.</Text>
        <Text style={[styles.section, { color: c.primary, marginTop: 24 }]}>İpuçları</Text>
        <Text style={[styles.a, { color: c.subtext }]}>• Güvenli iletişim için uygulama içi mesajlaşmayı kullanın.</Text>
        <Text style={[styles.a, { color: c.subtext }]}>• Yardım istemekten çekinmeyin, topluluk destek için burada!</Text>
      </ScrollView>
      <CustomAlert
        visible={showBack}
        type="info"
        title="Geri Dön"
        message="Ana ekrana dönmek ister misiniz?"
        onClose={() => {
          setShowBack(false)
          navigation.goBack()
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, borderBottomWidth: 1 },
  title: { fontSize: 20, fontWeight: "bold" },
  section: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  q: { fontSize: 16, fontWeight: "600", marginTop: 12 },
  a: { fontSize: 15, marginLeft: 8, marginTop: 2 },
})