import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const handleLogin = () => {
    console.log("Login pressed:", email, password);
    router.replace("/(auth)/home");
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="light" />

      <View style={styles.ambientGlowTop} />
      <View style={styles.ambientGlowBottom} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <View style={styles.brandHeader}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoText}>W</Text>
              </View>
              <Text style={styles.brandName}>Wallpaper</Text>
            </View>

            <View style={styles.titleSection}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.subtitleText}>
                Sign in to access your curated 4K wallpapers
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    isFocusedEmail && styles.inputWrapperFocused,
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={isFocusedEmail ? "#b8867a" : "#9ca3af"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#6b7280"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <View
                  style={[
                    styles.inputWrapper,
                    isFocusedPassword && styles.inputWrapperFocused,
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={isFocusedPassword ? "#b8867a" : "#9ca3af"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#6b7280"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    onFocus={() => setIsFocusedPassword(true)}
                    onBlur={() => setIsFocusedPassword(false)}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIconButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => router.push("/forget-password")}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.85}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push("/sign-up")}
                activeOpacity={0.7}
              >
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
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
  ambientGlowTop: {
    position: "absolute",
    top: -width * 0.3,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: "rgba(184, 134, 122, 0.18)",
  },
  ambientGlowBottom: {
    position: "absolute",
    bottom: -width * 0.3,
    left: -width * 0.2,
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: (width * 0.85) / 2,
    backgroundColor: "rgba(45, 27, 78, 0.22)",
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
  },
  brandHeader: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
    marginBottom: 28,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  logoBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#b8867a",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
  },
  brandName: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
  },
  titleSection: {
    marginBottom: 28,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    color: "#9ca3af",
    lineHeight: 20,
  },
  formContainer: {
    gap: 18,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#e2e8f0",
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    backgroundColor: "#171720",
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 14,
  },
  inputWrapperFocused: {
    borderColor: "#b8867a",
    backgroundColor: "#1b1b26",
    shadowColor: "#b8867a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#ffffff",
  },
  eyeIconButton: {
    padding: 6,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: -4,
  },
  forgotPasswordText: {
    color: "#b8867a",
    fontSize: 13,
    fontWeight: "600",
  },
  loginButton: {
    height: 54,
    backgroundColor: "#b8867a",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
    shadowColor: "#b8867a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 5,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  footerText: {
    color: "#9ca3af",
    fontSize: 14,
  },
  signUpText: {
    color: "#b8867a",
    fontSize: 14,
    fontWeight: "700",
  },
});
