import { PexelsPhoto } from "@/types/wallpaper";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
export const DEFAULT_CARD_WIDTH = (screenWidth - 48) / 2;

interface WallpaperCardProps {
  photo: PexelsPhoto;
  cardStyle?: StyleProp<ViewStyle>;
  onPress?: (photo: PexelsPhoto) => void;
}

export default function WallpaperCard({
  photo,
  cardStyle,
  onPress,
}: WallpaperCardProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(photo);
      return;
    }

    router.push({
      pathname: "/id",
      params: {
        imageUrl: photo.src.large,
        photographer: photo.photographer,
      },
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, cardStyle]}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Image source={{ uri: photo.src.medium }} style={styles.wallpaperImage} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1e1e1e",
  },
  wallpaperImage: {
    width: "100%",
    height: "100%",
  },
});
