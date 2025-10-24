import { useQuery } from "@tanstack/react-query";
import { getCarousel, getCarouselItemById } from "../services/carousel.service";

export function useCarousel() {
  return useQuery({
    queryKey: ["carousel"],
    queryFn: getCarousel,
    staleTime: 10 * 60 * 1000,
  });
}

export function useCarouselItem(itemId) {
  return useQuery({
    queryKey: ["carousel", itemId],
    queryFn: () => getCarouselItemById(itemId),
    enabled: Boolean(itemId),
    staleTime: 10 * 60 * 1000,
  });
}
