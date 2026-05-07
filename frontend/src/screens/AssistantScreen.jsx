import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { askAssistant } from "../services/api.js";

const presets = ["Why is HVAC-2 critical?", "What should I inspect first?", "Which HVAC is most risky?"];

export default function AssistantScreen() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("Ask about risks, recommendations, or issue priorities.");
  const [loading, setLoading] = useState(false);

  const submit = async (message) => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const answer = await askAssistant(message.trim());
      setReply(answer);
    } catch (_err) {
      setReply("Assistant unavailable. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>AI Maintenance Assistant</Text>

      <View style={styles.presets}>
        {presets.map((item) => (
          <Pressable key={item} style={styles.preset} onPress={() => void submit(item)}>
            <Text style={styles.presetText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type question for AI assistant..."
        placeholderTextColor="#94a3b8"
      />

      <Pressable style={styles.send} onPress={() => void submit(input)}>
        <Text style={styles.sendText}>{loading ? "Thinking..." : "Ask Assistant"}</Text>
      </Pressable>

      <View style={styles.replyBox}>
        <Text style={styles.reply}>{reply}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, gap: 12 },
  heading: { color: "#f8fafc", fontSize: 20, fontWeight: "700" },
  presets: { gap: 8 },
  preset: { backgroundColor: "#1e3a8a", borderRadius: 10, padding: 10 },
  presetText: { color: "#dbeafe", fontSize: 13 },
  input: {
    backgroundColor: "#0f172a",
    borderColor: "#334155",
    borderWidth: 1,
    borderRadius: 10,
    color: "#e2e8f0",
    padding: 12,
  },
  send: { backgroundColor: "#2563eb", borderRadius: 10, padding: 12, alignItems: "center" },
  sendText: { color: "#e2e8f0", fontWeight: "700" },
  replyBox: { backgroundColor: "#172554", borderRadius: 12, padding: 12 },
  reply: { color: "#dbeafe", lineHeight: 20 },
});

