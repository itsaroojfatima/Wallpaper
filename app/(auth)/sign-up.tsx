import AuthButton from "@/components/auth/AuthButton";
import AuthInput from "@/components/auth/AuthInput";
import AmbientGlow from "@/components/common/AmbientGlow";
import AuthHeader from "@/components/common/AuthHeader";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSignUp = () => {
    console.log("Sign up pressed:", name, email, phone, address);
    router.replace("/(tabs)/home");
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
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Join us to discover and collect premium 4K wallpapers
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <AuthInput
                label="Full Name"
                iconName="person-outline"
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <AuthInput
                label="Email Address"
                iconName="mail-outline"
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <AuthInput
                label="Phone Number"
                iconName="call-outline"
                placeholder="+1 234 567 890"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <AuthInput
                label="Password"
                iconName="lock-closed-outline"
                placeholder="Create password"
                isPassword
                value={password}
                onChangeText={setPassword}
              />

              <AuthInput
                label="Confirm Password"
                iconName="shield-checkmark-outline"
                placeholder="Confirm your password"
                isPassword
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <AuthInput
                label="Location / Country"
                iconName="location-outline"
                placeholder="City, Country"
                value={address}
                onChangeText={setAddress}
                autoCapitalize="words"
              />
            </View>

            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setAgreeTerms(!agreeTerms)}
              activeOpacity={0.8}
            >
              <View
                style={[styles.checkbox, agreeTerms && styles.checkboxActive]}
              >
                {agreeTerms && (
                  <Ionicons name="checkmark" size={14} color="#ffffff" />
                )}
              </View>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.linkText}>Terms</Text>,{" "}
                <Text style={styles.linkText}>Conditions</Text> &{" "}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            <AuthButton title="Create Account" onPress={handleSignUp} />

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push("/login")}
                activeOpacity={0.7}
              >
                <Text style={styles.loginText}>Sign In</Text>
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
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  innerContainer: {
    paddingHorizontal: 24,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  titleSection: {
    marginTop: 10,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    lineHeight: 20,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 18,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
    marginTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  checkboxActive: {
    backgroundColor: "#b8867a",
    borderColor: "#b8867a",
  },
  termsText: {
    flex: 1,
    fontSize: 12.5,
    color: "#9ca3af",
    lineHeight: 18,
  },
  linkText: {
    color: "#b8867a",
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },
  footerText: {
    color: "#9ca3af",
    fontSize: 14,
  },
  loginText: {
    color: "#b8867a",
    fontSize: 14,
    fontWeight: "700",
  },
});
