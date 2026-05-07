import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchAlerts, fetchHvacUnits } from "../services/api.js";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [hvacUnits, setHvacUnits] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const refreshAll = async () => {
    try {
      setError(null);
      const [units, alertData] = await Promise.all([fetchHvacUnits(), fetchAlerts()]);
      setHvacUnits(units);
      setAlerts(alertData);
      await AsyncStorage.setItem("cached_hvac_units", JSON.stringify(units));
      await AsyncStorage.setItem("cached_alerts", JSON.stringify(alertData));
    } catch (_err) {
      setError("Unable to refresh live data.");
      const cachedUnits = await AsyncStorage.getItem("cached_hvac_units");
      const cachedAlerts = await AsyncStorage.getItem("cached_alerts");
      if (cachedUnits) setHvacUnits(JSON.parse(cachedUnits));
      if (cachedAlerts) setAlerts(JSON.parse(cachedAlerts));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshAll();
    const interval = setInterval(() => {
      void refreshAll();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const value = useMemo(
    () => ({ hvacUnits, alerts, loading, error, darkMode, toggleDarkMode, refreshAll }),
    [hvacUnits, alerts, loading, error, darkMode]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

