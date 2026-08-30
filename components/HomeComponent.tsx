import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PEXELS_API_KEY =
  "mNsEQaXZbUlhJH6vAoHlAY10isgk0CUlSQkyfeBCPssuu9XF7LJyqXBZ";

function HomeComponent() {
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchWallpapers();
  }, []);

  const fetchWallpapers = async () => {
    try {
      const response = await fetch(
        "https://api.pexels.com/v1/search?query=wallpaper&per_page=20",
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        },
      );
      const data = await response.json();
      if (data && data.photos) {
        setWallpapers(data.photos);
      }
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#b8867a" />
        <Text style={styles.loadingText}>Loading Wallpapers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.gridContainer}>
      <FlatList
        data={wallpapers}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "/id",
                params: {
                  imageUrl: item.src.large,
                  photographer: item.photographer,
                },
              })
            }
          >
            <Image
              source={{ uri: item.src.medium }}
              style={styles.wallpaperImage}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function GridComponent() {
  return (
    <View style={styles.componentBox}>
      <Text style={styles.titleText}>Categories Screen Active</Text>
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
      {/* Single Main Header with Settings Icon */}
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

      {/* Single Top Navigation Bar */}
      <View style={styles.topTabBar}>
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

      {/* Dynamic Content Area */}
      <View style={styles.contentArea}>
        {activeTab === "grid" && <GridComponent />}
        {activeTab === "home" && <HomeComponent />}
        {activeTab === "new" && <NewComponent />}
        {activeTab === "trending" && <TrendingComponent />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
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
  contentArea: {
    flex: 1,
    padding: 8,
  },
  gridContainer: {
    flex: 1,
  },
  card: {
    flex: 1,
    margin: 8,
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1e1e1e",
  },
  wallpaperImage: {
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#a0aec0",
    marginTop: 10,
    fontSize: 14,
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
