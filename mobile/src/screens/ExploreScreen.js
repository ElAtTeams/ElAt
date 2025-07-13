"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../contexts/AuthContext"

const { width } = Dimensions.get("window")

export default function ExploreScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState([])
  const [featuredItems, setFeaturedItems] = useState([])
  const { user, location } = useAuth()

  useEffect(() => {
    loadCategories()
    loadFeaturedItems()
  }, [])

  const loadCategories = () => {
    setCategories([
      { id: 1, name: "Mutfak", icon: "restaurant-outline", color: "#10b981" },
      { id: 2, name: "Araçlar", icon: "build-outline", color: "#f59e0b" },
      { id: 3, name: "Bahçe", icon: "leaf-outline", color: "#22c55e" },
      { id: 4, name: "Spor", icon: "fitness-outline", color: "#3b82f6" },
      { id: 5, name: "Elektronik", icon: "phone-portrait-outline", color: "#8b5cf6" },
      { id: 6, name: "Ev Eşyası", icon: "home-outline", color: "#ef4444" },
    ])
  }

  const loadFeaturedItems = () => {
    setFeaturedItems([
      {
        id: 1,
        title: "Pasta Makinesi",
        description: "Marcato Atlas, az kullanılmış",
        price: "₺15/gün",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300",
        distance: "0.5 km",
        rating: 4.8,
        owner: "Mehmet K.",
      },
      {
        id: 2,
        title: "Matkap Seti",
        description: "Bosch Professional, tam set",
        price: "₺25/gün",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300",
        distance: "1.2 km",
        rating: 4.9,
        owner: "Ayşe M.",
      },
    ])
  }

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { borderColor: item.color }]}
      onPress={() => navigation.navigate("Category", { category: item })}
    >
      <View style={[styles.categoryIcon, { backgroundColor: item.color + "20" }]}>
        <Ionicons name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  )

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity style={styles.itemCard} onPress={() => navigation.navigate("ItemDetail", { item })}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.itemMeta}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <View style={styles.itemRating}>
            <Ionicons name="star" size={14} color="#fbbf24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.itemFooter}>
          <Text style={styles.itemDistance}>📍 {item.distance}</Text>
          <Text style={styles.itemOwner}>👤 {item.owner}</Text>
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
          <Text style={styles.locationText}>{location ? "Mevcut konum" : "Konum alınıyor..."}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={28} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Ne arıyorsunuz?"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Merhaba {user?.name || "Komşu"}! 👋</Text>
          <Text style={styles.welcomeSubtitle}>Komşularınızla paylaşın, ihtiyacınızı karşılayın</Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.categoriesGrid}
          />
        </View>

        {/* Featured Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Öne Çıkanlar</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredItems}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate("AddPost")}>
              <Ionicons name="add-circle-outline" size={24} color="#10b981" />
              <Text style={styles.quickActionText}>İlan Ver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate("MutualAid")}>
              <Ionicons name="heart-outline" size={24} color="#ef4444" />
              <Text style={styles.quickActionText}>Yardımlaş</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate("Messages")}>
              <Ionicons name="chatbubble-outline" size={24} color="#3b82f6" />
              <Text style={styles.quickActionText}>Mesajlar</Text>
            </TouchableOpacity>
          </View>
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
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
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
    height: 48,
    fontSize: 16,
    color: "#1a1a1a",
  },
  filterButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
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
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: "#10b981",
    fontWeight: "600",
  },
  categoriesGrid: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    margin: 6,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1a1a1a",
    textAlign: "center",
  },
  featuredList: {
    paddingLeft: 20,
  },
  itemCard: {
    width: width * 0.7,
    marginRight: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: 160,
    backgroundColor: "#f3f4f6",
  },
  itemInfo: {
    padding: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10b981",
  },
  itemRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemDistance: {
    fontSize: 12,
    color: "#666",
  },
  itemOwner: {
    fontSize: 12,
    color: "#666",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  quickAction: {
    alignItems: "center",
    padding: 16,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
})
