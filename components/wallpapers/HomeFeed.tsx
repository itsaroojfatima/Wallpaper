import LoadingSpinner from "@/components/common/LoadingSpinner";
import WallpaperCard from "@/components/common/WallpaperCard";
import { fetchWallpapers } from "@/services/pexels";
import { PexelsPhoto } from "@/types/wallpaper";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
} from "react-native";

export default function HomeFeed() {
  const [wallpapers, setWallpapers] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    fetchWallpapers(1)
      .then((data) => {
        if (isMounted && data?.photos) {
          setWallpapers(data.photos);
        }
      })
      .catch((error) => {
        console.error("Error fetching wallpapers:", error);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const loadMoreWallpapers = async () => {
    if (loadingMore) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      const data = await fetchWallpapers(nextPage);
      if (data && data.photos) {
        setWallpapers((prev) => [...prev, ...data.photos]);
      }
    } catch (error) {
      console.error("Error fetching more wallpapers:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading Wallpapers..." />;
  }

  return (
    <View style={styles.gridContainer}>
      <FlatList
        data={wallpapers}
        numColumns={2}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <WallpaperCard photo={item} cardStyle={styles.card} />
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
  },
  footerLoader: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
