import { apiClient } from "../lib/apiClient";

export function getCarousel() {
  return apiClient.get("/carousel");
}

export function getCarouselItemById(itemId) {
  if (!itemId) throw new Error("itemId is required");
  return apiClient.get(`/carousel/${itemId}`);
}
