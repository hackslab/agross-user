import { useQuery } from "@tanstack/react-query";
import { getExchangeRate } from "../services/currency.service";

export function useExchangeRate() {
  return useQuery({
    queryKey: ["exchangeRate"],
    queryFn: getExchangeRate,
    staleTime: Infinity, // Keep data fresh for entire session
    gcTime: Infinity, // Keep in cache for entire session
  });
}
