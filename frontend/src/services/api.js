import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchHvacUnits = async () => {
  const response = await api.get("/api/hvac");
  return response.data.data;
};

export const fetchHvacDetails = async (id) => {
  const response = await api.get(`/api/hvac/${id}`);
  return response.data.data;
};

export const fetchAlerts = async () => {
  const response = await api.get("/api/alerts");
  return response.data.data;
};

export const analyzeHvac = async (hvacId) => {
  const response = await api.post("/api/ai/analyze", { hvacId });
  return response.data.data;
};

export const askAssistant = async (message) => {
  const response = await api.post("/api/chat", { message });
  return response.data.data.answer;
};

