"use client"

import React, { useRef, useState, useEffect } from "react"
import { Sizes, getSize, getFontSize, platformValues } from "../utils/dimensions"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../contexts/AuthContext"
import { useThemeColors } from "../store/themeStore"


export default function HomeScreen({ navigation }) {
  const [viewMode, setViewMode] = useState("list")
  const [tasks, setTasks] = useState([])
  const [nearbyTasks, setNearbyTasks] = useState([])
  const user = null // demo için
  const { location } = useAuth?.() || {}
  const fabSize = getSize(56, 64) // FAB boyutu (HATA: fabSize undefined -> fix)
  const mapRef = useRef(null)
  const colors = useThemeColors()

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

  const recenterToUser = () => { // HATA: recenterToUser undefined -> fix
    const lat = location?.coords?.latitude ?? 41.0082
    const lng = location?.coords?.longitude ?? 28.9784
    mapRef.current?.animateToRegion(
      { latitude: lat, longitude: lng, latitudeDelta: 0.01, longitudeDelta: 0.01 },
      600
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={Sizes.icon.m} color={colors.primary} />
          <Text style={[styles.locationText, { color: colors.text }]}>Kadıköy, İstanbul</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{ marginLeft: Sizes.spacing.m }}>
            <Ionicons name="settings-outline" size={Sizes.icon.l} color={colors.subtext} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")} style={{ marginLeft: Sizes.spacing.m }}>
            <Ionicons name="notifications-outline" size={Sizes.icon.l} color={colors.subtext} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={[styles.welcomeTitle, { color: colors.text }]}>Merhaba {user?.name || "Komşu"}! 👋</Text>
        <Text style={[styles.welcomeSubtitle, { color: colors.subtext }]}>Bugün nasıl yardımlaşalım?</Text>
      </View>

      {/* Quick Stats */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.subtext }]}>Aktif Görev</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>8</Text>
          <Text style={[styles.statLabel, { color: colors.subtext }]}>Yakındaki</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>3</Text>
          <Text style={[styles.statLabel, { color: colors.subtext }]}>Acil</Text>
        </View>
      </ScrollView>

      {/* Araçlar (Harita/Liste butonu sağda) */}
      <View style={styles.toolsRow}>
        <TouchableOpacity style={styles.mapToggleBtn} onPress={() => setViewMode(viewMode === "list" ? "map" : "list")}>
          <Ionicons name={viewMode === "list" ? "map-outline" : "list-outline"} size={Sizes.icon.m} color="#10b981" />
          <Text style={styles.mapToggleText}>{viewMode === "list" ? "Harita" : "Liste"}</Text>
        </TouchableOpacity>
      </View>

      {/* İçerik */}
      {viewMode === "map" ? (
        <View style={[styles.mapContainer, { height: Math.max(getSize(220, 300), Sizes.screenHeight * 0.26), backgroundColor: colors.surface, borderColor: colors.border }]}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location?.coords?.latitude ?? 41.0082,
              longitude: location?.coords?.longitude ?? 28.9784,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {tasks.map((task) => (
              <Marker key={task.id} coordinate={task.location} onPress={() => navigation.navigate("PostDetail", { task })}>
                <View style={[styles.mapMarker, { backgroundColor: getCategoryColor(task.category) }]}>
                  <Ionicons name={getCategoryIcon(task.category)} size={Sizes.icon.s} color="#fff" />
                </View>
              </Marker>
            ))}
          </MapView>

          <TouchableOpacity style={[styles.recenterBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={recenterToUser}>
            <Ionicons name="locate" size={Sizes.icon.m} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.taskCard,
                item.urgent && styles.urgentCard,
                { backgroundColor: colors.surface, borderColor: item.urgent ? "#ef4444" : colors.border },
              ]}
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
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.tasksList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { width: fabSize, height: fabSize, borderRadius: fabSize / 2, backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate("PostNew")}
      >
        <Ionicons name="add" size={Sizes.icon.l} color="#fff" />
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
    paddingHorizontal: Sizes.spacing.l,
    paddingTop: platformValues.statusBarHeight + Sizes.spacing.l,
    paddingBottom: Sizes.spacing.m,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: Sizes.spacing.s,
    fontSize: getFontSize(16, 18),
    color: "#1a1a1a",
    fontWeight: "500",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewToggle: {
    padding: Sizes.spacing.xs,
  },
  welcomeSection: {
    paddingHorizontal: Sizes.spacing.l,
    marginBottom: Sizes.spacing.l,
  },
  welcomeTitle: {
    fontSize: getFontSize(24, 28),
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: Sizes.spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: getFontSize(16, 18),
    color: "#666",
  },

  // Quick stats: daha kompakt, yüksekliği az
  statsContainer: {
    paddingLeft: Sizes.spacing.l,
    marginBottom: Sizes.spacing.m,
    paddingVertical: Sizes.spacing.xs,
  },
  statCard: {
    backgroundColor: "#f8f9fa",
    paddingVertical: Sizes.spacing.s,
    paddingHorizontal: Sizes.spacing.m,
    borderRadius: Sizes.borderRadius.m,
    marginRight: Sizes.spacing.m,
    alignItems: "center",
    minWidth: getSize(88, 100),
    minHeight: getSize(64, 72), // rahat nefes alan
    justifyContent: "center",
  },
  statNumber: {
    fontSize: getFontSize(18, 20),
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: Sizes.spacing.xs,
  },
  statLabel: {
    fontSize: getFontSize(12, 14),
    color: "#666",
  },

  mapContainer: {
    marginHorizontal: Sizes.spacing.l,
    marginBottom: Sizes.spacing.l,
    borderRadius: Sizes.borderRadius.l,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: Sizes.borderWidth.thin,
    borderColor: "#ececec",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  map: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0, // tam doldur
  },
  recenterBtn: {
    position: "absolute",
    top: Sizes.spacing.m,
    right: Sizes.spacing.m,
    backgroundColor: "#fff",
    borderRadius: Sizes.borderRadius.circle,
    padding: Sizes.spacing.s,
    borderWidth: Sizes.borderWidth.default,
    borderColor: "#e5e5e5",
  },
  mapMarker: {
    width: getSize(32, 40),
    height: getSize(32, 40),
    borderRadius: getSize(32, 40) / 2,
    justifyContent: "center",
    alignItems: "center",
  },

  tasksList: {
    paddingHorizontal: Sizes.spacing.l,
    paddingBottom: getSize(80, 100),
  },
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: Sizes.borderRadius.l,
    padding: Sizes.spacing.m,
    marginBottom: Sizes.spacing.m,
    borderWidth: Sizes.borderWidth.default,
    borderColor: "#e1e1e1",
    position: "relative",
  },
  urgentCard: {
    borderColor: "#ef4444",
    borderWidth: Sizes.borderWidth.thick,
  },
  urgentBadge: {
    position: "absolute",
    top: -Sizes.spacing.xs,
    right: Sizes.spacing.l,
    backgroundColor: "#ef4444",
    paddingHorizontal: Sizes.spacing.s,
    paddingVertical: Sizes.spacing.xs,
    borderRadius: Sizes.borderRadius.m,
  },
  urgentText: {
    color: "white",
    fontSize: getFontSize(10, 12),
    fontWeight: "bold",
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Sizes.spacing.s,
  },
  categoryIcon: {
    width: getSize(40, 48),
    height: getSize(40, 48),
    borderRadius: getSize(40, 48) / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Sizes.spacing.m,
  },
  taskInfo: { flex: 1 },
  taskTitle: {
    fontSize: getFontSize(16, 18),
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: Sizes.spacing.xs,
  },
  taskDistance: {
    fontSize: getFontSize(12, 14),
    color: "#666",
  },
  taskPrice: {
    fontSize: getFontSize(16, 18),
    fontWeight: "bold",
    color: "#10b981",
  },
  taskDescription: {
    fontSize: getFontSize(14, 16),
    color: "#666",
    marginBottom: Sizes.spacing.m,
    lineHeight: getSize(20, 22),
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
    width: getSize(32, 40),
    height: getSize(32, 40),
    borderRadius: getSize(32, 40) / 2,
    marginRight: Sizes.spacing.s,
  },
  userName: {
    fontSize: getFontSize(12, 14),
    fontWeight: "500",
    color: "#1a1a1a",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Sizes.spacing.xs / 2,
  },
  ratingText: {
    fontSize: getFontSize(10, 12),
    color: "#666",
    marginLeft: Sizes.spacing.xs,
  },
  timeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: getFontSize(12, 14),
    color: "#666",
    marginLeft: Sizes.spacing.xs,
  },
  fab: {
    position: "absolute",
    bottom: getSize(30, 40),
    right: getSize(20, 28),
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  toolsRow: {
    paddingHorizontal: Sizes.spacing.l,
    marginBottom: Sizes.spacing.s,
    alignItems: "flex-end",
  },
  mapToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Sizes.spacing.m,
    paddingVertical: Sizes.spacing.xs,
    borderRadius: Sizes.borderRadius.m,
    borderWidth: Sizes.borderWidth.default,
    borderColor: "#e1e1e1",
    backgroundColor: "#fff",
  },
  mapToggleText: { marginLeft: Sizes.spacing.xs / 2, color: "#10b981", fontWeight: "600" },
})
