import { Ionicons } from "@expo/vector-icons";

export interface SettingsOptionItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}
