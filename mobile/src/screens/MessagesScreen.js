"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColors } from "../store/themeStore"

export default function MessagesScreen({ navigation }) {
  const [conversations, setConversations] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const colors = useThemeColors()

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = () => {
    setConversations([
      {
        id: 1,
        user: {
          name: "Mehmet Aydın",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
          online: true,
        },
        lastMessage: {
          text: "Köpek gezdirme görevi için müsait misiniz?",
          time: "10:30",
          unread: true,
          sender: "other",
        },
        task: {
          title: "Köpek Gezdirme",
          id: 1,
        },
      },
      {
        id: 2,
        user: {
          name: "Ayşe Kaya",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
          online: false,
        },
        lastMessage: {
          text: "Teşekkürler, çok yardımcı oldunuz!",
          time: "Dün",
          unread: false,
          sender: "other",
        },
        task: {
          title: "Market Alışverişi",
          id: 2,
        },
      },
      {
        id: 3,
        user: {
          name: "Fatma Şahin",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
          online: true,
        },
        lastMessage: {
          text: "Yarın çöp çıkarma konusunda konuşalım",
          time: "14:20",
          unread: false,
          sender: "me",
        },
        task: {
          title: "Çöp Çıkarma",
          id: 3,
        },
      },
      {
        id: 4,
        user: {
          name: "Ali Demir",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
          online: false,
        },
        lastMessage: {
          text: "Elektrik tamiri tamamlandı 👍",
          time: "2 gün önce",
          unread: false,
          sender: "other",
        },
        task: {
          title: "Elektrik Tamiri",
          id: 4,
        },
      },
    ])
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={[styles.conversationCard, { borderBottomColor: colors.border }]}
      onPress={() =>
        navigation.navigate("Chat", {
          chatId: item.id,
          userName: item.user.name,
          userAvatar: item.user.avatar,
          taskId: item.task.id,
          taskTitle: item.task.title,
        })
      }
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        {item.user.online && <View style={[styles.onlineIndicator, { borderColor: colors.background }]} />}
        {item.lastMessage.unread && <View style={styles.unreadBadge} />}
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={[styles.userName, { color: colors.text }]}>{item.user.name}</Text>
          <Text style={[styles.messageTime, { color: colors.subtext }]}>{item.lastMessage.time}</Text>
        </View>

        <Text style={[styles.taskTitle, { color: colors.primary }]}>📋 {item.task.title}</Text>

        <Text
          style={[
            styles.lastMessage,
            { color: item.lastMessage.unread ? colors.text : colors.subtext },
            item.lastMessage.unread && styles.unreadMessage,
          ]}
          numberOfLines={2}
        >
          {item.lastMessage.sender === "me" ? "Sen: " : ""}
          {item.lastMessage.text}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Mesajlar</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color={colors.subtext} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: colors.muted, borderColor: colors.border }]}>
        <Ionicons name="search-outline" size={20} color={colors.subtext} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Kişi ara..."
          placeholderTextColor={colors.subtext}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Conversations List */}
      <FlatList
        data={filteredConversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.conversationsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: "#1a1a1a",
  },
  conversationsList: {
    paddingHorizontal: 20,
  },
  conversationCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "white",
  },
  unreadBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ef4444",
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  messageTime: {
    fontSize: 12,
    color: "#999",
  },
  taskTitle: {
    fontSize: 12,
    color: "#10b981",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  unreadMessage: {
    fontWeight: "500",
    color: "#1a1a1a",
  },
})
