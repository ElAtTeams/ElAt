import React, { useState, useRef, useEffect } from "react"
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet, Animated, Image, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColors } from "../../store/themeStore"
import { Sizes, getFontSize, platformValues } from "../../utils/dimensions"

const { width, height } = Dimensions.get("window")

const steps = [
  {
    title: "Kişisel Bilgiler",
    subtitle: "Sizi tanıyalım ve profilinizi oluşturalım",
    icon: "person-circle-outline",
    color: "#6366f1",
    fields: ["firstName", "lastName", "phone"]
  },
  {
    title: "Konum Bilgileri", 
    subtitle: "Çevrenizdeki komşularınızı bulalım",
    icon: "location-outline",
    color: "#10b981",
    fields: ["address", "city", "district"]
  },
  {
    title: "Hakkınızda",
    subtitle: "Kendinizi tanıtın ve ilgi alanlarınızı paylaşın",
    icon: "heart-outline",
    color: "#f59e0b",
    fields: ["bio", "interests"]
  }
]

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(0) // 0: tanıtım, 1+: form adımları
  const [formData, setFormData] = useState({})
  const colors = useThemeColors()
  const slideAnim = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(1)).current
  const progressAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (step > 0) {
      Animated.timing(progressAnim, {
        toValue: (step) / steps.length,
        duration: 300,
        useNativeDriver: false,
      }).start()
    }
  }, [step])

  // Tanıtım ekranı
  if (step === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* Arka plan görseli */}
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" }}
          style={styles.bgImage}
          blurRadius={2}
        />
        {/* Yarı saydam overlay */}
        <View style={styles.overlay} />
        <View style={styles.introBox}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2026510_1280.png"
            }}
            style={styles.introImage}
            resizeMode="contain"
          />
          <Text style={[styles.introTitle, { color: "#fff" }]}>
            Profilini Hazırlıyoruz
          </Text>
          <Text style={[styles.introDesc, { color: "#fff" }]}>
            Senin için ElAt’ı kullanıma hazır hale getireceğiz. Hadi başlayalım!
          </Text>
          <View style={styles.introButtons}>
            <TouchableOpacity
              style={[styles.skipButton, { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.15)" }]}
              onPress={() => setStep(1)}
            >
              <Ionicons name="arrow-forward-circle-outline" size={20} color="#fff" />
              <Text style={[styles.skipText, { color: "#fff" }]}>Atla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: "#10b981" }]}
              onPress={() => setStep(1)}
            >
              <Text style={styles.nextText}>Devam Et</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: "#fff" }]}>
            © {new Date().getFullYear()} ElAt • Birlikte daha güçlüyüz!
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  // Form adımları
  const currentStep = step - 1
  const currentStepData = steps[currentStep]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBackground, { backgroundColor: colors.border }]}>
            <Animated.View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: currentStepData.color,
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  })
                }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: colors.subtext }]}>
            {currentStep + 1} / {steps.length}
          </Text>
        </View>
        {/* Step Icon ve Başlık */}
        <Animated.View 
          style={[
            styles.stepHeader,
            { 
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          <View style={[styles.stepIcon, { backgroundColor: currentStepData.color + "20" }]}>
            <Ionicons name={currentStepData.icon} size={32} color={currentStepData.color} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{currentStepData.title}</Text>
          <Text style={[styles.subtitle, { color: colors.subtext }]}>{currentStepData.subtitle}</Text>
        </Animated.View>
        {/* Form */}
        <Animated.View 
          style={[
            styles.formContainer,
            { 
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            {currentStep === 0 && (
              <>
                <InputField
                  label="Ad"
                  value={formData.firstName || ""}
                  onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                  placeholder="Adınız"
                  icon="person-outline"
                />
                <InputField
                  label="Soyad"
                  value={formData.lastName || ""}
                  onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                  placeholder="Soyadınız"
                  icon="person-outline"
                />
                <InputField
                  label="Telefon"
                  value={formData.phone || ""}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  placeholder="05XX XXX XX XX"
                  keyboardType="phone-pad"
                  icon="call-outline"
                />
              </>
            )}
            {currentStep === 1 && (
              <>
                <InputField
                  label="Adres"
                  value={formData.address || ""}
                  onChangeText={(text) => setFormData({ ...formData, address: text })}
                  placeholder="Sokak, mahalle..."
                  multiline
                  icon="home-outline"
                />
                <InputField
                  label="İl"
                  value={formData.city || ""}
                  onChangeText={(text) => setFormData({ ...formData, city: text })}
                  placeholder="İstanbul"
                  icon="business-outline"
                />
                <InputField
                  label="İlçe"
                  value={formData.district || ""}
                  onChangeText={(text) => setFormData({ ...formData, district: text })}
                  placeholder="Kadıköy"
                  icon="location-outline"
                />
              </>
            )}
            {currentStep === 2 && (
              <>
                <InputField
                  label="Hakkınızda"
                  value={formData.bio || ""}
                  onChangeText={(text) => setFormData({ ...formData, bio: text })}
                  placeholder="Kendinizi kısaca tanıtın..."
                  multiline
                  numberOfLines={4}
                  icon="document-text-outline"
                />
                <InputField
                  label="İlgi Alanları"
                  value={formData.interests || ""}
                  onChangeText={(text) => setFormData({ ...formData, interests: text })}
                  placeholder="Spor, müzik, kitap..."
                  icon="star-outline"
                />
              </>
            )}
          </ScrollView>
        </Animated.View>
        {/* Butonlar */}
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <TouchableOpacity 
              style={[styles.backButton, { borderColor: colors.border, backgroundColor: colors.surface }]} 
              onPress={() => setStep(step - 1)}
            >
              <Ionicons name="arrow-back" size={20} color={colors.subtext} />
              <Text style={[styles.backText, { color: colors.subtext }]}>Geri</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={[
              styles.nextButton, 
              { 
                backgroundColor: currentStepData.color,
                flex: currentStep > 0 ? 2 : 1
              }
            ]} 
            onPress={() => {
              if (currentStep < steps.length - 1) setStep(step + 1)
              else navigation.replace("SuccessScreen") // SuccessScreen'e yönlendir
            }}
          >
            <Text style={styles.nextText}>
              {currentStep === steps.length - 1 ? "Tamamla" : "İleri"}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.subtext }]}>
            © {new Date().getFullYear()} ElAt • Birlikte daha güçlüyüz!
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

function InputField({ label, icon, ...props }) {
  const colors = useThemeColors()
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons name={icon} size={20} color={colors.subtext} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholderTextColor={colors.subtext}
          {...props}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgImage: {
    position: "absolute",
    width: width,
    height: height,
    top: 0,
    left: 0,
    zIndex: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
    zIndex: 1,
  },
  introBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Sizes.spacing.xl,
    paddingBottom: Sizes.spacing.l,
    paddingHorizontal: Sizes.spacing.xl,
    zIndex: 2,
  },
  introImage: {
    width: 180,
    height: 180,
    marginBottom: Sizes.spacing.l,
  },
  introTitle: {
    fontSize: getFontSize(32, 36),
    fontWeight: "800",
    marginBottom: Sizes.spacing.s,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  introDesc: {
    fontSize: getFontSize(17, 19),
    textAlign: "center",
    color: "#fff",
    marginBottom: Sizes.spacing.l,
    lineHeight: 26,
  },
  introButtons: {
    flexDirection: "row",
    gap: Sizes.spacing.m,
    marginTop: Sizes.spacing.xl,
  },
  skipButton: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: 1.5, 
    borderRadius: Sizes.borderRadius.l, 
    height: 56, 
    marginRight: Sizes.spacing.m,
    paddingHorizontal: Sizes.spacing.xl,
    gap: Sizes.spacing.s,
  },
  skipText: { 
    fontWeight: "700", 
    fontSize: getFontSize(16, 18),
  },
  nextButton: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: Sizes.borderRadius.l, 
    height: 56, 
    gap: Sizes.spacing.s,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    paddingHorizontal: Sizes.spacing.xl,
  },
  nextText: { 
    fontWeight: "700", 
    color: "#fff",
    fontSize: getFontSize(16, 18),
  },
  progressContainer: {
    marginTop: Sizes.spacing.xl,
    marginBottom: Sizes.spacing.xxl,
    paddingHorizontal: Sizes.spacing.xl,
  },
  progressBackground: {
    height: 6,
    borderRadius: 3,
    marginBottom: Sizes.spacing.s,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: getFontSize(14, 16),
    fontWeight: "600",
    textAlign: "center",
  },
  stepHeader: {
    alignItems: "center",
    marginBottom: Sizes.spacing.xl,
  },
  stepIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Sizes.spacing.l,
  },
  title: { 
    fontSize: getFontSize(28, 32), 
    fontWeight: "800", 
    marginBottom: Sizes.spacing.s,
    textAlign: "center",
  },
  subtitle: { 
    fontSize: getFontSize(16, 18),
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 340,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: Sizes.spacing.xl,
  },
  form: { 
    flex: 1,
  },
  inputContainer: { 
    marginBottom: Sizes.spacing.l,
  },
  label: { 
    fontSize: getFontSize(16, 18), 
    fontWeight: "600", 
    marginBottom: Sizes.spacing.s,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: Sizes.borderWidth.default,
    borderRadius: Sizes.borderRadius.l,
    paddingHorizontal: Sizes.spacing.m,
    minHeight: 56,
  },
  inputIcon: {
    marginRight: Sizes.spacing.m,
  },
  input: { 
    flex: 1,
    fontSize: getFontSize(16, 18),
    paddingVertical: Sizes.spacing.m,
  },
  buttonContainer: { 
    flexDirection: "row", 
    gap: Sizes.spacing.m, 
    paddingHorizontal: Sizes.spacing.xl,
    paddingBottom: Sizes.spacing.xl,
  },
  backButton: { 
    flex: 1, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: Sizes.borderWidth.default, 
    borderRadius: Sizes.borderRadius.l, 
    height: 56, 
    gap: Sizes.spacing.s,
  },
  backText: { 
    fontWeight: "600",
    fontSize: getFontSize(16, 18),
  },
  footer: {
    alignItems: "center",
    paddingBottom: Sizes.spacing.l,
    paddingTop: Sizes.spacing.s,
    zIndex: 2,
  },
  footerText: {
    fontSize: getFontSize(13, 14),
    textAlign: "center",
    opacity: 0.7,
  },
})