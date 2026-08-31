import AuthButton from "@/components/auth/AuthButton";
import AmbientGlow from "@/components/common/AmbientGlow";
import AuthHeader from "@/components/common/AuthHeader";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmailVerifyScreen() {
  const router = useRouter();

  const handleContinue = () => {
    console.log("Email verified, navigating to change password");
    router.push("/chng-password");
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="light" />

      <AmbientGlow />

      <AuthHeader />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={60}
                color="#b8867a"
              />
            </View>

            <Text style={styles.title}>Email Verified!</Text>
            <Text style={styles.subtitle}>
              Your email address has been successfully verified. You can now
              reset your account password.
            </Text>

            <AuthButton title="Set New Password" onPress={handleContinue} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0e12",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  innerContainer: {
    paddingHorizontal: 24,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 104,
    height: 104,
    borderRadius: 36,
    backgroundColor: "rgba(184, 134, 122, 0.15)",
    borderWidth: 1.5,
    borderColor: "rgba(184, 134, 122, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    shadowColor: "#b8867a",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 36,
    textAlign: "center",
    lineHeight: 22,
  },
});
