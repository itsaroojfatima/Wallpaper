import { SettingsOptionItem } from "@/types/settings";

export const SETTINGS_OPTIONS: SettingsOptionItem[] = [
  { id: "1", title: "Remove Ads", icon: "star", route: "/remove-ads" },
  { id: "2", title: "History", icon: "time-outline", route: "/history" },
  { id: "3", title: "Favourites", icon: "heart", route: "/favorites" },
  {
    id: "4",
    title: "Auto Wallpaper Changer",
    icon: "sync-circle",
    route: "/auto-changer",
  },
  { id: "5", title: "Rate this App", icon: "star-outline", route: "/rate" },
  {
    id: "6",
    title: "Sharing is Caring!",
    icon: "share-social",
    route: "/share",
  },
  {
    id: "7",
    title: "Customer Support",
    icon: "chatbubble-ellipses",
    route: "/support",
  },
  { id: "8", title: "Manage App", icon: "settings", route: "/manage" },
  { id: "9", title: "Legal", icon: "information-circle", route: "/legal" },
];
