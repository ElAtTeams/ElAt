"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, RefreshControl } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState("all") // "all", "tasks", "messages", "system"

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = () => {
    setNotifications([
      {
        id: 1,
        type: "task_request",
        title: "Yeni Görev Talebi",
        message: "Mehmet A. köpek gezdirme göreviniz için başvurdu",
        time: "5 dakika önce",
        read: false,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        taskId: 1,
      },
      {
        id: 2,
        type: "message",
        title: "Yeni Mesaj",
        message: "Ayşe K. size bir mesaj gönderdi",
        time: "15 dakika önce",
        read: false,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
        chatId: "chat_1",
      },
      {
        id: 3,
        type: "task_completed",
        title: "Görev Tamamlandı",
        message: "Market alışverişi görevi başarıyla tamamlandı",
        time: "2 saat önce",
        read: true,
        taskId: 2,
      },
      {
        id: 4,
        type: "system",
        title: "Yeni Rozet Kazandınız!",
        message: "Mahallenin Yardımseveri rozetini kazandınız 🏆",
        time: "1 gün önce",
        read: true,
        badge: "helper",
      },
      {
        id: 5,
        type: "task_reminder",
        title: "Görev Hatırlatması",
        message: "Yarın saat 18:00'da köpek gezdirme göreviniz var",
        time: "1 gün önce",
        read: true,
        taskId: 3,
      },
    ])
  }

  const onRefresh = () => {
    setRefreshing(true)
    loadNotifications()
    setTimeout(() => setRefreshing(false), 1000)
  }

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const handleNotificationPress = (notification) => {
    markAsRead(notification.id)

    switch (notification.type) {
      case "task_request":
      case "task_completed":
      case "task_reminder":
        navigation.navigate("PostDetail", { taskId: notification.taskId })
        break
      case "message":
        navigation.navigate("Chat", { chatId: notification.chatId })
        break
      case "system":
        if (notification.badge) {
          navigation.navigate("Badges")
        }
        break
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "task_request":
        return "person-add-outline"
      case "message":
        return "chatbubble-outline"
      case "task_completed":
        return "checkmark-circle-outline"
      case "system":
        return "trophy-outline"
      case "task_reminder":
        return "time-outline"
      default:
        return "notifications-outline"
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case "task_request":
        return "#3b82f6"
      case "message":
        return "#10b981"
      case "task_completed":
        return "#22c55e"
      case "system":
        return "#f59e0b"
      case "task_reminder":
        return "#8b5cf6"
      default:
        return "#6b7280"
    }
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true
    if (filter === "tasks") return ["task_request", "task_completed", "task_reminder"].includes(notif.type)
    if (filter === "messages") return notif.type === "message"
    if (filter === "system") return notif.type === "system"
    return true
  })

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.unreadCard]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationContent}>
        <View style={styles.iconContainer}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.iconBg, { backgroundColor: getNotificationColor(item.type) + "20" }]}>
              <Ionicons name={getNotificationIcon(item.type)} size={20} color={getNotificationColor(item.type)} />
            </View>
          )}
          {!item.read && <View style={styles.unreadDot} />}
        </View>

        <View style={styles.textContent}>
          <Text style={[styles.title, !item.read && styles.unreadTitle]}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const FilterButton = ({ type, label, active, onPress }) => (
    <TouchableOpacity style={[styles.filterButton, active && styles.activeFilter]} onPress={onPress}>
      <Text style={[styles.filterText, active && styles.activeFilterText]}>{label}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirimler</Text>
        <TouchableOpacity>
          <Ionicons name="checkmark-done-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FilterButton type="all" label="Tümü" active={filter === "all"} onPress={() => setFilter("all")} />
        <FilterButton type="tasks" label="Görevler" active={filter === "tasks"} onPress={() => setFilter("tasks")} />
        <FilterButton
          type="messages"
          label="Mesajlar"
          active={filter === "messages"}
          onPress={() => setFilter("messages")}
        />
        <FilterButton type="system" label="Sistem" active={filter === "system"} onPress={() => setFilter("system")} />
      </View>

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.notificationsList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
  filtersContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  activeFilter: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "white",
  },
  notificationsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  unreadCard: {
    backgroundColor: "#f0fdf4",
    borderColor: "#10b981",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ef4444",
    borderWidth: 2,
    borderColor: "white",
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
})
