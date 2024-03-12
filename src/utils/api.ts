type apiMethod = "GET" | "POST" | "PUT" | "DELETE";

const apiFetch = (endpoint: string, method: apiMethod, body?: string) =>
  fetch(`${import.meta.env.VITE_APP_API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

export { apiFetch };
