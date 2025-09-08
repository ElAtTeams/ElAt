"use client"
import { useState } from "react"
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useThemeColors } from "../store/themeStore"

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const colors = useThemeColors()

  const handleSearch = (text) => {
    setQuery(text)
    // Burada gerçek arama yapılabilir
    setResults(text ? [{ id: 1, title: "Köpek Gezdirme" }] : [])
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Ara..."
          placeholderTextColor={colors.subtext}
          value={query}
          onChangeText={handleSearch}
          autoFocus
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.result, { backgroundColor: colors.surface }]} onPress={() => navigation.navigate("PostDetail", { taskId: item.id })}>
            <Ionicons name="search-outline" size={20} color={colors.primary} />
            <Text style={{ color: colors.text, marginLeft: 8 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ color: colors.subtext, textAlign: "center", marginTop: 32 }}>Sonuç yok</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", borderBottomWidth: 1, padding: 12 },
  input: { flex: 1, fontSize: 18, marginLeft: 12 },
  result: { flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderColor: "#eee" },
})