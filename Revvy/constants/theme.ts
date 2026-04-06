export const COLORS = {
  navy: "#0F172A",
  navyLight: "#1E293B",
  orange: "#F97316",
  white: "#FFFFFF",
  bg: "#F2F2F7",
  border: "#E5E5EA",
  muted: "#8E8E93",
};

export const LOG_TYPES = [
  { key: "fuel", label: "Fuel", emoji: "⛽", color: "#F97316" },
  { key: "oil", label: "Oil Change", emoji: "🛢️", color: "#3B82F6" },
  { key: "service", label: "Service", emoji: "🔧", color: "#8B5CF6" },
  { key: "repair", label: "Repair", emoji: "🔨", color: "#EF4444" },
  { key: "other", label: "Other", emoji: "📋", color: "#6B7280" },
] as const;

export type LogType = (typeof LOG_TYPES)[number]["key"];
