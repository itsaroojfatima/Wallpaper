import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PEXELS_API_KEY =
  "mNsEQaXZbUlhJH6vAoHlAY10isgk0CUlSQkyfeBCPssuu9XF7LJyqXBZ";

// Categories ki list
const CATEGORIES = [
  "Nature",
  "Abstract",
  "Architecture",
  "Animals",
  "Cars",
  "Minimalist",
  "Technology",
  "Space",
];

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 48) / 2;

export default function GridComponent() {
  const [selectedCategory, setSelectedCategory] = useState("Nature");
  const [wallpapers, setWallpapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCategoryWallpapers(selectedCategory);
  }, [selectedCategory]);

  const fetchCategoryWallpapers = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=20`,
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
      console.error("Error fetching category wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Category Pills Horizontal Scroll */}
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
              onPress={() => setSelectedCategory(cat)}
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

      {/* Wallpapers Grid */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#b8867a" />
          <Text style={styles.loadingText}>Loading {selectedCategory}...</Text>
        </View>
      ) : (
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
  },
  loadingText: {
    color: "#a0aec0",
    marginTop: 10,
    fontSize: 14,
  },
});
