"use client"

import { useMemo, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import MapView, { Marker } from "react-native-maps"
import { Sizes, getFontSize, getSize, platformValues } from "../utils/dimensions"
import { useThemeColors } from "../store/themeStore"

export default function ExploreAllScreen({ navigation, route }) {
  const colors = useThemeColors()
  const [query, setQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid") // "grid" | "map"
  const items = route.params?.items || []

  const data = items.length
    ? items
    : [
        { id: 1, title: "Pasta Makinesi", description: "Marcato Atlas", price: "₺15/gün", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300", distance: "0.5 km", rating: 4.8, owner: "Mehmet K.", location: { latitude: 41.009, longitude: 28.98 } },
        { id: 2, title: "Matkap Seti", description: "Bosch Professional", price: "₺25/gün", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300", distance: "1.2 km", rating: 4.9, owner: "Ayşe M.", location: { latitude: 41.006, longitude: 28.983 } },
      ]

  const filtered = useMemo(
    () => data.filter((i) => i.title.toLowerCase().includes(query.toLowerCase())),
    [data, query]
  )

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.desc, { color: colors.subtext }]}>{item.description}</Text>
        <View style={styles.meta}>
          <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={Sizes.icon.s} color="#fbbf24" />
            <Text style={[styles.ratingText, { color: colors.subtext }]}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Tüm İlanlar</Text>
        <TouchableOpacity onPress={() => setViewMode(viewMode === "grid" ? "map" : "grid")}>
          <Ionicons name={viewMode === "grid" ? "map-outline" : "grid-outline"} size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchBar, { backgroundColor: colors.muted, borderColor: colors.border }]}>
        <Ionicons name="search-outline" size={Sizes.icon.m} color={colors.subtext} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Ara..."
          placeholderTextColor={colors.subtext}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={Sizes.icon.m} color={colors.subtext} />
        </TouchableOpacity>
      </View>

      {viewMode === "grid" ? (
        <FlatList
          data={filtered}
          numColumns={2}
          key={"grid"}
          keyExtractor={(i) => i.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{ flex: 1, margin: Sizes.spacing.l, borderRadius: Sizes.borderRadius.l, overflow: "hidden" }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{ latitude: 41.0082, longitude: 28.9784, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
          >
            {filtered.map((i) => (
              <Marker key={i.id} coordinate={i.location || { latitude: 41.0082, longitude: 28.9784 }}>
                <View style={{ backgroundColor: "#10b981", padding: Sizes.spacing.xs, borderRadius: Sizes.borderRadius.s }}>
                  <Ionicons name="pricetag-outline" size={Sizes.icon.s} color="#fff" />
                </View>
              </Marker>
            ))}
          </MapView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.spacing.l,
    paddingTop: platformValues.statusBarHeight + Sizes.spacing.l,
    paddingBottom: Sizes.spacing.m,
  },
  headerTitle: { fontSize: getFontSize(18, 20), fontWeight: "700", color: "#1a1a1a" },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: Sizes.spacing.s,
    marginHorizontal: Sizes.spacing.l,
    marginBottom: Sizes.spacing.s,
    paddingHorizontal: Sizes.spacing.m,
    borderRadius: Sizes.borderRadius.l,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    backgroundColor: "#f8f9fa",
    height: Sizes.input.height,
  },
  input: { flex: 1, fontSize: getFontSize(16, 18), color: "#1a1a1a" },
  filterBtn: { padding: Sizes.spacing.xs },

  list: { paddingHorizontal: Sizes.spacing.l, paddingBottom: Sizes.spacing.l },
  card: {
    flex: 1,
    margin: Sizes.spacing.xs,
    borderRadius: Sizes.borderRadius.l,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image: { width: "100%", height: getSize(120, 150), backgroundColor: "#f3f4f6" },
  info: { padding: Sizes.spacing.m },
  title: { fontSize: getFontSize(14, 16), fontWeight: "700", color: "#1a1a1a", marginBottom: Sizes.spacing.xs },
  desc: { fontSize: getFontSize(12, 14), color: "#666", marginBottom: Sizes.spacing.s },
  meta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  price: { fontSize: getFontSize(14, 16), color: "#10b981", fontWeight: "700" },
  rating: { flexDirection: "row", alignItems: "center" },
  ratingText: { marginLeft: 4, color: "#666" },
})