"use client"

import { useMemo, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
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
            <Ionicons name="star" size={14} color="#fbbf24" />
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
        <Ionicons name="search-outline" size={18} color={colors.subtext} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Ara..."
          placeholderTextColor={colors.subtext}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={18} color={colors.subtext} />
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
        <View style={{ flex: 1, margin: 16, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: colors.border }}>
          <MapView style={{ flex: 1 }} initialRegion={{ latitude: 41.0082, longitude: 28.9784, latitudeDelta: 0.02, longitudeDelta: 0.02 }}>
            {filtered.map((i) => (
              <Marker key={i.id} coordinate={i.location || { latitude: 41.0082, longitude: 28.9784 }}>
                <View style={{ backgroundColor: colors.primary, padding: 6, borderRadius: 8 }}>
                  <Ionicons name="pricetag-outline" size={14} color="#fff" />
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
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 50, paddingBottom: 12, borderBottomWidth: 1 },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  searchBar: { flexDirection: "row", alignItems: "center", gap: 8, margin: 16, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, height: 44 },
  input: { flex: 1, fontSize: 16 },
  filterBtn: { padding: 4 },
  list: { paddingHorizontal: 12, paddingBottom: 24 },
  card: { flex: 1, margin: 4, borderRadius: 12, borderWidth: 1, overflow: "hidden" },
  image: { width: "100%", height: 140, backgroundColor: "#222" },
  info: { padding: 12 },
  title: { fontSize: 14, fontWeight: "700", marginBottom: 2 },
  desc: { fontSize: 12, marginBottom: 8 },
  meta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  price: { fontSize: 14, fontWeight: "700" },
  rating: { flexDirection: "row", alignItems: "center" },
  ratingText: { marginLeft: 4, fontSize: 12 },
})