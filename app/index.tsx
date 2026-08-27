import { useRouter } from "expo-router";
import { ImageBackground, StatusBar, StyleSheet } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.replace("/login");
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <ImageBackground
      source={require("../assets/images/image.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
