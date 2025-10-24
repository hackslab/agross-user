import { useQuery } from "@tanstack/react-query";
import { getCountries, getCountryById } from "../services/country.service";

const countryFlagMap = {
  Russia: "🇷🇺",
  Iran: "🇮🇷",
  China: "🇨🇳",
  "South Korea": "🇰🇷",
  Korea: "🇰🇷",
  Brazil: "🇧🇷",
  Spain: "🇪🇸",
  Uzbekistan: "🇺🇿",
  Turkey: "🇹🇷",
};

const addFlagToCountry = (country) => {
  if (!country) return null;
  return {
    ...country,
    flag: countryFlagMap[country.name] || "🏳️",
  };
};

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: 10 * 60 * 1000,
    select: (data) => (Array.isArray(data) ? data.map(addFlagToCountry) : []),
  });
}

export function useCountry(countryId) {
  return useQuery({
    queryKey: ["country", countryId],
    queryFn: () => getCountryById(countryId),
    enabled: Boolean(countryId),
    staleTime: 10 * 60 * 1000,
    select: addFlagToCountry,
  });
}
