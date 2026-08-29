import GridComponent from "@/components/GridComponent";
import HomeComponent from "@/components/HomeComponent";
import NewComponent from "@/components/NewComponent";
import TrendingComponent from "@/components/TrendingComponent";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeContainer() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar style="light" />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.brandTitle}>
            Wallpaper<Text style={styles.brandDot}>.</Text>
          </Text>
          <Text style={styles.brandSubtitle}>Explore 4K & Ultra HD</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.75}>
            <Ionicons name="search-outline" size={18} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.75}>
            <Ionicons name="heart-outline" size={18} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.75}>
            <Ionicons name="options-outline" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Horizontal Luxury Tab Rail */}
      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
        >
          {/* Categories Tab */}
          <TouchableOpacity
            style={[
              styles.tabPill,
              activeTab === "grid" && styles.activeTabPill,
            ]}
            onPress={() => setActiveTab("grid")}
            activeOpacity={0.8}
          >
            <Ionicons
              name={activeTab === "grid" ? "grid" : "grid-outline"}
              size={17}
              color={activeTab === "grid" ? "#ffffff" : "#9ca3af"}
            />
            <Text
              style={[
                styles.tabPillText,
                activeTab === "grid" && styles.activeTabPillText,
              ]}
            >
              Categories
            </Text>
          </TouchableOpacity>

          {/* Home Tab */}
          <TouchableOpacity
            style={[
              styles.tabPill,
              activeTab === "home" && styles.activeTabPill,
            ]}
            onPress={() => setActiveTab("home")}
            activeOpacity={0.8}
          >
            <Ionicons
              name={activeTab === "home" ? "home" : "home-outline"}
              size={17}
              color={activeTab === "home" ? "#ffffff" : "#9ca3af"}
            />
            <Text
              style={[
                styles.tabPillText,
                activeTab === "home" && styles.activeTabPillText,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          {/* New Tab */}
          <TouchableOpacity
            style={[
              styles.tabPill,
              activeTab === "new" && styles.activeTabPill,
            ]}
            onPress={() => setActiveTab("new")}
            activeOpacity={0.8}
          >
            <Ionicons
              name={activeTab === "new" ? "sparkles" : "sparkles-outline"}
              size={17}
              color={activeTab === "new" ? "#ffffff" : "#9ca3af"}
            />
            <Text
              style={[
                styles.tabPillText,
                activeTab === "new" && styles.activeTabPillText,
              ]}
            >
              New
            </Text>
          </TouchableOpacity>

          {/* Trending Tab */}
          <TouchableOpacity
            style={[
              styles.tabPill,
              activeTab === "trending" && styles.activeTabPill,
            ]}
            onPress={() => setActiveTab("trending")}
            activeOpacity={0.8}
          >
            <Ionicons
              name={activeTab === "trending" ? "flame" : "flame-outline"}
              size={17}
              color={activeTab === "trending" ? "#ffffff" : "#9ca3af"}
            />
            <Text
              style={[
                styles.tabPillText,
                activeTab === "trending" && styles.activeTabPillText,
              ]}
            >
              Trending
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Screen Body Components */}
      {activeTab === "grid" && <GridComponent />}
      {activeTab === "home" && <HomeComponent />}
      {activeTab === "new" && <NewComponent />}
      {activeTab === "trending" && <TrendingComponent />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0e12",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: "#0d0e12",
  },
  titleContainer: {
    gap: 2,
  },
  brandTitle: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  brandDot: {
    color: "#b8867a",
  },
  brandSubtitle: {
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#171720",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  tabsWrapper: {
    paddingBottom: 12,
    backgroundColor: "#0d0e12",
  },
  tabsScrollContent: {
    paddingHorizontal: 20,
    gap: 10,
    alignItems: "center",
  },
  tabPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#171720",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    gap: 9, // Ample space between icon and text
  },
  activeTabPill: {
    backgroundColor: "#b8867a",
    borderColor: "#b8867a",
    shadowColor: "#b8867a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 5,
  },
  tabPillText: {
    color: "#9ca3af",
    fontSize: 13.5,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  activeTabPillText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
