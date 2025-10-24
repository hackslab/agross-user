import { apiClient } from "../lib/apiClient";

export function getProducts(params) {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  return apiClient.get(`/products${query}`);
}

export function getProductById(productId) {
  if (!productId) throw new Error("productId is required");
  return apiClient.get(`/products/${productId}`);
}
