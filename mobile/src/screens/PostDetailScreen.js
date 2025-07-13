"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import MapView, { Marker } from "react-native-maps"

const { width } = Dimensions.get("window")

export default function PostDetailScreen({ navigation, route }) {
  const { taskId } = route.params || {};
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    setLoading(true);
    try {
      // Simüle edilmiş API çağrısı
      const mockTask = {
        id: taskId || 1,
        title: "Köpek Gezdirme",
        description: "Akşam saatlerinde köpeğimi gezdirmek için yardım arıyorum",
        category: "pet",
        distance: "0.3 km",
        time: "18:00-19:00",
        price: "₺25",
        urgent: true,
        images: [
          "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
          "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
        ],
        user: {
          name: "Ayşe K.",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
          rating: 4.8,
          reviewCount: 23,
        },
        location: {
          latitude: 41.0082,
          longitude: 28.9784,
        },
      };

      // Simüle edilmiş gecikme
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTask(mockTask);
    } catch (error) {
      console.error('Error loading task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (applied) return

    Alert.alert("Göreve Başvur", "Bu göreve başvurmak istediğinizden emin misiniz?", [
      { text: "İptal", style: "cancel" },
      {
        text: "Başvur",
        onPress: async () => {
          setLoading(true)
          try {
            // API call to apply for task
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setApplied(true)
            Alert.alert("Başarılı!", "Başvurunuz gönderildi")
          } catch (error) {
            Alert.alert("Hata", "Başvuru gönderilirken bir hata oluştu")
          } finally {
            setLoading(false)
          }
        },
      },
    ])
  }

  const handleMessage = () => {
    navigation.navigate("Chat", {
      userId: task.user.id,
      userName: task.user.name,
      taskId: task.id,
    })
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.errorContainer}>
        <Text>Görev bulunamadı</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="share-outline" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="heart-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Images */}
        {task.images && task.images.length > 0 && (
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {task.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.taskImage} />
            ))}
          </ScrollView>
        )}

        <View style={styles.taskContent}>
          {/* Title and Category */}
          <View style={styles.titleSection}>
            {task.urgent && (
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>ACİL</Text>
              </View>
            )}
            <View style={styles.categoryTag}>
              <Ionicons name={getCategoryIcon(task.category)} size={16} color={getCategoryColor(task.category)} />
              <Text style={[styles.categoryText, { color: getCategoryColor(task.category) }]}>
                {task.category === "pet" ? "Evcil Hayvan" : task.category}
              </Text>
            </View>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskPrice}>{task.price}</Text>
          </View>

          {/* Task Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                {task.date} • {task.time}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                {task.location.address} • {task.distance}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="eye-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                {task.views} görüntüleme • {task.applicants} başvuru
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Açıklama</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>

          {/* User Info */}
          <View style={styles.userSection}>
            <Text style={styles.sectionTitle}>Görev Sahibi</Text>
            <View style={styles.userCard}>
              <Image source={{ uri: task.user.avatar }} style={styles.userAvatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{task.user.name}</Text>
                <View style={styles.userRating}>
                  <Ionicons name="star" size={14} color="#fbbf24" />
                  <Text style={styles.ratingText}>
                    {task.user.rating} ({task.user.reviewCount} değerlendirme)
                  </Text>
                </View>
                <Text style={styles.joinDate}>{task.user.joinDate}</Text>
                <View style={styles.badges}>
                  {task.user.badges.map((badge, index) => (
                    <View key={index} style={styles.badge}>
                      <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate("Profile", { userId: task.user.id })}
              >
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Map */}
          <View style={styles.mapSection}>
            <Text style={styles.sectionTitle}>Konum</Text>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: task.location.latitude,
                  longitude: task.location.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker coordinate={task.location}>
                  <View style={[styles.mapMarker, { backgroundColor: getCategoryColor(task.category) }]}>
                    <Ionicons name={getCategoryIcon(task.category)} size={16} color="white" />
                  </View>
                </Marker>
              </MapView>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
          <Ionicons name="chatbubble-outline" size={20} color="#10b981" />
          <Text style={styles.messageButtonText}>Mesaj</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.applyButton, applied && styles.appliedButton]}
          onPress={handleApply}
          disabled={loading || applied}
        >
          <Text style={[styles.applyButtonText, applied && styles.appliedButtonText]}>
            {loading ? "Gönderiliyor..." : applied ? "Başvuru Gönderildi" : "Göreve Başvur"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    marginTop: 20,
    color: "#10b981",
    textDecorationLine: "underline",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  taskImage: {
    width: width,
    height: 250,
    backgroundColor: "#f3f4f6",
  },
  taskContent: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  urgentBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#ef4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  urgentText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  categoryTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
    marginBottom: 12,
  },
  categoryText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  taskPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10b981",
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  userSection: {
    marginBottom: 24,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    backgroundColor: "#f8f9fa",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  userRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  joinDate: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  badge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    color: "white",
    fontWeight: "500",
  },
  profileButton: {
    padding: 4,
  },
  mapSection: {
    marginBottom: 20,
  },
  mapContainer: {
    height: 200,
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
  bottomActions: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    backgroundColor: "#fff",
    gap: 12,
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#10b981",
    backgroundColor: "#fff",
  },
  messageButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#10b981",
    fontWeight: "600",
  },
  applyButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#10b981",
  },
  appliedButton: {
    backgroundColor: "#22c55e",
  },
  applyButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  appliedButtonText: {
    color: "white",
  },
})
