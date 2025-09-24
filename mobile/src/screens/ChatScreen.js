"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Sizes, getFontSize, getSize, platformValues } from "../utils/dimensions"
import { useThemeColors } from "../store/themeStore"

export default function ChatScreen({ navigation, route }) {
  const { userName = "Komşu", userAvatar, chatId, taskTitle } = route.params || {}
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    { id: "1", sender: "other", text: "Merhaba! Yardım lazım mı?", time: "10:25" },
    { id: "2", sender: "me", text: "Merhaba, evet köpek gezdirme için.", time: "10:27" },
  ])
  const listRef = useRef(null)
  const colors = useThemeColors()

  const send = () => {
    if (!input.trim()) return
    const msg = { id: Date.now().toString(), sender: "me", text: input.trim(), time: new Date().toLocaleTimeString().slice(0,5) }
    setMessages((prev) => [msg, ...prev])
    setInput("")
  }

  useEffect(() => {
    // otomatik alta kaydır
    if (listRef.current) listRef.current.scrollToOffset({ offset: 0, animated: true })
  }, [messages])

  const renderItem = ({ item }) => {
    const mine = item.sender === "me"
    return (
      <View style={[styles.row, mine ? { justifyContent: "flex-end" } : { justifyContent: "flex-start" }]}>
        {!mine && userAvatar && <Image source={{ uri: userAvatar }} style={styles.avatar} />}
        <View style={[styles.bubble, mine ? styles.bubbleMe : styles.bubbleOther]}>
          <Text style={[styles.text, mine ? styles.textMe : styles.textOther]}>{item.text}</Text>
          <Text style={[styles.time, mine ? styles.timeMe : styles.timeOther]}>{item.time}</Text>
        </View>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={[styles.container(colors)]} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {/* Header */}
      <View style={styles.header(colors)}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            {userAvatar ? <Image source={{ uri: userAvatar }} style={styles.headerAvatar} /> : <Ionicons name="person-circle-outline" size={28} color={colors.subtext} />}
            <Text style={[styles.userName, { color: colors.text }]} numberOfLines={1}>{userName}</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          {taskTitle ? (
            <View style={[styles.taskPill, { borderColor: colors.border, backgroundColor: colors.surface }]}>
              <Text style={{ color: colors.subtext, fontSize: getFontSize(12, 13) }}>📋 {taskTitle}</Text>
            </View>
          ) : null}
          <TouchableOpacity>
            <Ionicons name="call-outline" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        inverted
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Input */}
      <View style={styles.inputBar(colors)}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="add-outline" size={22} color={colors.subtext} />
        </TouchableOpacity>
        <TextInput
          style={[styles.textInput, { backgroundColor: colors.muted, color: colors.text }]}
          placeholder="Mesaj yaz..."
          placeholderTextColor={colors.subtext}
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity style={[styles.sendBtn, { backgroundColor: colors.primary }]} onPress={send}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const bubbleRadius = 16

const styles = {
  container: (c) => ({ flex: 1, backgroundColor: c.muted }),
  header: (c) => ({
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: Sizes.spacing.l, paddingTop: platformValues.statusBarHeight + Sizes.spacing.m,
    paddingBottom: Sizes.spacing.s, backgroundColor: c.surface, borderBottomWidth: Sizes.borderWidth.thin, borderBottomColor: c.border,
  }),
  headerCenter: { flexDirection: "row", alignItems: "center" },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: Sizes.spacing.s },
  headerRight: { flexDirection: "row", alignItems: "center", gap: Sizes.spacing.s },
  headerAvatar: { width: getSize(36, 44), height: getSize(36, 44), borderRadius: getSize(36, 44) / 2, marginRight: Sizes.spacing.s },
  userName: { fontSize: getFontSize(16, 18), fontWeight: "700", maxWidth: getSize(160, 220) },
  taskPill: { paddingHorizontal: Sizes.spacing.s, paddingVertical: Sizes.spacing.xs, borderRadius: Sizes.borderRadius.m, borderWidth: Sizes.borderWidth.thin },
  taskTitle: { fontSize: getFontSize(12, 14) },

  listContent: { padding: Sizes.spacing.m, gap: Sizes.spacing.xs },
  row: { width: "100%", flexDirection: "row", alignItems: "flex-end" },
  avatar: { width: getSize(28, 32), height: getSize(28, 32), borderRadius: getSize(28, 32) / 2, marginRight: Sizes.spacing.xs },
  bubble: { maxWidth: "78%", paddingHorizontal: Sizes.spacing.m, paddingVertical: Sizes.spacing.s, borderRadius: Sizes.borderRadius.l },
  bubbleMe: { backgroundColor: "#10b981", borderBottomRightRadius: Sizes.borderRadius.s },
  bubbleOther: { backgroundColor: "#fff", borderBottomLeftRadius: Sizes.borderRadius.s, borderWidth: Sizes.borderWidth.default, borderColor: "#ebebeb" },
  text: { fontSize: getFontSize(15, 17), lineHeight: getSize(20, 22) },
  textMe: { color: "#fff" },
  textOther: { color: "#1a1a1a" },
  time: { fontSize: getFontSize(10, 11), marginTop: Sizes.spacing.xs },
  timeMe: { color: "#eafaf4", alignSelf: "flex-end" },
  timeOther: { color: "#999", alignSelf: "flex-end" },

  inputBar: (c) => ({
    flexDirection: "row", alignItems: "center", paddingHorizontal: Sizes.spacing.m, paddingVertical: Sizes.spacing.s,
    backgroundColor: c.surface, borderTopWidth: Sizes.borderWidth.thin, borderTopColor: c.border,
  }),
  iconBtn: { padding: Sizes.spacing.xs },
  textInput: {
    flex: 1, maxHeight: getSize(120, 150), marginHorizontal: Sizes.spacing.s,
    paddingHorizontal: Sizes.spacing.m, paddingVertical: Sizes.spacing.s, backgroundColor: "#f7f7f7", borderRadius: Sizes.borderRadius.l,
    fontSize: getFontSize(15, 17), color: "#1a1a1a",
  },
  sendBtn: { backgroundColor: "#10b981", paddingHorizontal: Sizes.spacing.m, paddingVertical: Sizes.spacing.s, borderRadius: Sizes.borderRadius.m },
}