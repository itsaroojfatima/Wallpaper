import LoadingSpinner from "@/components/common/LoadingSpinner";
import WallpaperCard, {
  DEFAULT_CARD_WIDTH,
} from "@/components/common/WallpaperCard";
import { CATEGORIES } from "@/constants/categories";
import { fetchCategoryWallpapers } from "@/services/pexels";
import { PexelsPhoto, WallpaperCategory } from "@/types/wallpaper";
import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CategoriesFeed() {
  const [selectedCategory, setSelectedCategory] =
    useState<WallpaperCategory>("Nature");
  const [wallpapers, setWallpapers] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSelectCategory = (cat: WallpaperCategory) => {
    setSelectedCategory(cat);
    setLoading(true);
  };

  useEffect(() => {
    let isMounted = true;

    fetchCategoryWallpapers(selectedCategory)
      .then((data) => {
        if (isMounted && data?.photos) {
          setWallpapers(data.photos);
        }
      })
      .catch((error) => {
        console.error("Error fetching category wallpapers:", error);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.activeCategoryChip,
              ]}
              onPress={() => handleSelectCategory(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.activeCategoryText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <LoadingSpinner message={`Loading ${selectedCategory}...`} />
      ) : (
        <FlatList
          data={wallpapers}
          numColumns={2}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => (
            <WallpaperCard photo={item} cardStyle={styles.card} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a12",
  },
  categoriesWrapper: {
    paddingVertical: 10,
    backgroundColor: "#0a0a12",
  },
  categoryScrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  activeCategoryChip: {
    backgroundColor: "#b8867a",
    borderColor: "#b8867a",
  },
  categoryText: {
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "600",
  },
  activeCategoryText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  gridContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  card: {
    width: DEFAULT_CARD_WIDTH,
    margin: 6,
  },
});
