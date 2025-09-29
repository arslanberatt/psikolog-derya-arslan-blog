import { BASE_URL } from "./apiPaths";

export function normalizeImageUrl(url) {
  if (!url) return "";
  try {
    if (url.startsWith("data:")) return url; // already data uri
    if (url.startsWith("/uploads")) {
      return `${BASE_URL}${url}`;
    }
    const parsed = new URL(url, BASE_URL);
    if (parsed.protocol === "http:") parsed.protocol = "https:";
    return parsed.toString();
  } catch (e) {
    return url;
  }
}
