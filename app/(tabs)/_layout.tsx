import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 1. Alag Components (Har tab ka apna component)
function GridComponent() {
  return (
    <View style={styles.componentBox}>
      <Text style={styles.titleText}>Categories Screen Active</Text>
    </View>
  );
}

function HomeComponent() {
  return (
    <View style={styles.componentBox}>
      <Text style={styles.titleText}>Home Screen Active</Text>
    </View>
  );
}

function NewComponent() {
  return (
    <View style={styles.componentBox}>
      <Text style={styles.titleText}>New Items Screen Active</Text>
    </View>
  );
}

function TrendingComponent() {
  return (
    <View style={styles.componentBox}>
      <Text style={styles.titleText}>Trending Screen Active</Text>
    </View>
  );
}

export default function HomeContainer() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Islamic Wallpaper</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="apps-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Top Navigation Bar with Uniform Pill Chips */}
      <View style={styles.topTabBar}>
        {/* Categories Tab */}
        <TouchableOpacity
          style={[styles.tabChip, activeTab === "grid" && styles.activeTabChip]}
          onPress={() => setActiveTab("grid")}
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

        {/* Home Tab */}
        <TouchableOpacity
          style={[styles.tabChip, activeTab === "home" && styles.activeTabChip]}
          onPress={() => setActiveTab("home")}
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

        {/* New Tab */}
        <TouchableOpacity
          style={[styles.tabChip, activeTab === "new" && styles.activeTabChip]}
          onPress={() => setActiveTab("new")}
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

        {/* Trending Tab */}
        <TouchableOpacity
          style={[
            styles.tabChip,
            activeTab === "trending" && styles.activeTabChip,
          ]}
          onPress={() => setActiveTab("trending")}
        >
          <Ionicons
            name="flame"
            size={16}
            color={activeTab === "trending" ? "#fff" : "#e2e8f0"}
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

      {/* Dynamic Component Rendering based on Active Tab */}
      <ScrollView contentContainerStyle={styles.contentArea}>
        {activeTab === "grid" && <GridComponent />}
        {activeTab === "home" && <HomeComponent />}
        {activeTab === "new" && <NewComponent />}
        {activeTab === "trending" && <TrendingComponent />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Pure dark background to eliminate white flashes
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#1e1e1e",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 16,
  },
  topTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2c2c2c",
  },
  tabChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c2c2c",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  activeTabChip: {
    backgroundColor: "#b8867a", // Theme color highlight when active
  },
  chipText: {
    color: "#a0aec0",
    fontSize: 12,
    fontWeight: "600",
  },
  activeChipText: {
    color: "#ffffff",
  },
  contentArea: {
    padding: 16,
  },
  componentBox: {
    backgroundColor: "#1e1e1e",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  titleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
