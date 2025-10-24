import { apiClient } from "../lib/apiClient";

export function getExchangeRate() {
  return apiClient.get("/currency");
}
