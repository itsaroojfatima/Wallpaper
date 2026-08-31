import LoadingSpinner from "@/components/common/LoadingSpinner";
import WallpaperCard, {
  DEFAULT_CARD_WIDTH,
} from "@/components/common/WallpaperCard";
import { fetchNewWallpapers } from "@/services/pexels";
import { PexelsPhoto } from "@/types/wallpaper";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function NewFeed() {
  const [wallpapers, setWallpapers] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchNewWallpapers()
      .then((data) => {
        if (isMounted && data?.photos) {
          setWallpapers(data.photos);
        }
      })
      .catch((error) => {
        console.error("Error fetching new wallpapers:", error);
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

  if (loading) {
    return <LoadingSpinner message="Loading New Wallpapers..." />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wallpapers}
        numColumns={2}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.gridContent}
        renderItem={({ item }) => (
          <WallpaperCard photo={item} cardStyle={styles.card} />
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
    width: DEFAULT_CARD_WIDTH,
    margin: 6,
  },
});
