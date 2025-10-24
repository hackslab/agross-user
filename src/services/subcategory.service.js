import { apiClient } from "../lib/apiClient";

export function getSubcategories() {
  return apiClient.get("/subcategories");
}

export function getSubcategoryById(subcategoryId) {
  if (!subcategoryId) throw new Error("subcategoryId is required");
  return apiClient.get(`/subcategories/${subcategoryId}`);
}
