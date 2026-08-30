import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PEXELS_API_KEY =
  "mNsEQaXZbUlhJH6vAoHlAY10isgk0CUlSQkyfeBCPssuu9XF7LJyqXBZ";

export default function HomeComponent() {
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchWallpapers(1);
  }, []);

  const fetchWallpapers = async (pageNum: number) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetch(
        `https://api.pexels.com/v1/search?query=wallpaper&per_page=20&page=${pageNum}`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        },
      );
      const data = await response.json();
      if (data && data.photos) {
        if (pageNum === 1) {
          setWallpapers(data.photos);
        } else {
          setWallpapers((prev) => [...prev, ...data.photos]);
        }
      }
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreWallpapers = () => {
    if (!loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchWallpapers(nextPage);
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
        keyExtractor={(item, index) => `${item.id}-${index}`}
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
        onEndReached={loadMoreWallpapers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#b8867a" />
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#0a0a12",
  },
  loadingText: {
    color: "#a0aec0",
    marginTop: 10,
    fontSize: 14,
  },
  footerLoader: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
