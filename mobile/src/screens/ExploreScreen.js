"use client"

import { useState, useEffect } from "react"
import {
  View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions, Modal
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "../contexts/AuthContext"
import { useThemeColors } from "../store/themeStore"

const { width } = Dimensions.get("window")

export default function ExploreScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState([])
  const [featuredItems, setFeaturedItems] = useState([])
  const { user, location } = useAuth()
  const colors = useThemeColors()
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [selectedCats, setSelectedCats] = useState(new Set())

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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Keşfet</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Ionicons name="search-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.muted, borderColor: colors.border, borderWidth: 2, borderRadius: 16 }]}>
        <Ionicons name="search-outline" size={20} color={colors.subtext} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Ne arıyorsunuz?"
          placeholderTextColor={colors.subtext}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => setFiltersVisible(true)}>
          <Ionicons name="options-outline" size={20} color={colors.subtext} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeTitle, { color: colors.text }]}>Merhaba {user?.name || "Komşu"}! 👋</Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.subtext }]}>Komşularınızla paylaşın, ihtiyacınızı karşılayın</Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Kategoriler</Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.categoryCard, { borderColor: item.color, backgroundColor: colors.surface }]}>
                <View style={[styles.categoryIcon, { backgroundColor: item.color + "20" }]}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={[styles.categoryName, { color: colors.text }]}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.categoriesGrid}
          />
        </View>

        {/* Featured Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Öne Çıkanlar</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ExploreAll", { items: featuredItems })}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredItems}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.itemCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.itemDescription, { color: colors.subtext }]}>{item.description}</Text>
                  <View style={styles.itemMeta}>
                    <Text style={[styles.itemPrice, { color: colors.primary }]}>{item.price}</Text>
                    <View style={styles.itemRating}>
                      <Ionicons name="star" size={14} color="#fbbf24" />
                      <Text style={[styles.ratingText, { color: colors.subtext }]}>{item.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.itemFooter}>
                    <Text style={[styles.itemDistance, { color: colors.subtext }]}>📍 {item.distance}</Text>
                    <Text style={[styles.itemOwner, { color: colors.subtext }]}>👤 {item.owner}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.itemsList}
          />
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={filtersVisible} animationType="slide" transparent onRequestClose={() => setFiltersVisible(false)}>
        <View style={{ flex: 1, backgroundColor: "#00000066", justifyContent: "flex-end" }}>
          <View style={{ backgroundColor: colors.surface, borderRadius: 20, padding: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: "700" }}>Filtreler</Text>
              <TouchableOpacity onPress={() => setFiltersVisible(false)}>
                <Ionicons name="close" size={22} color={colors.subtext} />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
              <TextInput
                style={{ flex: 1, height: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, color: colors.text, backgroundColor: colors.muted }}
                placeholder="Min ₺"
                placeholderTextColor={colors.subtext}
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
              />
              <TextInput
                style={{ flex: 1, height: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, color: colors.text, backgroundColor: colors.muted }}
                placeholder="Maks ₺"
                placeholderTextColor={colors.subtext}
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
              />
            </View>

            <Text style={{ color: colors.subtext, marginBottom: 12 }}>Kategoriler</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {categories.map((c) => {
                const active = selectedCats.has(c.id)
                return (
                  <TouchableOpacity
                    key={c.id}
                    onPress={() => {
                      const next = new Set(selectedCats)
                      active ? next.delete(c.id) : next.add(c.id)
                      setSelectedCats(next)
                    }}
                    style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: active ? c.color : colors.border, backgroundColor: active ? c.color + "22" : colors.surface }}
                  >
                    <Text style={{ color: active ? c.color : colors.text, fontWeight: "600" }}>{c.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
              <TouchableOpacity onPress={() => { setSelectedCats(new Set()); setMinPrice(""); setMaxPrice(""); }}><Text style={{ color: colors.subtext }}>Sıfırla</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setFiltersVisible(false)}><Text style={{ color: colors.primary, fontWeight: "700" }}>Uygula</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    borderBottomWidth: 1,
  },
  backButton: { padding: 4, marginRight: 6 },
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
  itemsList: { paddingHorizontal: 20 },
  itemCard: {
    width: (width - 40),
    alignSelf: "center",
    marginBottom: 16,
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
})
