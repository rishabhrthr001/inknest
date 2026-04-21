// In development, API runs on separate port (3001)
// In production, frontend is served from backend (same origin)
const getApiUrl = () => {
  // If we are on localhost:3000, we want to talk to localhost:3001
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      // If the current port is 3000 (Vite default), use 3001 for API
      if (window.location.port === "3000") {
        return "http://localhost:3001";
      }
    }
  }
  
  // Fallback to relative URL (for production or if port matches)
  return "";
};

const API = getApiUrl();

export default API;
