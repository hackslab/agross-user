import { apiClient } from "../lib/apiClient";

export function getCategories() {
  return apiClient.get("/categories");
}

export function getCategoryById(categoryId) {
  if (!categoryId) throw new Error("categoryId is required");
  return apiClient.get(`/categories/${categoryId}`);
}
