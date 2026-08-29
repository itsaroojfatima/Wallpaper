import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>W</Text>
      </View>
      <Text style={styles.title}>Wallppper</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 110,
    height: 110,
    backgroundColor: "#fbf8f7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#b8867a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  logoText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#b8867a",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#b8867a",
    letterSpacing: 1.2,
    fontFamily: "serif",
  },
});
