import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TopNavigation() {
  const router = useRouter();
  const segments = useSegments();
  const activeTab = segments[segments.length - 1] || "home";

  return (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>
            Wallpaper<Text style={{ color: "#b8867a" }}>.</Text>
          </Text>
          <Text style={styles.headerSubtitle}>Explore 4K & Ultra HD</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="apps-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.topTabBar}>
        <TouchableOpacity
          style={[styles.tabChip, activeTab === "grid" && styles.activeTabChip]}
          onPress={() => router.push("/(tabs)/grid")}
        >
          <Ionicons
            name="grid-outline"
            size={16}
            color={activeTab === "grid" ? "#fff" : "#a0aec0"}
          />
          <Text
            style={[
              styles.chipText,
              activeTab === "grid" && styles.activeChipText,
            ]}
          >
            Categories
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabChip, activeTab === "home" && styles.activeTabChip]}
          onPress={() => router.push("/(tabs)/home")}
        >
          <Ionicons
            name="home-outline"
            size={16}
            color={activeTab === "home" ? "#fff" : "#a0aec0"}
          />
          <Text
            style={[
              styles.chipText,
              activeTab === "home" && styles.activeChipText,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabChip, activeTab === "new" && styles.activeTabChip]}
          onPress={() => router.push("/(tabs)/new")}
        >
          <MaterialCommunityIcons
            name="new-box"
            size={18}
            color={activeTab === "new" ? "#fff" : "#a0aec0"}
          />
          <Text
            style={[
              styles.chipText,
              activeTab === "new" && styles.activeChipText,
            ]}
          >
            New
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabChip,
            activeTab === "trending" && styles.activeTabChip,
          ]}
          onPress={() => router.push("/(tabs)/trending")}
        >
          <Ionicons
            name="flame"
            size={16}
            color={activeTab === "trending" ? "#fff" : "#a0aec0"}
          />
          <Text
            style={[
              styles.chipText,
              activeTab === "trending" && styles.activeChipText,
            ]}
          >
            Trending
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#121212",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#a0aec0",
    fontSize: 12,
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    backgroundColor: "#1e1e1e",
    padding: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  topTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tabChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
  },
  activeTabChip: {
    backgroundColor: "#b8867a",
  },
  chipText: {
    color: "#a0aec0",
    fontSize: 12,
    fontWeight: "600",
  },
  activeChipText: {
    color: "#ffffff",
  },
});
