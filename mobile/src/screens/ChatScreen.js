"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function ChatScreen({ navigation, route }) {
  const { userName = "Komşu", userAvatar, chatId, taskTitle } = route.params || {}
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    { id: "1", sender: "other", text: "Merhaba! Yardım lazım mı?", time: "10:25" },
    { id: "2", sender: "me", text: "Merhaba, evet köpek gezdirme için.", time: "10:27" },
  ])
  const listRef = useRef(null)

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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          {userAvatar ? <Image source={{ uri: userAvatar }} style={styles.headerAvatar} /> : <Ionicons name="person-circle-outline" size={28} color="#666" />}
          <View>
            <Text style={styles.userName}>{userName}</Text>
            {taskTitle ? <Text style={styles.taskTitle}>📋 {taskTitle}</Text> : null}
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={22} color="#10b981" />
        </TouchableOpacity>
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
      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="add-outline" size={22} color="#666" />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Mesaj yaz..."
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={send}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const bubbleRadius = 16

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9ecef" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 16, paddingTop: 14, paddingBottom: 10, backgroundColor: "#fff",
    borderBottomWidth: 1, borderBottomColor: "#f0f0f0",
  },
  headerCenter: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 6 },
  userName: { fontSize: 16, fontWeight: "600", color: "#1a1a1a" },
  taskTitle: { fontSize: 12, color: "#666" },

  listContent: { padding: 12, gap: 8 },
  row: { width: "100%", flexDirection: "row", alignItems: "flex-end" },
  avatar: { width: 28, height: 28, borderRadius: 14, marginRight: 6 },
  bubble: { maxWidth: "80%", paddingHorizontal: 12, paddingVertical: 8, borderRadius: bubbleRadius },
  bubbleMe: { backgroundColor: "#10b981", borderBottomRightRadius: 4 },
  bubbleOther: { backgroundColor: "#fff", borderBottomLeftRadius: 4, borderWidth: 1, borderColor: "#e6e6e6" },
  text: { fontSize: 15, lineHeight: 20 },
  textMe: { color: "#fff" },
  textOther: { color: "#1a1a1a" },
  time: { fontSize: 10, marginTop: 4 },
  timeMe: { color: "#eafaf4", alignSelf: "flex-end" },
  timeOther: { color: "#999", alignSelf: "flex-end" },

  inputBar: {
    flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#fff",
    borderTopWidth: 1, borderTopColor: "#f0f0f0",
  },
  iconBtn: { padding: 6 },
  textInput: {
    flex: 1, maxHeight: 120, marginHorizontal: 8,
    paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#f7f7f7",
    borderRadius: 20, fontSize: 15,
  },
  sendBtn: { backgroundColor: "#10b981", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
})