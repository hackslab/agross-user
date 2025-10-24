import { apiClient } from "../lib/apiClient";

export function getCountries() {
  return apiClient.get("/countries");
}

export function getCountryById(countryId) {
  if (!countryId) throw new Error("countryId is required");
  return apiClient.get(`/countries/${countryId}`);
}
