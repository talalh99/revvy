import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";

const LOG_TYPES = [
  { key: "fuel", label: "Fuel", emoji: "⛽", color: "#F97316" },
  { key: "oil", label: "Oil Change", emoji: "🛢️", color: "#3B82F6" },
  { key: "service", label: "Service", emoji: "🔧", color: "#8B5CF6" },
  { key: "repair", label: "Repair", emoji: "🔨", color: "#EF4444" },
  { key: "other", label: "Other", emoji: "📋", color: "#6B7280" },
];

export function LogCard({ entry, onEdit, onDelete }: any) {
  const info = LOG_TYPES.find((t) => t.key === entry.type) || LOG_TYPES[4];

  const confirmDelete = () => {
    Alert.alert("Delete entry", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(entry.id),
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onEdit(entry)}
      onLongPress={confirmDelete}
    >
      <View style={[styles.icon, { backgroundColor: info.color + "20" }]}>
        <Text style={{ fontSize: 18 }}>{info.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.type}>{info.label}</Text>
        <Text style={styles.meta}>
          {entry.date} · {parseInt(entry.mileage).toLocaleString()} km
        </Text>
        {entry.notes ? (
          <Text style={styles.notes} numberOfLines={1}>
            {entry.notes}
          </Text>
        ) : null}
      </View>
      <Text style={styles.cost}>${parseFloat(entry.cost).toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  info: { flex: 1 },
  type: { fontSize: 14, fontWeight: "600", color: "#0F172A" },
  meta: { fontSize: 12, color: "#8E8E93", marginTop: 2 },
  notes: { fontSize: 12, color: "#8E8E93", marginTop: 2 },
  cost: { fontSize: 15, fontWeight: "700", color: "#0F172A" },
});
