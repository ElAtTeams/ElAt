"use client"
import React, { useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColors } from "../store/themeStore"

const { width, height } = Dimensions.get("window")

export default function CustomAlert({ visible, type = "info", title, message, onClose }) {
  const colors = useThemeColors()
  const anim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      Animated.spring(anim, { toValue: 1, useNativeDriver: true }) .start()
    } else {
      Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true }).start()
    }
  }, [visible])

  if (!visible) return null

  const icons = {
    info: "information-circle-outline",
    success: "checkmark-circle-outline",
    error: "close-circle-outline",
    warning: "alert-circle-outline",
  }
  const iconColor = {
    info: colors.primary,
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e42",
  }[type] || colors.primary

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.modal,
          {
            backgroundColor: colors.surface,
            transform: [
              { scale: anim },
              { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [height * 0.2, 0] }) },
            ],
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 8,
          },
        ]}
      >
        <Ionicons name={icons[type]} size={54} color={iconColor} style={{ marginBottom: 12 }} />
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.message, { color: colors.subtext }]}>{message}</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={onClose}>
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Tamam</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute", left: 0, top: 0, width, height,
    backgroundColor: "rgba(0,0,0,0.35)", alignItems: "center", justifyContent: "center", zIndex: 99,
  },
  modal: {
    width: width * 0.8,
    borderRadius: 24,
    alignItems: "center",
    padding: 28,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  message: { fontSize: 16, marginBottom: 24, textAlign: "center" },
  button: { paddingHorizontal: 32, paddingVertical: 12, borderRadius: 12 },
})