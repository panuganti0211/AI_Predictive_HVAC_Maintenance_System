import { StyleSheet, Text, View } from "react-native";

export default function RecommendationPanel({ recommendation, urgency, checklist }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Technician Recommendation</Text>
      <Text style={styles.line}>Action: {recommendation}</Text>
      <Text style={styles.line}>Urgency: {urgency}</Text>
      {checklist.map((item) => (
        <Text key={item} style={styles.item}>
          • {item}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { backgroundColor: "#1e293b", borderRadius: 12, padding: 12, gap: 6 },
  title: { color: "#f8fafc", fontWeight: "700", fontSize: 15 },
  line: { color: "#cbd5e1", fontSize: 13 },
  item: { color: "#e2e8f0", fontSize: 13 },
});

