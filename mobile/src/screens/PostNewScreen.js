"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { useThemeColors } from "../store/themeStore"

export default function PostNewScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [showDateModal, setShowDateModal] = useState(false)
  const [showTimeModal, setShowTimeModal] = useState(false)
  const [images, setImages] = useState([])
  const [urgent, setUrgent] = useState(false)
  const [loading, setLoading] = useState(false)

  const colors = useThemeColors()

  const categories = [
    { id: "pet", name: "Evcil Hayvan", icon: "paw-outline", color: "#f59e0b" },
    { id: "shopping", name: "Alışveriş", icon: "cart-outline", color: "#10b981" }, // bag-outline -> cart-outline
    { id: "cleaning", name: "Temizlik", icon: "trash-outline", color: "#3b82f6" },
    { id: "transport", name: "Ulaşım", icon: "car-outline", color: "#8b5cf6" },
    { id: "elderly", name: "Yaşlı Bakımı", icon: "heart-outline", color: "#ef4444" },
    { id: "repair", name: "Tamir", icon: "build-outline", color: "#f97316" },
    { id: "garden", name: "Bahçe", icon: "leaf-outline", color: "#22c55e" },
    { id: "other", name: "Diğer", icon: "ellipsis-horizontal-outline", color: "#6b7280" },
  ]

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImages([...images, result.assets[0]])
    }
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!title || !description || !category) {
      Alert.alert("Hata", "Lütfen tüm zorunlu alanları doldurun")
      return
    }

    setLoading(true)

    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 2000))

      Alert.alert("Başarılı!", "Göreviniz başarıyla oluşturuldu", [
        { text: "Tamam", onPress: () => navigation.goBack() },
      ])
    } catch (error) {
      Alert.alert("Hata", "Görev oluşturulurken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const CategoryButton = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        category === item.id && { backgroundColor: item.color + "20", borderColor: item.color },
      ]}
      onPress={() => setCategory(item.id)}
    >
      <Ionicons name={item.icon} size={20} color={item.color} />
      <Text style={[styles.categoryText, category === item.id && { color: item.color }]}>{item.name}</Text>
    </TouchableOpacity>
  )

  const formatDate = (date) => {
    return date.toLocaleDateString("tr-TR")
  }

  const formatTime = (time) => {
    return time.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Yeni İlan</Text>
        <TouchableOpacity onPress={handleSubmit} disabled={loading}>
          <Text style={[styles.publishButton, { color: loading ? colors.subtext : colors.primary }]}>
            {loading ? "Yayınlanıyor..." : "Yayınla"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>Başlık *</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.muted, borderColor: colors.border, color: colors.text }]}
            placeholder="Görev başlığını yazın"
            placeholderTextColor={colors.subtext}
            value={title}
            onChangeText={setTitle}
            maxLength={50}
          />
          <Text style={[styles.charCount, { color: colors.subtext }]}>{title.length}/50</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>Açıklama *</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: colors.muted, borderColor: colors.border, color: colors.text }]}
            placeholder="Görev detaylarını açıklayın"
            placeholderTextColor={colors.subtext}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            maxLength={500}
          />
          <Text style={[styles.charCount, { color: colors.subtext }]}>{description.length}/500</Text>
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>Kategori *</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((item) => (
              <CategoryButton key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Price */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>Ücret (Opsiyonel)</Text>
          <View style={[styles.priceContainer, { backgroundColor: colors.muted, borderColor: colors.border }]}>
            <Text style={[styles.currencySymbol, { color: colors.subtext }]}>₺</Text>
            <TextInput
              style={[styles.priceInput, { color: colors.text }]}
              placeholder="0"
              placeholderTextColor={colors.subtext}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>Tarih ve Saat</Text>
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity style={[styles.dateTimeButton, { backgroundColor: colors.muted, borderColor: colors.border }]} onPress={() => setShowDateModal(true)}>
              <Ionicons name="calendar-outline" size={20} color={colors.subtext} />
              <Text style={[styles.dateTimeText, { color: colors.text }]}>{formatDate(date)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dateTimeButton, { backgroundColor: colors.muted, borderColor: colors.border }]} onPress={() => setShowTimeModal(true)}>
              <Ionicons name="time-outline" size={20} color={colors.subtext} />
              <Text style={[styles.dateTimeText, { color: colors.text }]}>{formatTime(time)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Images */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>Fotoğraflar</Text>
          <View style={styles.imagesContainer}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: image.uri }} style={styles.image} />
                <TouchableOpacity style={styles.removeImageButton} onPress={() => removeImage(index)}>
                  <Ionicons name="close" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
            {images.length < 3 && (
              <TouchableOpacity style={[styles.addImageButton, { borderColor: colors.border, backgroundColor: colors.muted }]} onPress={pickImage}>
                <Ionicons name="camera-outline" size={24} color={colors.subtext} />
                <Text style={[styles.addImageText, { color: colors.subtext }]}>Fotoğraf Ekle</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Urgent Toggle */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.urgentToggle, { borderColor: colors.border, backgroundColor: colors.muted }]}
            onPress={() => setUrgent(!urgent)}
          >
            <View style={styles.urgentInfo}>
              <Ionicons name="alert-circle-outline" size={20} color={urgent ? colors.primary : colors.subtext} />
              <View style={styles.urgentText}>
                <Text style={[styles.urgentTitle, { color: colors.text }]}>Acil İlan</Text>
                <Text style={[styles.urgentDescription, { color: colors.subtext }]}>Bu ilan acil olarak işaretlensin</Text>
              </View>
            </View>
            <View style={[styles.switch, urgent ? { backgroundColor: colors.primary } : { backgroundColor: colors.border }]}>
              <View style={[styles.switchThumb, urgent && styles.switchThumbActive]} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Custom Date Modal */}
      <Modal
        visible={showDateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDateModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Tarih Seç</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowDateModal(false)}>
              <Ionicons name="close" size={24} color={colors.subtext} />
            </TouchableOpacity>
            {/* Burada basit bir tarih seçici ekleyebilirsiniz */}
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowDateModal(false)}
            >
              <Text style={styles.modalButtonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Custom Time Modal */}
      <Modal
        visible={showTimeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimeModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Saat Seç</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowTimeModal(false)}
            >
              <Ionicons name="close" size={24} color={colors.subtext} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowTimeModal(false)}
            >
              <Text style={styles.modalButtonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor kaldırıldı; runtime'da theme veriliyor
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  publishButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10b981",
  },
  disabledButton: {
    color: "#999",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 4,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    backgroundColor: "#f8f9fa",
    marginBottom: 8,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
  },
  currencySymbol: {
    fontSize: 16,
    color: "#666",
    paddingLeft: 16,
  },
  priceInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  dateTimeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  dateTimeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
  },
  dateTimeText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#1a1a1a",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e1e1e1",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  addImageText: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  urgentToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 12,
    // backgroundColor: "#f8f9fa",
  },
  urgentInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  urgentText: {
    marginLeft: 12,
  },
  urgentTitle: {
    fontSize: 16,
    fontWeight: "500",
    // color runtime'da
  },
  urgentDescription: {
    fontSize: 12,
    // color runtime'da
    marginTop: 2,
  },
  switch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  switchActive: {
    backgroundColor: "#10b981",
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
  switchThumbActive: {
    alignSelf: "flex-end",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    // backgroundColor runtime'da
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    // color runtime'da
  },
  modalCloseButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalButton: {
    // backgroundColor runtime'da
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})
