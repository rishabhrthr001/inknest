// In development, API runs on separate port
// In production, frontend is served from backend (same origin)
const API =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : "";

export default API;
