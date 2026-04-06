import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  used: number;
  limit: number;
}

export function FreeBanner({ used, limit }: Props) {
  return (
    <TouchableOpacity style={styles.banner}>
      <Text style={styles.text}>
        Free plan: {used}/{limit} entries used ·{" "}
        <Text style={styles.bold}>Upgrade for unlimited →</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#FFF7ED",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  text: { fontSize: 13, color: "#9A3412", textAlign: "center" },
  bold: { fontWeight: "700" },
});
