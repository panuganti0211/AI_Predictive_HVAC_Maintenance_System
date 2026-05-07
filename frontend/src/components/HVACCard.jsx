import { Pressable, StyleSheet, Text, View } from "react-native";

const colorMap = {
  Healthy: "#14532d",
  Warning: "#854d0e",
  Critical: "#7f1d1d",
};

export default function HVACCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, { borderColor: colorMap[item.healthStatus] }]}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={[styles.badge, { backgroundColor: colorMap[item.healthStatus] }]}>{item.healthStatus}</Text>
      </View>
      <Text style={styles.text}>Risk score: {item.riskScore}</Text>
      <Text style={styles.text}>Active alerts: {item.activeAlertCount}</Text>
      <Text style={styles.insight}>{item.latestInsight}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1.5, borderRadius: 14, padding: 14, backgroundColor: "#0b1220", gap: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { color: "#f8fafc", fontSize: 19, fontWeight: "700" },
  badge: { color: "#f8fafc", fontSize: 12, fontWeight: "700", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  text: { color: "#cbd5e1", fontSize: 14 },
  insight: { color: "#93c5fd", fontSize: 13, marginTop: 4 },
});

