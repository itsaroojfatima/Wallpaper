import CategoriesFeed from "@/components/wallpapers/CategoriesFeed";
import HomeFeed from "@/components/wallpapers/HomeFeed";
import NewFeed from "@/components/wallpapers/NewFeed";
import TrendingFeed from "@/components/wallpapers/TrendingFeed";
import { TabType } from "@/types/wallpaper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const router = useRouter();

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.brandTitle}>
            Wallpaper<Text style={styles.brandDot}>.</Text>
          </Text>
          <Text style={styles.brandSubtitle}>Explore 4K & Ultra HD</Text>
        </View>

        <View style={styles.headerActions}>
          <Pressable
            style={styles.iconBtn}
            onPress={() => {
              Alert.alert("Settings", "Settings button clicked!");
              router.push("/");
            }}
          >
            <Ionicons name="settings-outline" size={22} color="#ffffff" />
          </Pressable>

          <Pressable
            style={styles.iconBtn}
            onPress={() => setActiveTab("grid")}
          >
            <Ionicons name="grid-outline" size={22} color="#ffffff" />
          </Pressable>

          <Pressable
            style={styles.iconBtn}
            onPress={() => {
              Alert.alert("Favorite", "Favorite button clicked!");
              router.push("/");
            }}
          >
            <Ionicons name="heart-outline" size={23} color="#ffffff" />
          </Pressable>
        </View>
      </View>

      <View style={styles.tabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
        >
          <Pressable
            style={[
              styles.tabPill,
              activeTab === "grid" && styles.activeTabPill,
            ]}
            onPress={() => setActiveTab("grid")}
          >
            <Ionicons
              name={activeTab === "grid" ? "grid" : "grid-outline"}
              size={16}
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
          </Pressable>

          <Pressable
            style={[
              styles.tabPill,
              activeTab === "home" && styles.activeTabPill,
            ]}
            onPress={() => setActiveTab("home")}
          >
            <Ionicons
              name={activeTab === "home" ? "home" : "home-outline"}
              size={16}
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
          </Pressable>

          <Pressable
            style={[
              styles.tabPill,
              activeTab === "new" && styles.activeTabPill,
            ]}
            onPress={() => setActiveTab("new")}
          >
            <Ionicons
              name={activeTab === "new" ? "sparkles" : "sparkles-outline"}
              size={16}
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
          </Pressable>

          <Pressable
            style={[
              styles.tabPill,
              activeTab === "trending" && styles.activeTabPill,
            ]}
            onPress={() => setActiveTab("trending")}
          >
            <Ionicons
              name={activeTab === "trending" ? "flame" : "flame-outline"}
              size={16}
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
          </Pressable>
        </ScrollView>
      </View>

      <View style={styles.content}>
        {activeTab === "grid" && <CategoriesFeed />}
        {activeTab === "home" && <HomeFeed />}
        {activeTab === "new" && <NewFeed />}
        {activeTab === "trending" && <TrendingFeed />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a12",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: "#0a0a12",
    zIndex: 100,
    elevation: 100,
  },
  titleContainer: {
    flex: 1,
  },
  brandTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
  },
  brandDot: {
    color: "#d19283",
  },
  brandSubtitle: {
    color: "#9ca3af",
    fontSize: 11,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 200,
    elevation: 200,
  },
  iconBtn: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 21,
    backgroundColor: "#181822",
    zIndex: 300,
    elevation: 300,
  },
  tabsWrapper: {
    backgroundColor: "#0a0a12",
    paddingBottom: 12,
    zIndex: 100,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  tabPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#181822",
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 20,
    gap: 7,
  },
  activeTabPill: {
    backgroundColor: "#d19283",
  },
  tabPillText: {
    color: "#9ca3af",
    fontSize: 13,
    fontWeight: "600",
  },
  activeTabPillText: {
    color: "#ffffff",
  },
  content: {
    flex: 1,
  },
});
