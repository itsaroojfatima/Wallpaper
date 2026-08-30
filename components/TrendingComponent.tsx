import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PEXELS_API_KEY =
  "mNsEQaXZbUlhJH6vAoHlAY10isgk0CUlSQkyfeBCPssuu9XF7LJyqXBZ";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 48) / 2;

export default function TrendingComponent() {
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTrendingWallpapers();
  }, []);

  const fetchTrendingWallpapers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.pexels.com/v1/search?query=trending%20popular&per_page=20",
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
      console.error("Error fetching trending wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#b8867a" />
        <Text style={styles.loadingText}>Loading Trending Wallpapers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wallpapers}
        numColumns={2}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.gridContent}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a12",
  },
  gridContent: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 20,
  },
  card: {
    width: cardWidth,
    margin: 6,
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
    backgroundColor: "#0a0a12",
  },
  loadingText: {
    color: "#a0aec0",
    marginTop: 10,
    fontSize: 14,
  },
});
