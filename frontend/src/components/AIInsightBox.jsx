import { StyleSheet, Text, View } from "react-native";

export default function AIInsightBox({ insight, confidence }) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>AI Explanation</Text>
      <Text style={styles.text}>{insight}</Text>
      <Text style={styles.confidence}>Confidence: {Math.round(confidence * 100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: "#172554", borderRadius: 12, padding: 12, gap: 6 },
  title: { color: "#bfdbfe", fontWeight: "700", fontSize: 15 },
  text: { color: "#dbeafe", fontSize: 13, lineHeight: 18 },
  confidence: { color: "#93c5fd", fontSize: 12, fontWeight: "600" },
});

