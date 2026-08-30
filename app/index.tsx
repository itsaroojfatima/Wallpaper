import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 900,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 900,
        delay: 300,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2600,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      router.replace("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.View style={[styles.ambientGlowTop, { opacity: glowAnim }]} />
      <View style={styles.ambientGlowBottom} />

      <View style={styles.centerContent}>
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.outerRing}>
            <View style={styles.logoBadge}>
              <Ionicons name="sparkles" size={24} color="#b8867a" style={styles.sparkleTop} />
              <Text style={styles.logoLetter}>W</Text>
              <Ionicons name="images-outline" size={18} color="#b8867a" style={styles.sparkleBottom} />
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <Text style={styles.title}>Wallpaper</Text>
          <View style={styles.taglineBadge}>
            <Text style={styles.tagline}>4K & ULTRA HD AESTHETICS</Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.progressBarTrack}>
          <Animated.View
            style={[styles.progressBarFill, { width: progressWidth }]}
          />
        </View>
        <Text style={styles.footerText}>Craft Your Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0e12",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
  },
  ambientGlowTop: {
    position: "absolute",
    top: -width * 0.25,
    right: -width * 0.2,
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    backgroundColor: "rgba(184, 134, 122, 0.22)",
  },
  ambientGlowBottom: {
    position: "absolute",
    bottom: -width * 0.3,
    left: -width * 0.2,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    backgroundColor: "rgba(45, 27, 78, 0.3)",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    marginBottom: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  outerRing: {
    width: 124,
    height: 124,
    borderRadius: 36,
    padding: 3,
    backgroundColor: "rgba(184, 134, 122, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(184, 134, 122, 0.4)",
    shadowColor: "#b8867a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logoBadge: {
    width: "100%",
    height: "100%",
    backgroundColor: "#171720",
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  sparkleTop: {
    position: "absolute",
    top: 10,
    right: 12,
    opacity: 0.8,
  },
  sparkleBottom: {
    position: "absolute",
    bottom: 12,
    left: 12,
    opacity: 0.6,
  },
  logoLetter: {
    fontSize: 54,
    fontWeight: "900",
    color: "#b8867a",
    letterSpacing: -1,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 2,
    marginBottom: 10,
  },
  taglineBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(184, 134, 122, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(184, 134, 122, 0.25)",
  },
  tagline: {
    fontSize: 10,
    fontWeight: "700",
    color: "#d4a99d",
    letterSpacing: 2.2,
  },
  footerContainer: {
    alignItems: "center",
    gap: 12,
  },
  progressBarTrack: {
    width: 140,
    height: 3.5,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#b8867a",
    borderRadius: 3,
    shadowColor: "#b8867a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  footerText: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
  },
});
