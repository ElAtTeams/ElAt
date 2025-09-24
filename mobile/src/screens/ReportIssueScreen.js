"use client"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColors } from "../store/themeStore"
import { Sizes, getFontSize, platformValues } from "../utils/dimensions"
import CustomAlert from "../components/CustomAlert"

const issueTypes = [
  { id: "bug", label: "Uygulama Hatası", icon: "bug-outline" },
  { id: "user", label: "Kullanıcı Şikayeti", icon: "person-remove-outline" },
  { id: "content", label: "Uygunsuz İçerik", icon: "shield-outline" },
  { id: "payment", label: "Ödeme Sorunu", icon: "card-outline" },
  { id: "performance", label: "Performans Sorunu", icon: "speedometer-outline" },
  { id: "other", label: "Diğer", icon: "ellipsis-horizontal-outline" },
]

export default function ReportIssueScreen({ navigation }) {
  const colors = useThemeColors()
  const [selectedType, setSelectedType] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = () => {
    if (!selectedType || !description.trim()) {
      Alert.alert("Eksik Bilgi", "Lütfen sorun türünü seçin ve açıklama yazın.")
      return
    }
    
    setLoading(true)
    // API çağrısı simülasyonu
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
    }, 1500)
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Sorun Bildir</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.description, { color: colors.subtext }]}>
          Karşılaştığınız sorunu aşağıdaki bilgilerle detaylı şekilde bize bildirin. 
          En kısa sürede size dönüş yapacağız.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Sorun Türü</Text>
        <View style={styles.typeGrid}>
          {issueTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                {
                  backgroundColor: selectedType === type.id ? colors.primarySoft : colors.surface,
                  borderColor: selectedType === type.id ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <Ionicons 
                name={type.icon} 
                size={24} 
                color={selectedType === type.id ? colors.primary : colors.subtext} 
              />
              <Text style={[
                styles.typeLabel,
                { 
                  color: selectedType === type.id ? colors.primary : colors.text,
                  fontWeight: selectedType === type.id ? "600" : "400"
                }
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Açıklama</Text>
        <TextInput
          style={[styles.textArea, { 
            backgroundColor: colors.surface, 
            borderColor: colors.border,
            color: colors.text 
          }]}
          placeholder="Sorununuzu detaylı şekilde açıklayın..."
          placeholderTextColor={colors.subtext}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.submitButton, { 
            backgroundColor: colors.primary,
            opacity: (!selectedType || !description.trim() || loading) ? 0.6 : 1
          }]}
          onPress={handleSubmit}
          disabled={!selectedType || !description.trim() || loading}
        >
          {loading ? (
            <Ionicons name="reload-outline" size={20} color="#fff" />
          ) : (
            <Ionicons name="send" size={20} color="#fff" />
          )}
          <Text style={styles.submitText}>
            {loading ? "Gönderiliyor..." : "Gönder"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <CustomAlert
        visible={showSuccess}
        type="success"
        title="Başarıyla Gönderildi"
        message="Sorun bildiriminiz alındı. 24 saat içinde size dönüş yapacağız."
        onClose={() => {
          setShowSuccess(false)
          navigation.goBack()
        }}
      />
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
  title: { fontSize: getFontSize(20, 22), fontWeight: "bold" },
  content: { flex: 1, padding: Sizes.spacing.l },
  description: { 
    fontSize: getFontSize(16, 18), 
    lineHeight: 22, 
    marginBottom: Sizes.spacing.xxl 
  },
  sectionTitle: { 
    fontSize: getFontSize(18, 20), 
    fontWeight: "600", 
    marginBottom: Sizes.spacing.m 
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Sizes.spacing.m,
    marginBottom: Sizes.spacing.xxl,
  },
  typeCard: {
    width: "47%",
    padding: Sizes.spacing.m,
    borderRadius: Sizes.borderRadius.m,
    borderWidth: Sizes.borderWidth.default,
    alignItems: "center",
    gap: Sizes.spacing.s,
  },
  typeLabel: { fontSize: getFontSize(14, 16), textAlign: "center" },
  textArea: {
    borderWidth: Sizes.borderWidth.default,
    borderRadius: Sizes.borderRadius.m,
    padding: Sizes.spacing.m,
    fontSize: getFontSize(16, 18),
    minHeight: 120,
    marginBottom: Sizes.spacing.xxl,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: Sizes.buttonHeight.large,
    borderRadius: Sizes.borderRadius.m,
    gap: Sizes.spacing.s,
    marginBottom: Sizes.spacing.xxl,
  },
  submitText: {
    color: "#fff",
    fontSize: getFontSize(16, 18),
    fontWeight: "600",
  },
})