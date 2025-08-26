"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../contexts/AuthContext"

const { width } = Dimensions.get("window")

export default function ProfileScreen({ navigation, route }) {
  const { userId } = route.params || {}
  const { user: currentUser } = useAuth()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({})
  const [activeTab, setActiveTab] = useState("posts") // "posts", "reviews", "badges"

  const isOwnProfile = !userId || userId === currentUser?.id

  useEffect(() => {
    loadUserProfile()
    loadUserStats()
  }, [userId])

  const loadUserProfile = () => {
    // API call to load user profile
    setUser({
      id: userId || currentUser?.id,
      name: isOwnProfile ? currentUser?.name : "Mehmet Aydın",
      avatar: isOwnProfile ? currentUser?.avatar : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
      bio: "Mahallemizde yardımlaşmayı seven, güvenilir bir komşu. Her zaman elimden geldiğince yardım etmeye hazırım.",
      location: "Kadıköy, İstanbul",
      joinDate: "Ocak 2023",
      rating: 4.8,
      reviewCount: 23,
      badges: [
        { id: 1, name: "Güvenilir Komşu", icon: "shield-checkmark", color: "#10b981" },
        { id: 2, name: "Hayvan Sever", icon: "paw", color: "#f59e0b" },
        { id: 3, name: "Yardımsever", icon: "heart", color: "#ef4444" },
        { id: 4, name: "Hızlı Yanıt", icon: "flash", color: "#3b82f6" },
      ],
      posts: [
        {
          id: 1,
          title: "Köpek Gezdirme",
          category: "pet",
          price: "₺25",
          image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300",
          status: "active",
        },
        {
          id: 2,
          title: "Market Alışverişi",
          category: "shopping",
          price: "₺40",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300",
          status: "completed",
        },
      ],
      reviews: [
        {
          id: 1,
          reviewer: {
            name: "Ayşe K.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
          },
          rating: 5,
          comment: "Çok güvenilir ve yardımsever bir komşu. Kesinlikle tavsiye ederim!",
          date: "2 gün önce",
          task: "Köpek Gezdirme",
        },
        {
          id: 2,
          reviewer: {
            name: "Fatma S.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
          },
          rating: 5,
          comment: "Market alışverişimi çok özenli bir şekilde yaptı. Teşekkürler!",
          date: "1 hafta önce",
          task: "Market Alışverişi",
        },
      ],
    })
  }

  const loadUserStats = () => {
    setStats({
      totalTasks: 15,
      completedTasks: 12,
      helpedPeople: 8,
      responseTime: "2 saat",
      successRate: 95,
    })
  }

  const renderPosts = () => (
    <View style={styles.postsGrid}>
      {user.posts.map((post) => (
        <TouchableOpacity
          key={post.id}
          style={styles.postCard}
          onPress={() => navigation.navigate("PostDetail", { task: post })}
        >
          <Image source={{ uri: post.image }} style={styles.postImage} />
          <View style={styles.postInfo}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postPrice}>{post.price}</Text>
            <View style={[styles.statusBadge, post.status === "active" ? styles.activeBadge : styles.completedBadge]}>
              <Text style={[styles.statusText, post.status === "active" ? styles.activeText : styles.completedText]}>
                {post.status === "active" ? "Aktif" : "Tamamlandı"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )

  const renderReviews = () => (
    <View style={styles.reviewsList}>
      {user.reviews.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Image source={{ uri: review.reviewer.avatar }} style={styles.reviewerAvatar} />
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>{review.reviewer.name}</Text>
              <View style={styles.reviewRating}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons key={i} name="star" size={12} color={i < review.rating ? "#fbbf24" : "#e5e7eb"} />
                ))}
              </View>
              <Text style={styles.reviewDate}>
                {review.date} • {review.task}
              </Text>
            </View>
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
      ))}
    </View>
  )

  const renderBadges = () => (
    <View style={styles.badgesGrid}>
      {user.badges.map((badge) => (
        <View key={badge.id} style={styles.badgeCard}>
          <View style={[styles.badgeIcon, { backgroundColor: badge.color + "20" }]}>
            <Ionicons name={badge.icon} size={24} color={badge.color} />
          </View>
          <Text style={styles.badgeName}>{badge.name}</Text>
        </View>
      ))}
    </View>
  )

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Yükleniyor...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
        <View style={styles.headerRight}>
          {isOwnProfile && (
            <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")} style={styles.headerIcon}>
              <Ionicons name="create-outline" size={24} color="#666" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.headerIcon}>
            <Ionicons name="settings-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatar }} style={styles.profileAvatar} />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileLocation}>📍 {user.location}</Text>
          <Text style={styles.profileBio}>{user.bio}</Text>

          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.rating}</Text>
              <Text style={styles.statLabel}>Puan</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.reviewCount}</Text>
              <Text style={styles.statLabel}>Değerlendirme</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.completedTasks}</Text>
              <Text style={styles.statLabel}>Tamamlanan</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.helpedPeople}</Text>
              <Text style={styles.statLabel}>Yardım Edilen</Text>
            </View>
          </View>

          {!isOwnProfile && (
            <View style={styles.profileActions}>
              <TouchableOpacity style={styles.messageButton}>
                <Ionicons name="chatbubble-outline" size={20} color="#10b981" />
                <Text style={styles.messageButtonText}>Mesaj Gönder</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "posts" && styles.activeTab]}
            onPress={() => setActiveTab("posts")}
          >
            <Text style={[styles.tabText, activeTab === "posts" && styles.activeTabText]}>
              İlanlar ({user.posts.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "reviews" && styles.activeTab]}
            onPress={() => setActiveTab("reviews")}
          >
            <Text style={[styles.tabText, activeTab === "reviews" && styles.activeTabText]}>
              Değerlendirmeler ({user.reviews.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "badges" && styles.activeTab]}
            onPress={() => setActiveTab("badges")}
          >
            <Text style={[styles.tabText, activeTab === "badges" && styles.activeTabText]}>
              Rozetler ({user.badges.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === "posts" && renderPosts()}
          {activeTab === "reviews" && renderReviews()}
          {activeTab === "badges" && renderBadges()}
        </View>
      </ScrollView>
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
  headerRight: { flexDirection: "row", alignItems: "center" },
  headerIcon: { marginLeft: 12 },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  profileBio: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
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
  profileActions: {
    width: "100%",
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#10b981",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#10b981",
    fontWeight: "600",
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  postCard: {
    width: (width - 52) / 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#f3f4f6",
  },
  postInfo: {
    padding: 12,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  postPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  activeBadge: {
    backgroundColor: "#10b981",
  },
  completedBadge: {
    backgroundColor: "#6b7280",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "500",
  },
  activeText: {
    color: "white",
  },
  completedText: {
    color: "white",
  },
  reviewsList: {
    gap: 16,
  },
  reviewCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    backgroundColor: "#f8f9fa",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: "row",
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
  },
  reviewComment: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  badgeCard: {
    width: (width - 52) / 2,
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    backgroundColor: "#f8f9fa",
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
  },
})
