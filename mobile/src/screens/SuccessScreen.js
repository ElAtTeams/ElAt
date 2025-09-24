"use client"
import React, { useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { CommonActions } from "@react-navigation/native"
import { useAppStore } from "../store/useAppStore"
import { useThemeMeta } from "../store/themeStore"

const { width, height } = Dimensions.get("window")

export default function SuccessScreen({ navigation }) {
  const { colors: ui } = useThemeMeta()
  const completeOnboarding = useAppStore((s) => s.completeOnboarding)
  const needsOnboarding = useAppStore((s) => s.needsOnboarding)

  // Eğer store güncellemesi ile MainTabs root'a eklendiğinde otomatik yönlensin
  useEffect(() => {
    if (needsOnboarding === false) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        })
      )
    }
  }, [needsOnboarding, navigation])

  const handleGoHome = () => {
    // 1) Önce onboarding durumunu tamamla (store güncellenecek)
    completeOnboarding()
    // 2) effect ile store değeri false olduğunda reset tetiklenecek
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Arka plan görseli */}
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" }}
        style={styles.bgImage}
        blurRadius={2}
      />
      {/* Yarı saydam overlay */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Kutlama illüstrasyonu */}
        <Image
          source={{ uri: "https://cdn.pixabay.com/photo/2017/01/31/13/14/avatar-2026510_1280.png" }}
          style={styles.illustration}
          resizeMode="contain"
        />
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={54} color="#fff" />
        </View>
        <Text style={styles.title}>
          Profilin Hazır! 🎉
        </Text>
        <Text style={styles.subtitle}>
          Tebrikler, profilin hazır. Hemen ana ekrana geçiyoruz.
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: ui.primary }]}
          onPress={handleGoHome}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Ana Sayfaya Git</Text>
          <Ionicons name="arrow-forward" size={22} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} ElAt • Birlikte daha güçlüyüz!
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: "rgba(0,0,0,0.55)",
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    zIndex: 2,
  },
  illustration: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 24,
    color: "#fff",
    opacity: 0.95,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 10,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 18,
    zIndex: 2,
  },
  footerText: {
    color: "#fff",
    fontSize: 13,
    opacity: 0.7,
    textAlign: "center",
  },
})