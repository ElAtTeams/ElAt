"use client"
import { View, StyleSheet, Animated } from "react-native"
import { useEffect, useRef } from "react"

export default function Skeleton({ width = "100%", height = 20, style }) {
  const anim = useRef(new Animated.Value(0.3)).current
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0.3, duration: 900, useNativeDriver: true }),
      ])
    ).start()
  }, [])
  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, opacity: anim },
        style,
      ]}
    />
  )
}
const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    marginVertical: 6,
  },
})