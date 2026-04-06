import { View, Text, StyleSheet } from "react-native";

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  value: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  label: { fontSize: 10, color: "#8E8E93", marginTop: 2, textAlign: "center" },
});
