import { useState, useEffect } from "react";
import api from "../../api";

export default function useFetchModels() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadModels() {
      try {
        const res = await api.get("/api/ai/models");

        const list = res.data?.models || [];

        console.log("🔥 FINAL MODELS RECEIVED:", list.length);

        setModels(list); 
      } catch (err) {
        console.error("❌ Model Load Error:", err);
        setError(err.message);
      }
      setLoading(false);
    }

    loadModels();
  }, []);

  return { models, loading, error };
}
