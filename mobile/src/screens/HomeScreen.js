"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../contexts/AuthContext"

const { width, height } = Dimensions.get("window")

export default function HomeScreen({ navigation }) {
  const [viewMode, setViewMode] = useState("list") // "list" or "map"
  const [tasks, setTasks] = useState([])
  const [nearbyTasks, setNearbyTasks] = useState([])
  const { user, location } = useAuth()

  useEffect(() => {
    loadTasks()
    loadNearbyTasks()
  }, [])

  const loadTasks = () => {
    setTasks([
      {
        id: 1,
        title: "Köpek Gezdirme",
        description: "Akşam saatlerinde köpeğimi gezdirmek için yardım arıyorum",
        category: "pet",
        distance: "0.3 km",
        time: "18:00-19:00",
        price: "₺25",
        urgent: true,
        user: {
          name: "Ayşe K.",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
          rating: 4.8,
        },
        location: {
          latitude: 41.0082,
          longitude: 28.9784,
        },
      },
      {
        id: 2,
        title: "Market Alışverişi",
        description: "Yaşlı annem için market alışverişi yapacak birini arıyorum",
        category: "shopping",
        distance: "0.7 km",
        time: "10:00-12:00",
        price: "₺40",
        urgent: false,
        user: {
          name: "Mehmet A.",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
          rating: 4.9,
        },
        location: {
          latitude: 41.0092,
          longitude: 28.9794,
        },
      },
      {
        id: 3,
        title: "Çöp Çıkarma",
        description: "Bu hafta çöplerimi çıkaramayacağım, yardım eder misiniz?",
        category: "cleaning",
        distance: "0.1 km",
        time: "07:00-08:00",
        price: "₺15",
        urgent: false,
        user: {
          name: "Fatma S.",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
          rating: 4.7,
        },
        location: {
          latitude: 41.0072,
          longitude: 28.9774,
        },
      },
    ])
  }

  const loadNearbyTasks = () => {
    setNearbyTasks([
      { id: 1, title: "Acil Eczane Yardımı", distance: "0.2 km", urgent: true },
      { id: 2, title: "Kedi Maması", distance: "0.4 km", urgent: false },
      { id: 3, title: "Elektrik Tamiri", distance: "0.6 km", urgent: true },
    ])
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "pet":
        return "paw-outline"
      case "shopping":
        return "bag-outline"
      case "cleaning":
        return "trash-outline"
      default:
        return "help-outline"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "pet":
        return "#f59e0b"
      case "shopping":
        return "#10b981"
      case "cleaning":
        return "#3b82f6"
      default:
        return "#6b7280"
    }
  }

  const renderTaskCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskCard, item.urgent && styles.urgentCard]}
      onPress={() => navigation.navigate("PostDetail", { task: item })}
    >
      {item.urgent && (
        <View style={styles.urgentBadge}>
          <Text style={styles.urgentText}>ACİL</Text>
        </View>
      )}

      <View style={styles.taskHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(item.category) + "20" }]}>
          <Ionicons name={getCategoryIcon(item.category)} size={20} color={getCategoryColor(item.category)} />
        </View>
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDistance}>📍 {item.distance}</Text>
        </View>
        <Text style={styles.taskPrice}>{item.price}</Text>
      </View>

      <Text style={styles.taskDescription}>{item.description}</Text>

      <View style={styles.taskFooter}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
          <View>
            <Text style={styles.userName}>{item.user.name}</Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={12} color="#fbbf24" />
              <Text style={styles.ratingText}>{item.user.rating}</Text>
            </View>
          </View>
        </View>
        <View style={styles.timeInfo}>
          <Ionicons name="time-outline" size={14} color="#666" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="#10b981" />
          <Text style={styles.locationText}>Kadıköy, İstanbul</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.viewToggle} onPress={() => setViewMode(viewMode === "list" ? "map" : "list")}>
            <Ionicons name={viewMode === "list" ? "map-outline" : "list-outline"} size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Merhaba {user?.name || "Komşu"}! 👋</Text>
        <Text style={styles.welcomeSubtitle}>Bugün nasıl yardımlaşalım?</Text>
      </View>

      {/* Quick Stats */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Aktif Görev</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Yakındaki</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Acil</Text>
        </View>
      </ScrollView>

      {/* View Toggle */}
      {viewMode === "map" ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location?.coords?.latitude || 41.0082,
              longitude: location?.coords?.longitude || 28.9784,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {tasks.map((task) => (
              <Marker
                key={task.id}
                coordinate={task.location}
                onPress={() => navigation.navigate("PostDetail", { task })}
              >
                <View style={[styles.mapMarker, { backgroundColor: getCategoryColor(task.category) }]}>
                  <Ionicons name={getCategoryIcon(task.category)} size={16} color="white" />
                </View>
              </Marker>
            ))}
          </MapView>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTaskCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.tasksList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("PostNew")}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
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
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  viewToggle: {
    padding: 4,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  statsContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: "center",
    minWidth: 80,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  mapMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  tasksList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    position: "relative",
  },
  urgentCard: {
    borderColor: "#ef4444",
    borderWidth: 2,
  },
  urgentBadge: {
    position: "absolute",
    top: -8,
    right: 16,
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  urgentText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  taskDistance: {
    fontSize: 12,
    color: "#666",
  },
  taskPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  ratingText: {
    fontSize: 10,
    color: "#666",
    marginLeft: 2,
  },
  timeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
})
