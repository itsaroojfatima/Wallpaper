import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Sample dummy AI wallpapers taake foran screen load ho jaye
const dummyWallpapers = [
  {
    id: "1",
    url: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg",
  },
  {
    id: "2",
    url: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
  },
  {
    id: "3",
    url: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg",
  },
  {
    id: "4",
    url: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Wallpapers</Text>
      </View>

      <FlatList
        data={dummyWallpapers}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.url }} style={styles.wallpaperImage} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    padding: 8,
  },
  card: {
    flex: 1,
    margin: 8,
    height: 220,
    backgroundColor: "#ddd",
    borderRadius: 12,
    overflow: "hidden",
  },
  wallpaperImage: {
    width: "100%",
    height: "100%",
  },
});
