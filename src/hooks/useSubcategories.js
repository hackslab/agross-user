import { useQuery } from "@tanstack/react-query";
import {
  getSubcategories,
  getSubcategoryById,
} from "../services/subcategory.service";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "../utils/localization";

const transformSubcategoryData = (data, lng) => {
  if (!data) return null;

  const transformSingle = (subcategory) => {
    if (!subcategory) return null;
    const transformedSubcategory = {
      ...subcategory,
      name: getLocalizedText(subcategory, "name", lng),
    };

    if (subcategory.category) {
      transformedSubcategory.category = {
        ...subcategory.category,
        name: getLocalizedText(subcategory.category, "name", lng),
        description: getLocalizedText(subcategory.category, "description", lng),
      };
    }

    return transformedSubcategory;
  };

  if (Array.isArray(data)) {
    return data.map(transformSingle);
  }
  return transformSingle(data);
};

export function useSubcategories() {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ["subcategories"],
    queryFn: getSubcategories,
    staleTime: 5 * 60 * 1000,
    select: (data) => transformSubcategoryData(data, i18n.language),
  });
}

export function useSubcategory(subcategoryId) {
  const { i18n } = useTranslation();
  return useQuery({
    queryKey: ["subcategory", subcategoryId],
    queryFn: () => getSubcategoryById(subcategoryId),
    enabled: Boolean(subcategoryId),
    staleTime: 5 * 60 * 1000,
    select: (data) => transformSubcategoryData(data, i18n.language),
  });
}
